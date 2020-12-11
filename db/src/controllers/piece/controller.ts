import { Request, Response } from "express";
import { PieceDeleteType, PieceEditType, PieceFindType } from "./types";
import { ReqID } from "../shared/reqTypes";
import { ResID } from "../shared/resTypes";
import { PieceModel } from "../../models/piece/model";

export default class PieceController {
  public async get(req: Request, res: Response): Promise<void> {
    console.log("Piece get");

    try {
      switch (+req.query.id) {
        case ReqID.createOne: {
          const result = await (await PieceModel.createPiece()).execPopulate();
          res.json({ id: ResID.success, data: [result] });
          break;
        }
        case ReqID.getOne: {
          const query: PieceFindType = JSON.parse(req.query as any);
          const result = await PieceModel.findOne(query.data).exec();
          res.json({ id: ResID.success, data: [result] });
          break;
        }
        case ReqID.getMany: {
          const query: PieceFindType = JSON.parse(req.query as any);
          const result = await PieceModel.find(query.data).exec();
          res.json({ id: ResID.success, data: result });
          break;
        }
        case ReqID.getAll: {
          const result = await PieceModel.find().exec();
          res.json({ id: ResID.success, data: result });
          break;
        }
        case ReqID.deleteOne: {
          const query: PieceDeleteType = JSON.parse(req.query as any);
          await PieceModel.deleteOne(query.data).exec();
          res.json({ id: ResID.success, data: [] });
          break;
        }
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
    console.log("Piece post");

    const body: PieceEditType = JSON.parse(req.body.body);

    try {
      switch (body.id) {
        case ReqID.updateOne: {
          const result = await PieceModel.updatePiece(body.data);
          //   console.log(`Updated "${updatedGraph.name}"`);
          res.json({ id: ResID.success, data: [result] });
          break;
        }
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