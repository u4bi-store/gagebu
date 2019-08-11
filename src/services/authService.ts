import { Request, Response, NextFunction } from 'express'

export const isAuthenticated = () => 
(req: Request, res: Response, next: NextFunction): void => {
  if (req.user) return next()
  res.sendStatus(401);
}
  