import { GraphEditFilter } from "../../db/graphQueryFormat";
import { Graph } from "../../interfaces/Igraph";

export const graphFilterResult = (graph: Graph, filter: GraphEditFilter): boolean => {
  return (
    (filter.name !== undefined ? graph.name === filter.name : true) &&
    (filter.description !== undefined ? graph.description === filter.description : true) &&
    (filter.graphType !== undefined ? graph.graphType === filter.graphType : true) &&
    (filter.graphRef !== undefined ? graph.graphRef === filter.graphRef : true) &&
    (filter.date !== undefined ? graph.date === filter.date : true) &&
    (filter.color !== undefined
      ? graph.color.r === filter.color.r &&
        graph.color.g === filter.color.g &&
        graph.color.b === filter.color.b &&
        (filter.color.a ? graph.color.a === filter.color.a : true)
      : true) &&
    (filter.points !== undefined
      ? graph.points.length === filter.points.length &&
        graph.points.filter((p, i) => {
          return p.x === filter.points![i].x && p.y === filter.points![i].y;
        }).length === graph.points.length
      : true)
  );
};
