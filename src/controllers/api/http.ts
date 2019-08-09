import {Response, Request, NextFunction} from 'express'

export abstract class Controller<S> {
  services: S
  constructor(services: S) {
    this.services = services
  }
  abstract run(options: any): any;
  
}

const http = (controller: Controller<any>) => 
async (req: Request, res: Response, next: NextFunction) => {
  const options = {
    ...req.params,
    ...req.query,
    ...req.body,
  }
  
  try {
    const result = await controller.run(options);
    res.json(result);
  } catch (err) {
    const {status} = err;
    if (status && status >= 400 || status < 500) {
      res.sendStatus(status);
      return;
    }
    next(err);
  }
}

export default http;
