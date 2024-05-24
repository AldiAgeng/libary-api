import { Response, Request } from 'express'
import { BookService } from '../services/book.service'
import { ResponseHelper } from '../helpers/response.helper'
import { Books } from '../databases/models/books'
import { ErrorHelper } from '../helpers/error.helper'

export class BookController {
  private bookService: BookService

  constructor () {
    this.bookService = new BookService()
  }

  async create (req: Request<Record<string, unknown>, Record<string, unknown>, Books>, res: Response): Promise<void> {
    try {
      const book = await this.bookService.store(req.body)

      ResponseHelper.success('Data disimpan', book, 201)(res)
    } catch (error) {
      ErrorHelper.handler(error, res)
    }
  }

  async list (req: Request, res: Response): Promise<void> {
    try {
      const book = await this.bookService.list(req.query)

      ResponseHelper.success('Data ditemukan', book)(res)
    } catch (error) {
      ErrorHelper.handler(error, res)
    }
  }

  async show (req: Request, res: Response): Promise<void> {
    try {
      const book = await this.bookService.show(+req.params.id)

      ResponseHelper.success('Data ditemukan', book)(res)
    } catch (error) {
      ErrorHelper.handler(error, res)
    }
  }

  async update (req: Request <Books>, res: Response): Promise<void> {
    try {
      const book = await this.bookService.update(+req.params.id, req.body)

      ResponseHelper.success('Data diupdate', book)(res)
    } catch (error) {
      ErrorHelper.handler(error, res)
    }
  }

  async destroy (req: Request, res: Response): Promise<void> {
    try {
      const book = await this.bookService.destroy(+req.params.id)

      ResponseHelper.success('Data dihapus', book)(res)
    } catch (error) {
      ErrorHelper.handler(error, res)
    }
  }
}
