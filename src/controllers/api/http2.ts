import {Response, Request, NextFunction} from 'express'

export abstract class Controller<S> {
  services: S
  constructor(services: S) {
    this.services = services
  }
  abstract run(options: any): any;
  
}

// todo any -> Controller
const http2 = (controller: any) => 
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
    next(err);
  }
}

export default http2;
