import { Model, ModelObject } from 'objection'

export class BooksModel extends Model {
  id!: number
  code!: string
  title!: string
  author!: string
  stock!: number

  protected static readonly nameOfTable = 'books'
  static get tableName () {
    return this.nameOfTable
  }

  static get jsonSchema () {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        code: { type: 'string', minLength: 1, maxLength: 8 },
        title: { type: 'string', minLength: 1, maxLength: 255 },
        author: { type: 'string', minLength: 1, maxLength: 255 },
        stock: { type: 'integer' }
      }
    }
  }
}

export type Books = ModelObject<BooksModel>
