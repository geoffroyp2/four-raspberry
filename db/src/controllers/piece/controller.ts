import { Request, Response } from "express";

import { PieceFindFilter, PieceLinkEditType, PieceSimpleEditType } from "./types";
import { LinkEditID, ReqID } from "../shared/reqTypes";
import { PieceModel } from "../../models/piece/model";

import { linksHandler } from "../utils/linksHandler";

export default class PieceController {
  public async get(req: Request, res: Response): Promise<void> {
    // console.log("Piece get");

    try {
      switch (+req.query.id) {
        case ReqID.createOne: {
          const result = await (await PieceModel.createPiece()).execPopulate();
          res.json({ piece: [result] });
          break;
        }

        case ReqID.getOne: {
          const query: PieceFindFilter = JSON.parse(req.query.data as string);
          const result = await PieceModel.findOne(query).exec();
          res.json({ piece: [result] });
          break;
        }

        case ReqID.getMany: {
          const query: PieceFindFilter = JSON.parse(req.query.data as string);
          const result = await PieceModel.find(query).exec();
          res.json({ piece: result });
          break;
        }

        case ReqID.getAll: {
          const result = await PieceModel.find().exec();
          res.json({ piece: result });
          break;
        }

        case ReqID.deleteOne: {
          const id: string = JSON.parse(req.query.data as string);
          const result = await linksHandler.piece.delete(id);
          res.json(result);
          break;
        }

        case ReqID.fixLinks: {
          const id: string = JSON.parse(req.query.data as string);
          await linksHandler.piece.reSyncLinks(id);
          res.json({});
          break;
        }

        default:
          res.status(400).json("Bad Request");
          break;
      }
    } catch (e) {
      console.error(e);
      res.status(404).json("Not Found");
    }
  }
  public async post(req: Request, res: Response): Promise<void> {
    // console.log("Piece post");

    const body: PieceSimpleEditType | PieceLinkEditType = JSON.parse(req.body.body);

    try {
      switch (body.id) {
        case ReqID.updateSimple: {
          const result = await PieceModel.updatePiece(body.data.id, body.data.filter);
          res.json({ formula: result });
          break;
        }

        case ReqID.updateLink: {
          const { id, filter } = body.data;

          if (id === LinkEditID.addElement && filter.recordID) {
            const result = await linksHandler.piece.addRecord(filter.pieceID, filter.recordID);
            res.json(result);
          } else if (id === LinkEditID.removeElement && filter.recordID) {
            const result = await linksHandler.piece.removeRecord(filter.pieceID, filter.recordID);
            res.json(result);
          } else if (id === LinkEditID.changeLink && filter.formulaID) {
            const result = await linksHandler.piece.changeFormula(filter.pieceID, filter.formulaID);
            res.json(result);
          } else {
            res.status(400).json("Bad Request");
          }
          break;
        }

        default:
          res.status(400).json("Bad Request");
          break;
      }
    } catch (e) {
      console.error(e);
      res.status(404).json("Not Found");
    }
  }
}
