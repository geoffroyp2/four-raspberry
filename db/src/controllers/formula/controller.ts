import { Request, Response } from "express";
import { FormulaDeleteType, FormulaEditType, FormulaFindType } from "./types";
import { ReqID } from "../shared/reqTypes";
import { ResID } from "../shared/resTypes";
import { FormulaModel } from "../../models/formula/model";

export default class FormulaController {
  public async get(req: Request, res: Response): Promise<void> {
    console.log("Formula get");

    try {
      switch (+req.query.id) {
        case ReqID.createOne: {
          const result = await (await FormulaModel.createFormula()).execPopulate();
          res.json({ id: ResID.success, data: [result] });
          break;
        }
        case ReqID.getOne: {
          const query: FormulaFindType = JSON.parse(req.query as any);
          const result = await FormulaModel.findOne(query.data).exec();
          res.json({ id: ResID.success, data: [result] });
          break;
        }
        case ReqID.getMany: {
          const query: FormulaFindType = JSON.parse(req.query as any);
          const result = await FormulaModel.find(query.data).exec();
          res.json({ id: ResID.success, data: result });
          break;
        }
        case ReqID.getAll: {
          const result = await FormulaModel.find().exec();
          res.json({ id: ResID.success, data: result });
          break;
        }
        case ReqID.deleteOne: {
          const query: FormulaDeleteType = JSON.parse(req.query as any);
          await FormulaModel.deleteOne(query.data).exec();
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
    console.log("Formula post");

    const body: FormulaEditType = JSON.parse(req.body.body);

    try {
      switch (body.id) {
        case ReqID.updateOne: {
          const result = await FormulaModel.updateFormula(body.data);
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
