import { Request, Response } from "express";

import { ChemicalFindFilter, ChemicalFindType, ChemicalSimpleEditType } from "./types";
import { ReqID } from "../shared/reqTypes";
import { ChemicalModel } from "../../models/chemical/model";

import { linksHandler } from "../utils/linksHandler";

export default class ChemicalController {
  public async get(req: Request, res: Response): Promise<void> {
    // console.log("Chemical get");

    try {
      switch (+req.query.id) {
        case ReqID.createOne: {
          const result = await (await ChemicalModel.createChemical()).execPopulate();
          res.json({ chemical: [result] });
          break;
        }

        case ReqID.getOne: {
          const query: ChemicalFindFilter = JSON.parse(req.query.data as string);
          const result = await ChemicalModel.findOne(query).exec();
          res.json({ chemical: [result] });
          break;
        }

        case ReqID.getMany: {
          const query: ChemicalFindType = JSON.parse(req.query.data as string);
          const result = await ChemicalModel.find(query).exec();
          res.json({ chemical: result });
          break;
        }

        case ReqID.getAll: {
          const result = await ChemicalModel.find().exec();
          res.json({ chemical: result });
          break;
        }

        case ReqID.deleteOne: {
          const id: string = JSON.parse(req.query.data as string);
          const result = await linksHandler.chemical.delete(id);
          res.json(result);
          break;
        }

        case ReqID.fixLinks: {
          const id: string = JSON.parse(req.query.data as string);
          await linksHandler.chemical.reSyncLinks(id);
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
    // console.log("Chemical post");

    const body: ChemicalSimpleEditType = JSON.parse(req.body.body);

    try {
      switch (body.id) {
        case ReqID.updateSimple: {
          const result = await ChemicalModel.updateChemical(body.data.id, body.data.filter);
          res.json({ chemical: [result] });
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
