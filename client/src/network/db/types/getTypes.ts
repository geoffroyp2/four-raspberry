export const GraphGetIdString = ["Get One", "Get Many", "Get All", "Create One", "Delete One"];

export enum GraphGetId {
  getOne,
  getMany,
  getAll,
  createOne,
  deleteOne,
}

export interface GraphDeleteFilter {
  _id: string;
}

export interface GraphFindFilter {
  _id?: string;
  name?: string;
  graphType?: boolean;
  graphRef?: string;
}

export type GraphGetRequest =
  | {
      id: GraphGetId.getOne | GraphGetId.getMany;
      data: GraphFindFilter;
    }
  | {
      id: GraphGetId.getAll | GraphGetId.createOne;
    }
  | {
      id: GraphGetId.deleteOne;
      data: GraphDeleteFilter;
    };
