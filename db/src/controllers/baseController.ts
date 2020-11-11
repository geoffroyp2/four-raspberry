import { Request, Response } from "express";

export class BaseController {
  public post(req: Request, res: Response) {
    const data = JSON.parse(req.body.body);

    console.log(data);

    const onReceive = (response: any) => {
      res.json(response);
    };
  }
}
