import { Request, Response} from "express";
import Debug from 'debug'

const debug = Debug('gagebu:controller:home')

export const index = (req: Request, res: Response) => {
  debug('index')
  res.render('index', {title: '가계부'})
}

export const notFound = (req: Request, res: Response) => {
  res.sendStatus(404)
}
