declare namespace Express {
  export interface Request {
    user: {
      id: number
      name: string
      email: string
      fullname: string
      role: string
    }
  }
}
