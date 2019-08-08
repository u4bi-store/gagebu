import {Response, Request, NextFunction} from 'express'

export interface Controller {
  (options: any, services: any): Promise<any>
}

const http = (controller: Controller, services: any) => 
async (req: Request, res: Response, next: NextFunction) => {
  const options = {
    ...req.params,
    ...req.query,
    ...req.body,
  }
  
  try {
    const result = await controller(options, services);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export default http;


