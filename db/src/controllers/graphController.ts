import { Request, Response } from "express";
import { GraphModel } from "../models/graph/model";

import {
  GraphGetRequest,
  logStringGet,
  logStringPost,
  GraphPostRequest,
  GraphGetId,
  GraphPostId,
  GraphEditFilter,
} from "./graphQueryFormat";

// Todo: handle connexion and errors to database

export class GraphController {
  public async get(req: Request, res: Response): Promise<void> {
    const query: GraphGetRequest = {
      id: +req.query.id,
      filter: req.query.filter && { ...JSON.parse(req.query.filter as string) },
    };

    console.log("Get: ", logStringGet[query.id], query.filter ? query.filter : "");

    try {
      switch (query.id) {
        case GraphGetId.getOne: {
          const result = await GraphModel.findOne(query.filter).exec();
          res.json(result);
          break;
        }
        case GraphGetId.getMany: {
          const result = await GraphModel.find(query.filter).exec();
          res.json(result);
          break;
        }
        case GraphGetId.getAll: {
          const result = await GraphModel.find().exec();
          res.json(result);
          break;
        }
        case GraphGetId.createOne: {
          const result = await (await GraphModel.createNewGraph(query.filter as GraphEditFilter)).execPopulate();
          res.json(result);
          break;
        }
        case GraphGetId.deleteOne: {
          const result = await GraphModel.deleteOne(query.filter).exec();
          console.log(result);
          res.json(result);
          break;
        }
        default:
          res.json([]);
          break;
      }
    } catch (e) {
      console.error(e);
      res.json("no answer from database");
    }
  }

  public async post(req: Request, res: Response): Promise<void> {
    const body: GraphPostRequest = JSON.parse(req.body.body);

    console.log("Post: ", logStringPost[body.id]);

    try {
      switch (body.id) {
        case GraphPostId.updateOne: {
          const updatedGraph = await GraphModel.updateGraph(body.graphId, body.filter);
          console.log(`Updated "${updatedGraph.name}"`);
          res.json(updatedGraph);
          break;
        }
        default:
          res.json([]);
          break;
      }
    } catch (e) {
      console.error(e);
      res.json("no answer from database");
    }
  }
}
