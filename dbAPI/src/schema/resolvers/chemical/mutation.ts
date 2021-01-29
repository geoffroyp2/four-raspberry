import Chemical, { ChemicalAttributes, ChemicalCreationAttributes } from "../../../database/models/formula/chemical";

const Mutation = {
  createChemical: async (obj: any, args: ChemicalCreationAttributes) => {
    return await Chemical.create(args);
  },

  deleteChemical: async (obj: any, args: ChemicalAttributes) => {
    const result = await Chemical.destroy({ where: args });
    return result > 0;
  },

  updateChemical: async (obj: any, { id, name, chemicalName, density }: ChemicalAttributes) => {
    const chemical = await Chemical.findOne({ where: { id } });
    if (chemical) {
      if (name) chemical.set({ name });
      if (chemicalName) chemical.set({ chemicalName });
      if (density) chemical.set({ density });
      return await chemical.save();
    }
    return null;
  },
};

export default Mutation;
