import { MembersModel, type Members } from "../databases/models/members";

export class MemberRepository {
  async store (member: Members): Promise<Members> {
    return await MembersModel
      .query()
      .insert(member)
  }

  async list (query: any): Promise<Members[]> {
    const { page, limit, search, sort, order } = query
    const queryBuilder = MembersModel.query()

    if (search !== undefined) {
      await queryBuilder.whereILike('name', `%${search}%`).whereILike('code', `%${search}%`)
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

  async listWithBook (): Promise<Members[]> {
    return await MembersModel
      .query()
  }

  async show (id: number): Promise<Members | undefined> {
    return await MembersModel.query().findOne({ id }).throwIfNotFound()
  }

  async update (id: number, member: Partial<Members>): Promise<Members> {
    return await MembersModel
      .query()
      .patchAndFetchById(id, member).throwIfNotFound()
  }

  async destroy (id: number): Promise<number| undefined> {
    return await MembersModel
      .query()
      .deleteById(id)
      .throwIfNotFound()
  }
}