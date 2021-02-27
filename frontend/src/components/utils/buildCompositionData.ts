import { Formula } from "@baseTypes/database/GQLResTypes";

export const buildCompositionData = (formula: Formula): Chart.ChartData => {
  const dataSet: Chart.ChartDataSets = { data: [] };
  const labels: Chart.ChartData["labels"] = [];

  if (formula.ingredients) {
    formula.ingredients.forEach((i) => {
      dataSet.data?.push(i.amount || 0);
      labels.push(i.chemical?.name || "-");
    });
  }

  return { datasets: [dataSet], labels };
};
