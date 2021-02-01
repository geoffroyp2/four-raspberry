import { Request, Response } from "express";
import engine from "../+old/engine/engine";
import { EngineGetId, EngineGetRequest } from "./types/getTypes";
import { EnginePostId, EnginePostRequest } from "./types/postTypes";
import { EngineResId } from "./types/resTypes";

export class EngineController {
  public async get(req: Request, res: Response): Promise<void> {
    const query: EngineGetRequest = {
      id: +req.query.id,
      data: req.query.data && JSON.parse(req.query.data as string),
    };

    console.log("Get ");

    try {
      switch (query.id as EngineGetId) {
        case EngineGetId.command:
          engine.command(query.data);
          res.json({ id: EngineResId.succes, data: engine.status });
          break;
        case EngineGetId.ping:
          engine.ping();
          res.json({ id: EngineResId.succes, data: engine.status });
          break;
        case EngineGetId.getStatus:
          res.json({ id: EngineResId.succes, data: engine.status });
          break;
        case EngineGetId.getTargetGraph:
          res.json({ id: EngineResId.succes, data: engine.graph });
          break;
        default:
          res.json({ id: EngineResId.error, data: "bad id" });
          break;
      }
    } catch (e) {
      console.error(e);
      res.json({ id: EngineResId.error, data: "error" });
    }
  }

  public async post(req: Request, res: Response): Promise<void> {
    const body: EnginePostRequest = JSON.parse(req.body.body);

    console.log("Post ");

    try {
      switch (body.id) {
        case EnginePostId.loadGraph:
          engine.load(body.data);
          res.json({ id: EngineResId.succes, data: engine.status });
          break;
        default:
          res.json({ id: EngineResId.error, data: "bad id" });
          break;
      }
    } catch (e) {
      console.error(e);
      res.json({ id: EngineResId.error, data: "error" });
    }
  }
}
