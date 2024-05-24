import { Model, ModelObject } from 'objection'
import { BorrowsModel } from './borrows'

export class MembersModel extends Model {
  id!: number
  code!: string
  name!: string
  penalty!: boolean
  penalty_end!: Date | null

  protected static readonly nameOfTable = 'members'
  static get tableName () {
    return this.nameOfTable
  }

  static get jsonSchema () {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        code: { type: 'string', minLength: 1, maxLength: 4 },
        name: { type: 'string', minLength: 1, maxLength: 255 },
      }
    }
  }

  static get relationMappings () {
    return {
      borrow: {
        relation: Model.HasManyRelation,
        modelClass: BorrowsModel,
        join: {
          from: 'members.id',
          to: 'borrows.member_id'
        }
      }
    }
  }
}

export type Members = ModelObject<MembersModel>
