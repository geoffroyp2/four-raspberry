import Target from "../../../database/models/target/target";

const Attribute = {
  records: async (parent: Target) => {
    return await parent.getRecords();
  },
};

export default Attribute;
