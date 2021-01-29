import Record from "../../../database/models/record/record";
import Target from "../../../database/models/target/target";

const Attribute = {
  target: async (parent: Record) => {
    return await Target.findOne({ where: { id: parent.targetId } });
  },

  pieces: async (parent: Record) => {
    return await parent.getPieces();
  },
};

export default Attribute;
