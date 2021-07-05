import { FC } from "react";
import { Doughnut } from "react-chartjs-2";

import { Ingredient } from "@app/_types/dbTypes";
import { buildCompositionData } from "./_utils/buildCompositionData";
import { compositionOptions } from "./_utils/compositionOptions";
type Props = {
  ingredients: Ingredient[];
};

const ChemicalComposition: FC<Props> = ({ ingredients }) => {
  const data = buildCompositionData(ingredients);

  console.log({ data });

  return (
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 max-w-3xl">
      <div className="bg-gray-900 p-2 pt-3 rounded-lg shadow-lg ">
        <Doughnut type="doughnut" data={data} options={compositionOptions} />
      </div>
    </div>
  );
};

export default ChemicalComposition;
