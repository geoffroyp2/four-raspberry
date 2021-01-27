import Record from "../../../database/models/record/model";

const Attribute = {
  targets: async (parent: Record) => {
    return await parent.getTargets();
  },
};

export default Attribute;
