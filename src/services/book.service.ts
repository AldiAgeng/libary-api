import { type Books } from "../databases/models/books"
import { BookRepository } from "../repositories/book.repository"

export class BookService {
  bookRepository: BookRepository

  constructor () {
    this.bookRepository = new BookRepository()
  }

  async store (data: Books): Promise<Books> {
    return this.bookRepository.store(data)
  }

  async list (query: any): Promise<Books[]> {
    return this.bookRepository.list(query)
  }

  async show (id: number): Promise<Books | undefined> {
    return this.bookRepository.show(id)
  }

  async update (id: number, book: Books): Promise<Books> {
    return this.bookRepository.update(id, book)
  }

  async destroy (id: number): Promise<number | undefined> {
    return this.bookRepository.destroy(id)
  }
}
