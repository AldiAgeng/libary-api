import { Response, Request } from 'express'
import { MemberService } from '../services/member.service'
import { ResponseHelper } from '../helpers/response.helper'
import { Members } from '../databases/models/members'
import { ErrorHelper } from '../helpers/error.helper'

export class MemberController {
  private memberService: MemberService

  constructor () {
    this.memberService = new MemberService()
  }

  async create (req: Request<Record<string, unknown>, Record<string, unknown>, Members>, res: Response): Promise<void> {
    try {
      const member = await this.memberService.store(req.body)

      ResponseHelper.success('Data disimpan', member, 201)(res)
    } catch (error) {
      ErrorHelper.handler(error, res)
    }
  }

  async list (req: Request, res: Response): Promise<void> {
    try {
      const members = await this.memberService.list(req.query)

      ResponseHelper.success('Data ditemukan', members)(res)
    } catch (error) {
      ErrorHelper.handler(error, res)
    }
  }

  async show (req: Request, res: Response): Promise<void> {
    try {
      const member = await this.memberService.show(+req.params.id)

      ResponseHelper.success('Data ditemukan', member)(res)
    } catch (error) {
      ErrorHelper.handler(error, res)
    }
  }

  async update (req: Request <Members>, res: Response): Promise<void> {
    try {
      const member = await this.memberService.update(+req.params.id, req.body)

      ResponseHelper.success('Data diupdate', member)(res)
    } catch (error) {
      ErrorHelper.handler(error, res)
    }
  }

  async destroy (req: Request, res: Response): Promise<void> {
    try {
      const member = await this.memberService.destroy(+req.params.id)

      ResponseHelper.success('Data dihapus', member)(res)
    } catch (error) {
      ErrorHelper.handler(error, res)
    }
  }
}
