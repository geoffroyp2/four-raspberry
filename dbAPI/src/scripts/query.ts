import Chemical from "../database/models/formula/chemical";
import Formula from "../database/models/formula/formula";
import Ingredient from "../database/models/formula/ingredient";
import Record from "../database/models/record/record";
import Target from "../database/models/target/target";

export const queryTest = async () => {
  const f1 = await Formula.findOne({ where: { id: 1 } });
  const c1 = await Chemical.findOne({ where: { id: 1 } });

  if (f1 && c1) {
    const chemicals = await f1.getChemicals();
    chemicals.forEach((c) => {
      console.log(c.id, c.name, c.chemicalName, c.density, c.Ingredient?.amount);
    });

    const formulas = await c1.getFormulas();
    formulas.forEach((f) => {
      console.log(f.id, f.name, f.description, f.Ingredient?.amount);
    });
  }
};
