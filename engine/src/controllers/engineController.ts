import { Request, Response } from "express";
import { GetID, GetRequest, PostID, PostRequest } from "./queryFormat";
import engine from "../engine/engine";

export class EngineController {
  public async get(req: Request, res: Response): Promise<void> {
    const query: GetRequest = {
      id: +req.query.id,
      param: req.query.param,
    };

    console.log("Get ");

    try {
      switch (query.id) {
        case GetID.start:
          engine.start();
          res.json("ok");
          break;
        case GetID.stop:
          engine.stop();
          res.json("ok");
          break;
        case GetID.pause:
          engine.pause();
          res.json("ok");
          break;
        case GetID.ping:
          engine.ping();
          res.json("ok");
          break;
        case GetID.getSensorValues:
          const sensorValues = engine.getSensorValues();
          res.json(sensorValues);
          break;
        default:
          res.json("bad id");
          break;
      }
    } catch (e) {
      console.error(e);
      res.json("no answer");
    }
  }

  public async post(req: Request, res: Response): Promise<void> {
    const body: PostRequest = JSON.parse(req.body.body);

    console.log("Post ");

    try {
      switch (body.id) {
        case PostID.load:
          res.json("ok");
          break;
        default:
          res.json("bad id");
          break;
      }
    } catch (e) {
      console.error(e);
      res.json("no answer from database");
    }
  }
}
