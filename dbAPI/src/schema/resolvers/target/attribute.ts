import Target from "../../../database/models/target/model";

const Attribute = {
  records: async (parent: Target) => {
    return await parent.getRecords();
  },
};

export default Attribute;
