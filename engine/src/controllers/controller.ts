import { Request, Response } from "express";
import { ReqID, ReqType } from "./types/reqType";
import { ResID } from "./types/resType";
import engine from "../engine/engine";

export class EngineController {
  public async get(req: Request, res: Response): Promise<void> {
    // console.log("get");

    try {
      switch (+req.query.id) {
        case ReqID.ping:
          break;

        case ReqID.start:
          engine.start();
          res.json({ id: ResID.success, data: { state: engine.getState() } });
          break;
        case ReqID.stop:
          engine.stop();
          res.json({ id: ResID.success, data: { state: engine.getState() } });
          break;

        case ReqID.pause:
          engine.pause();
          res.json({ id: ResID.success, data: { state: engine.getState() } });
          break;
        case ReqID.unpause:
          engine.unpause();
          res.json({ id: ResID.success, data: { state: engine.getState() } });
          break;

        case ReqID.getRef:
          res.json({ id: ResID.success, data: { ref: engine.getRef() } });
          break;

        case ReqID.getState:
          res.json({ id: ResID.success, data: { state: engine.getState() } });
          break;

        case ReqID.getGraphs:
          res.json({ id: ResID.success, data: { graphs: engine.getGraphs() } });
          break;

        case ReqID.reconnect:
          engine.reconnect();
          res.json({ id: ResID.success, data: {} });
          break;

        default:
          res.json({ id: ResID.error, data: "bad id" });
          break;
      }
    } catch (e) {
      console.error(e);
      res.json({ id: ResID.error, data: "communication error" });
    }
  }

  public async post(req: Request, res: Response): Promise<void> {
    console.log("post");

    const body: ReqType = JSON.parse(req.body.body);

    try {
      switch (body.id) {
        case ReqID.loadRef:
          if (body.data.reference) {
            engine.loadRef(body.data.reference);
            res.json({ id: ResID.success, data: { ref: engine.getRef() } });
          } else {
            res.json({ id: ResID.error, data: "invalid data" });
          }
          break;

        default:
          res.json({ id: ResID.error, data: "no data" });
          break;
      }
    } catch (e) {
      console.error(e);
      res.json({ id: ResID.error, data: "communication error" });
    }
  }
}
