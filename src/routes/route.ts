import { Router } from 'express'
import RouteGroup from 'express-route-grouping'

import { MemberController } from '../controllers/member.controller'
import { BookController } from '../controllers/book.controller'
import { BorrowController } from '../controllers/borrow.controller'

export const route = Router()
const root = new RouteGroup('/', route)

const memberController = new MemberController()
const bookController = new BookController()
const borrowController = new BorrowController()

// borrows
route.post('/borrows', borrowController.create.bind(borrowController))
route.post('/returns', borrowController.return.bind(borrowController))
route.get('/members/borrows', borrowController.list.bind(borrowController))

// members
root.group('/members', members => {
  members.post('/', memberController.create.bind(memberController))
  members.get('/', memberController.list.bind(memberController))
  members.get('/:id', memberController.show.bind(memberController))
  members.patch('/:id', memberController.update.bind(memberController))
  members.delete('/:id', memberController.destroy.bind(memberController))
})

// books
root.group('/books', books => {
  books.post('/', bookController.create.bind(bookController))
  books.get('/', bookController.list.bind(bookController))
  books.get('/:id', bookController.show.bind(bookController))
  books.patch('/:id', bookController.update.bind(bookController))
  books.delete('/:id', bookController.destroy.bind(bookController))
})

export default route
