import { Request, Response } from "express";

import { FormulaFindFilter, FormulaLinkEditType, FormulaSimpleEditType } from "./types";
import { LinkEditID, ReqID } from "../shared/reqTypes";
import { FormulaModel } from "../../models/formula/model";

import { linksHandler } from "../utils/linksHandler";

export default class FormulaController {
  public async get(req: Request, res: Response): Promise<void> {
    // console.log("Formula get");

    try {
      switch (+req.query.id) {
        case ReqID.createOne: {
          const result = await (await FormulaModel.createFormula()).execPopulate();
          res.json({ formula: [result] });
          break;
        }

        case ReqID.getOne: {
          const query: FormulaFindFilter = JSON.parse(req.query.data as string);
          const result = await FormulaModel.findOne(query).exec();
          res.json({ formula: [result] });
          break;
        }

        case ReqID.getMany: {
          const query: FormulaFindFilter = JSON.parse(req.query.data as string);
          const result = await FormulaModel.find(query).exec();
          res.json({ formula: result });
          break;
        }

        case ReqID.getAll: {
          const result = await FormulaModel.find().exec();
          res.json({ formula: result });
          break;
        }

        case ReqID.deleteOne: {
          const id: string = JSON.parse(req.query.data as string);
          const result = await linksHandler.formula.delete(id);
          res.json(result);
          break;
        }

        case ReqID.fixLinks: {
          const id: string = JSON.parse(req.query.data as string);
          await linksHandler.formula.reSyncLinks(id);
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
    // console.log("Formula post");

    const body: FormulaSimpleEditType | FormulaLinkEditType = JSON.parse(req.body.body);

    try {
      switch (body.id) {
        case ReqID.updateSimple: {
          const result = await FormulaModel.updateFormula(body.data.id, body.data.filter);
          res.json({ formula: result });
          break;
        }

        case ReqID.updateLink: {
          const { id, filter } = body.data;
          if (id === LinkEditID.addElement && filter.formulaItem) {
            // add chemical
            const result = linksHandler.formula.addChemical(filter.formulaID, filter.formulaItem);
            res.json(result);
          } else if (id === LinkEditID.removeElement && filter.chemicalID) {
            // remove chemical
            const result = linksHandler.formula.removeChemical(filter.formulaID, filter.chemicalID);
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
