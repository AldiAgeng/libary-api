import { Borrows } from "../databases/models/borrows"
import { BorrowRepository } from "../repositories/borrow.repository"
import { MemberRepository } from "../repositories/member.repository"
import { BookRepository } from "../repositories/book.repository"

export class BorrowService {
  borrowRepository: BorrowRepository
  memberRepository: MemberRepository
  bookRepository: BookRepository


  constructor () {
    this.borrowRepository = new BorrowRepository()
    this.memberRepository = new MemberRepository()
    this.bookRepository = new BookRepository()
  }

  async store (data: Borrows): Promise<Borrows> {
    const member = await this.memberRepository.show(data.member_id)
    if (!member || member.penalty){
      throw new Error('Members cannot borrow books at this time, because they will get a penalty.')
    }

    const borrowBooks = await this.borrowRepository.get({
      member_id: data.member_id,
      book_id: data.book_id,
      return_date: null
    })
    if (borrowBooks && borrowBooks.length >= 2) {
      throw new Error('Members may not borrow more than 2 books.')
    }

    const book = await this.bookRepository.show(data.book_id)
    if (!book || book.stock <= 0) {
      throw new Error('Book is not available.')
    }

    const borrow = await this.borrowRepository.store(data);

    book.stock -= 1
    await this.bookRepository.update(book.id, book)

    return borrow
  }

  async return (data: Borrows): Promise<Borrows | undefined> {
    const borrow = await this.borrowRepository.get({
      member_id: data.member_id,
      book_id: data.book_id,
      return_date: null
    })

    if (!borrow) {
      throw new Error('Data borrow not found.')
    }

    const returnDate = new Date()
    const borrowDate = new Date(borrow[0].borrow_date)
    const diffTime = Math.abs(returnDate.getTime() - borrowDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    let penalty = false
    let penaltyEnd: null | Date = null
    if (diffDays > 7) {
      penalty = true
      penaltyEnd = new Date(returnDate.getTime() + 3 * 24 * 60 * 60 * 1000)
    }

    const borrowed = await this.borrowRepository.update(borrow[0].id, { return_date: returnDate, penalty })

    if (penalty) {
      await this.memberRepository.update(borrow[0].member_id, { penalty, penalty_end: penaltyEnd })
    }

    const book = await this.bookRepository.show(borrow[0].book_id)
    if (book) {
      book.stock += 1
      await this.bookRepository.update(book.id, book)
    }

    return borrowed
  }

  async list (): Promise<any[]> {
    const members = await this.memberRepository.listWithBook()
    const memberBorrowedBooks = await this.borrowRepository.listBorrow()

    const membersWithBorrowedBooks = members.map(member => {
      const borrowedBooks = memberBorrowedBooks.find(b => b.member_id === member.id) || { borrowed_books: 0 };
      return { ...member, borrowed_books: borrowedBooks.borrowed_books };
    });

    return membersWithBorrowedBooks
  }
}
