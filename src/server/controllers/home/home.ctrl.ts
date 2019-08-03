import path from "path";
import { Request, Response} from "express";

export const index = (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, '../../index.html'))
}

export const all = (req: Request, res: Response) => {
  res.redirect('/')
}
