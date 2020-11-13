import { Request, Response } from "express";
import { GraphModel } from "../models/graph/model";

import { GetRequest, PostRequest, ReqId } from "./queryFormat";

// Todo: handle connexion and errors to database

export class GraphController {
  public async get(req: Request, res: Response): Promise<void> {
    const query: GetRequest = {
      id: +req.query.id,
      filter: req.query.filter && { ...JSON.parse(req.query.filter as string) },
    };

    console.log("\nnew get: ", query);

    try {
      switch (query.id) {
        case ReqId.getModels: {
          const result = await GraphModel.findModelGraphs();
          res.json(result);
          break;
        }
        case ReqId.getRecorded: {
          const result = await GraphModel.findRecordedGraphs();
          res.json(result);
          break;
        }
        case ReqId.getOne: {
          const result = await GraphModel.findOne(query.filter).exec();
          res.json(result);
          break;
        }
        case ReqId.getMany: {
          const result = await GraphModel.find(query.filter).exec();
          res.json(result);
          break;
        }
      }
    } catch (e) {
      console.error(e);
      res.json([]);
    }
  }

  public async post(req: Request, res: Response): Promise<void> {
    const body: PostRequest = JSON.parse(req.body.body);

    console.log("\nnew post: ", body);

    try {
      await GraphModel.create(body.data);
      console.log(`Inserted ${body.data.graphType} graph "${body.data.name}"`);
      res.json(true);
    } catch (e) {
      console.error(e);
      res.json(false);
    }
  }
}
