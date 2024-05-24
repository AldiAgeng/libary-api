import { Model, ModelObject } from 'objection'

export class BorrowsModel extends Model {
  id!: number
  member_id!: number
  book_id!: number
  borrow_date!: Date
  return_date!: Date | null
  penalty!: boolean

  protected static readonly nameOfTable = 'borrows'
  static get tableName () {
    return this.nameOfTable
  }

  static get jsonSchema () {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        member_id: { type: 'integer' },
        book_id: { type: 'integer' }
      }
    }
  }

  static get relationMappings () {
    return {
      member: {
        relation: Model.BelongsToOneRelation,
        modelClass: 'MembersModel',
        join: {
          from: 'borrows.member_id',
          to: 'members.id'
        }
      },
      book: {
        relation: Model.BelongsToOneRelation,
        modelClass: 'BooksModel',
        join: {
          from: 'borrows.book_id',
          to: 'books.id'
        }
      }
    }
  }
}

export type Borrows = ModelObject<BorrowsModel>
