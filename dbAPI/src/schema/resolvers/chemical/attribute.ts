import Chemical from "../../../database/models/formula/chemical";

const Attribute = {
  formulas: async (parent: Chemical) => {
    return await parent.getFormulas();
  },
};

export default Attribute;
