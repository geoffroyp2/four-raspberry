import { Request, Response } from "express";

import { ReqID } from "../shared/reqTypes";
import { ChemicalModel } from "../../models/chemical/model";
import { FormulaModel } from "../../models/formula/model";
import { PieceModel } from "../../models/piece/model";
import { RecordModel } from "../../models/record/model";
import { ReferenceModel } from "../../models/reference/model";
import { linksHandler } from "../utils/linksHandler";

export default class AllController {
  public async get(req: Request, res: Response): Promise<void> {
    // console.log("All get");

    try {
      switch (+req.query.id) {
        case ReqID.getAll: {
          const chemical = await ChemicalModel.find().exec();
          const formula = await FormulaModel.find().exec();
          const piece = await PieceModel.find().exec();
          const record = await RecordModel.find().exec();
          const reference = await ReferenceModel.find().exec();

          res.json({ chemical: chemical, formula: formula, piece: piece, record: record, reference: reference });

          break;
        }

        case ReqID.fixLinks: {
          const chemical = await ChemicalModel.find().exec();
          chemical.forEach(async (elem) => {
            await linksHandler.chemical.reSyncLinks(elem._id);
          });

          const formula = await FormulaModel.find().exec();
          formula.forEach(async (elem) => {
            await linksHandler.formula.reSyncLinks(elem._id);
          });

          const piece = await PieceModel.find().exec();
          piece.forEach(async (elem) => {
            await linksHandler.piece.reSyncLinks(elem._id);
          });

          const record = await RecordModel.find().exec();
          record.forEach(async (elem) => {
            await linksHandler.record.reSyncLinks(elem._id);
          });

          const reference = await ReferenceModel.find().exec();
          reference.forEach(async (elem) => {
            await linksHandler.reference.reSyncLinks(elem._id);
          });

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
}
