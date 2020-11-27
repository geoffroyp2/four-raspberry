import { Color, Point } from "@clientTypes/programInterfaces";

export const GraphPostIdString = ["Update One"];
export enum GraphPostId {
  updateOne,
}

export interface GraphEditFilter {
  graphId: string; // Required to identify the graph to edit
  filter: {
    name?: string;
    description?: string;
    graphType?: boolean;
    graphRef?: string;
    color?: Color;
    points?: Point[];
    pieces?: string[];
    date?: string;
  };
}

export type GraphPostRequest = {
  id: GraphPostId.updateOne;
  data: GraphEditFilter;
};
