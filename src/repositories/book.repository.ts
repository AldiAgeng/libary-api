import { BooksModel, type Books } from "../databases/models/books"

export class BookRepository {
  async store (book: Books): Promise<Books> {
    return await BooksModel
      .query()
      .insert(book)
  }

  async list (query: any): Promise<Books[]> {
    const { page, limit, search, sort, order, available } = query
    const queryBuilder = BooksModel.query()

    if (search !== undefined) {
      await queryBuilder.whereILike('title', `%${search}%`).whereILike('code', `%${search}%`).whereILike('author', `%${search}%`)
    }

    if (available !== undefined) {
      if (available === 'true') {
        await queryBuilder.where('stock', '>', 0)
      } else if (available === 'false') {
        await queryBuilder.where('stock', '=', 0)
      }
    }

    if (sort !== undefined && order !== undefined) {
      if (order === 'asc' || order === 'desc') {
        await queryBuilder.orderBy(sort as string, order as 'asc' | 'desc')
      }
    }

    if (page !== undefined && limit !== undefined) {
      await queryBuilder.page((+page - 1) * +limit, +limit)
    }

    return await queryBuilder
  }

  async show (id: number): Promise<Books | undefined> {
    return await BooksModel.query().findOne({ id }).throwIfNotFound()
  }

  async update (id: number, book: Books): Promise<Books> {
    return await BooksModel
      .query()
      .patchAndFetchById(id, book).throwIfNotFound()
  }

  async destroy (id: number): Promise<number| undefined> {
    return await BooksModel
      .query()
      .deleteById(id)
      .throwIfNotFound()
  }
}