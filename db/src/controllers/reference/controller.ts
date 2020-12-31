import { Request, Response } from "express";

import { ReferenceFindFilter, ReferenceSimpleEditType } from "./types";
import { ReqID } from "../shared/reqTypes";
import { ReferenceModel } from "../../models/reference/model";

import { linksHandler } from "../utils/linksHandler";

const get = async (req: Request, res: Response): Promise<void> => {
  // console.log("Reference get");

  try {
    switch (+req.query.id) {
      case ReqID.createOne: {
        const result = await (await ReferenceModel.createReference()).execPopulate();
        res.json({ reference: [result] });
        break;
      }

      case ReqID.getOne: {
        const query: ReferenceFindFilter = JSON.parse(req.query.data as string);
        const result = await ReferenceModel.findOne(query).exec();
        res.json({ reference: [result] });
        break;
      }

      case ReqID.getMany: {
        const query: ReferenceFindFilter = JSON.parse(req.query.data as string);
        const result = await ReferenceModel.find(query).exec();
        res.json({ reference: result });
        break;
      }

      case ReqID.getAll: {
        const result = await ReferenceModel.find().exec();
        res.json({ reference: result });
        break;
      }

      case ReqID.deleteOne: {
        const id = req.query.data as string;
        const result = await linksHandler.reference.delete(id);
        res.json(result);
        break;
      }

      case ReqID.fixLinks: {
        const id = req.query.data as string;
        await linksHandler.reference.fixLinks(id);
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
  // console.log("Reference post");

  const body: ReferenceSimpleEditType = JSON.parse(req.body.body);

  try {
    switch (body.id) {
      case ReqID.updateSimple: {
        const result = await ReferenceModel.updateReference(body.data.id, body.data.filter);
        res.json({ reference: [result] });
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
