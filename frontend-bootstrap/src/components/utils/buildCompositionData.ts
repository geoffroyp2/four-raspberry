import { Formula } from "@baseTypes/database/GQLResTypes";

export const buildCompositionData = (formula: Formula): Chart.ChartData => {
  const data: Chart.ChartDataSets["data"] = [];
  const backgroundColor: Chart.ChartDataSets["backgroundColor"] = [];
  const labels: Chart.ChartData["labels"] = [];

  if (formula.ingredients) {
    formula.ingredients.forEach((i) => {
      const c = i.chemical?.color;
      data.push(i.amount || 0);
      backgroundColor.push(`rgba(${c?.r || 210},${c?.g || 210},${c?.b || 210},${c?.a || 0.9})`);
      labels.push(i.chemical?.name || "-");
    });
  }

  return { datasets: [{ data, backgroundColor }], labels };
};
