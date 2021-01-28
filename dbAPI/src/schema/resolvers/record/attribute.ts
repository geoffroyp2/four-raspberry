import Record from "../../../database/models/record/model";
import Target from "../../../database/models/target/model";

const Attribute = {
  target: async (parent: Record) => {
    return await Target.findOne({ where: { id: parent.targetId } });
  },
  pieces: async (parent: Record) => {
    return await parent.getPieces();
  },
};

export default Attribute;
