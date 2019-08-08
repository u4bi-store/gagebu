import {Response, Request, NextFunction} from 'express'
export interface Controller<T = any> {
  (options: T): Promise<any>
}

const http = (controller: Controller) => 
async (req: Request, res: Response, next: NextFunction) => {
  const options = {
    ...req.params,
    ...req.query,
    ...req.body,
  }
  
  try {
    const result = await controller(options);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export default http;
