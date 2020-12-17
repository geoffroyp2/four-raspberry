import { LoadTableSortType } from "@redux/displayStateReducers/generalDisplaySlice";
import { Record, Reference } from "@sharedTypes/dbModelTypes";

export const recordLoadTableSort = (a: Record, b: Record, sort: { param: LoadTableSortType; direction: boolean }): number => {
  let result = 0;
  switch (sort.param) {
    case "date":
      result = new Date(a.date).getTime() - new Date(b.date).getTime();
      break;
    case "lastUpdated":
      if (a.lastUpdated && b.lastUpdated) result = new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime();
      break;
    case "name":
      result = a.name.localeCompare(b.name);
      break;
    case "reference":
      if (a.reference && b.reference) result = a.reference.localeCompare(b.reference);
      else if (a.reference) result = -1;
      else result = 1;
      break;
    default:
      break;
  }

  if (!sort.direction) result *= -1;
  return result;
};

export const referenceLoadTableSort = (
  a: Reference,
  b: Reference,
  sort: { param: LoadTableSortType; direction: boolean }
): number => {
  let result = 0;
  switch (sort.param) {
    case "lastUpdated":
      if (a.lastUpdated && b.lastUpdated) result = new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime();
      break;
    case "name":
      result = a.name.localeCompare(b.name);
      break;
    default:
      break;
  }
  if (!sort.direction) result *= -1;
  return result;
};

// export const graphFilter = (graph: Graph, filter: GraphEditFilter["filter"]): boolean => {
//   return (
//     (filter.name !== undefined ? graph.name === filter.name : true) &&
//     (filter.description !== undefined ? graph.description === filter.description : true) &&
//     (filter.graphType !== undefined ? graph.graphType === filter.graphType : true) &&
//     (filter.graphRef !== undefined ? graph.graphRef === filter.graphRef : true) &&
//     (filter.date !== undefined ? graph.date === filter.date : true) &&
//     (filter.color !== undefined
//       ? graph.color.r === filter.color.r &&
//         graph.color.g === filter.color.g &&
//         graph.color.b === filter.color.b &&
//         (filter.color.a ? graph.color.a === filter.color.a : true)
//       : true) &&
//     (filter.points !== undefined
//       ? graph.points.length === filter.points.length &&
//         graph.points.filter((p, i) => {
//           return p.x === filter.points![i].x && p.y === filter.points![i].y;
//         }).length === graph.points.length
//       : true)
//   );
// };

// export const graphSort = (a: [string, Graph], b: [string, Graph], param: TableSortType, direction: boolean): number => {
//   let result = 0;
//   switch (param) {
//     case "date":
//       result = new Date(a[1].date).getTime() - new Date(b[1].date).getTime();
//       break;
//     case "lastUpdated":
//       if (a[1].lastUpdated && b[1].lastUpdated)
//         result = new Date(a[1].lastUpdated).getTime() - new Date(b[1].lastUpdated).getTime();
//       break;
//     case "name":
//       result = a[1].name.localeCompare(b[1].name);
//       break;
//     case "ref":
//       if (a[1].graphRef && b[1].graphRef) result = a[1].graphRef.localeCompare(b[1].graphRef);
//       else if (a[1].graphRef) result = -1;
//       else result = 1;
//       break;
//     case "type":
//       if (a[1].graphType === b[1].graphType) result = 0;
//       else if (a[1].graphType) result = -1;
//       else result = 1;
//       break;
//     default:
//       break;
//   }

//   if (!direction) result *= -1;
//   return result;
// };
