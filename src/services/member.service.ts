import { MemberRepository } from "../repositories/member.repository"
import { type Members } from "../databases/models/members"

export class MemberService {
  memberRepository: MemberRepository

  constructor () {
    this.memberRepository = new MemberRepository()
  }

  async store (data: Members): Promise<Members> {
    return this.memberRepository.store(data)
  }

  async list (query: any): Promise<Members[]> {
    return this.memberRepository.list(query)
  }


  async show (id: number): Promise<Members | undefined> {
    return this.memberRepository.show(id)
  }

  async update (id: number, member: Members): Promise<Members> {
    return this.memberRepository.update(id, member)
  }

  async destroy (id: number): Promise<number | undefined> {
    return this.memberRepository.destroy(id)
  }
}
