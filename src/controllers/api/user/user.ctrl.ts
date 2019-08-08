import { Request, Response } from 'express'
import { User } from  '../../../dto/index'

export const me = async (req: Request, res: Response) => {
  const user: User = {
    name: '김정환'
  }
  res.json(user)
}
