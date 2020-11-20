import { Request, Response } from "express";
import { GraphModel } from "../models/graph/model";

import {
  GetRequest,
  logString,
  NewGraphFilter,
  PostRequest,
  ReqId,
} from "./queryFormat";

// Todo: handle connexion and errors to database

export class GraphController {
  public async get(req: Request, res: Response): Promise<void> {
    const query: GetRequest = {
      id: +req.query.id,
      filter: req.query.filter && { ...JSON.parse(req.query.filter as string) },
    };

    console.log("Get: ", logString[query.id], query.filter ? query.filter : "");

    try {
      switch (query.id) {
        case ReqId.getAll: {
          const result = await GraphModel.find().exec();
          res.json(result);
          break;
        }
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
        case ReqId.createOne: {
          const result = await (
            await GraphModel.createNewGraph(query.filter as NewGraphFilter)
          ).execPopulate();
          res.json(result);
          break;
        }
        case ReqId.delete: {
          const result = await GraphModel.deleteOne(query.filter).exec();
          console.log(result);
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

    console.log("Post: ", logString[body.id]);

    try {
      switch (body.id) {
        case ReqId.createOne: {
          const newGraph = await GraphModel.create(body.graph);
          console.log(`New ${body.graph.graphType} graph "${body.graph.name}"`);
          res.json(newGraph);
          break;
        }
        case ReqId.update: {
          const updatedGraph = await GraphModel.updateGraph(
            body.graph,
            body.filter
          );
          console.log(`Updated "${body.graph.name}"`);
          res.json(updatedGraph);
          break;
        }
      }
    } catch (e) {
      console.error(e);
      res.json(false);
    }
  }
}
