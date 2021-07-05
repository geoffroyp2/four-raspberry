import { Ingredient } from "@app/_types/dbTypes";

export const buildCompositionData = (ingredients: Ingredient[]) => {
  const datasets = [
    {
      data: ingredients.map(({ amount }) => amount || 0),
      backgroundColor: ingredients.map(
        ({ chemical }) =>
          `rgba(${chemical?.color?.r || 210},${chemical?.color?.g || 210},${chemical?.color?.b || 210},${
            chemical?.color?.a || 0.9
          })`
      ),
    },
  ];

  return { datasets, labels: ingredients.map(({ chemical }) => chemical?.name ?? "-") };
};
