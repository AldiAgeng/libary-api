import { BorrowsModel, type Borrows } from "../databases/models/borrows"

export class BorrowRepository {
  async store (data: Borrows): Promise<Borrows> {
    return await BorrowsModel
      .query()
      .insert(data)
  }

  async show (id: number): Promise<Borrows | undefined> {
    return await BorrowsModel
      .query()
      .where('id', id)
      .first()
      .throwIfNotFound()
  }

  async get (data: Partial<Borrows>): Promise<Borrows[] | undefined> {
    return await BorrowsModel
      .query()
      .where(data)
  }

  async update (id: number, data: Partial<Borrows>): Promise<Borrows> {
    return await BorrowsModel
      .query()
      .patchAndFetchById(id, data).throwIfNotFound()
  }

  async listBorrow (): Promise<any[]> {
    return await BorrowsModel
      .query()
      .select('member_id')
      .count('id as borrowed_books')
      .whereNull('return_date')
      .groupBy('member_id');
  }
}