import { Request, Response } from "express";

import { RecordFindFilter, RecordLinkEditType, RecordSimpleEditType } from "./types";
import { LinkEditID, ReqID } from "../shared/reqTypes";
import { RecordModel } from "../../models/record/model";

import { linksHandler } from "../utils/linksHandler";

const get = async (req: Request, res: Response): Promise<void> => {
  // console.log("Record get");

  try {
    switch (+req.query.id) {
      case ReqID.createOne: {
        const result = await (await RecordModel.createRecord()).execPopulate();
        res.json({ record: [result] });
        break;
      }

      case ReqID.getOne: {
        const query: RecordFindFilter = JSON.parse(req.query.data as string);
        const result = await RecordModel.findOne(query).exec();
        res.json({ record: [result] });
        break;
      }

      case ReqID.getMany: {
        const query: RecordFindFilter = JSON.parse(req.query.data as string);
        const result = await RecordModel.find(query).exec();
        res.json({ record: result });
        break;
      }

      case ReqID.getAll: {
        const result = await RecordModel.find().exec();
        res.json({ record: result });
        break;
      }

      case ReqID.deleteOne: {
        const id = req.query.data as string;
        const result = await linksHandler.record.delete(id);
        res.json(result);
        break;
      }

      case ReqID.fixLinks: {
        const id = req.query.data as string;
        await linksHandler.record.fixLinks(id);
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
};
const post = async (req: Request, res: Response): Promise<void> => {
  // console.log("Record post");

  const body: RecordSimpleEditType | RecordLinkEditType = JSON.parse(req.body.body);

  try {
    switch (body.id) {
      case ReqID.updateSimple: {
        const result = await RecordModel.updateRecord(body.data.id, body.data.filter);
        res.json({ record: [result] });
        break;
      }

      case ReqID.updateLink: {
        const { id, filter } = body.data;

        if (id === LinkEditID.addElement && filter.pieceID) {
          const result = await linksHandler.record.addPiece(filter.recordID, filter.pieceID);
          res.json(result);
        } else if (id === LinkEditID.removeElement && filter.pieceID) {
          const result = await linksHandler.record.removePiece(filter.recordID, filter.pieceID);
          res.json(result);
        } else if (id === LinkEditID.changeLink && filter.referenceID) {
          const result = await linksHandler.record.changeReference(filter.recordID, filter.referenceID);
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
};

export default { get, post };
