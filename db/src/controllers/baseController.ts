import { Request, Response } from "express";
import { IGraph } from "../models/graph/types";
import database from "../database";
import { GraphModel } from "../models/graph/model";

export class BaseController {
  public async get(req: Request, res: Response): Promise<void> {
    const query = req.query;
    console.log("\nnew query: ", req.query);

    if (query.id === "getAll") {
      console.log("ici");

      try {
        const result = await GraphModel.find({
          graphType: `${query.arg}`,
        }).exec();
        console.log("fetched results");

        res.json(result);
      } catch (e) {
        console.error(e);
        res.json([]);
      }
    }
  }

  public async post(req: Request, res: Response): Promise<void> {
    const body: { id: string; data: IGraph[] } = JSON.parse(req.body.body);

    database.connect();
    try {
      for (const entry of body.data) {
        await GraphModel.create(entry);
        console.log(`Inserted ${entry.graphType} graph "${entry.name}"`);
      }
      res.json("ok");
    } catch (e) {
      console.error(e);
      res.json("fail");
    }
  }
}
