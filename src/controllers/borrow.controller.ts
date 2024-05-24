import { Response, Request } from 'express'
import { BorrowService } from '../services/borrow.service'
import { ResponseHelper } from '../helpers/response.helper'
import { Borrows } from '../databases/models/borrows'
import { ErrorHelper } from '../helpers/error.helper'

export class BorrowController {
  private borrowService: BorrowService

  constructor () {
    this.borrowService = new BorrowService()
  }

  async create (req: Request<Record<string, unknown>, Record<string, unknown>, Borrows>, res: Response): Promise<void> {
    try {
      const book = await this.borrowService.store(req.body)

      ResponseHelper.success('Data disimpan', book, 201)(res)
    } catch (error) {
      ErrorHelper.handler(error, res)
    }
  }

  async return (req: Request <Borrows>, res: Response): Promise<void> {
    try {
      const data = await this.borrowService.return(req.body)

      ResponseHelper.success('Data diupdate', data)(res)
    } catch (error) {
      ErrorHelper.handler(error, res)
    }
  }

  async list (req: Request, res: Response): Promise<void> {
    try {
      const borrows = await this.borrowService.list()

      ResponseHelper.success('Data ditemukan', borrows)(res)
    } catch (error) {
      ErrorHelper.handler(error, res)
    }
  }
}
