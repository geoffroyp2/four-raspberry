import Piece from "../../../database/models/piece/model";

const Attribute = {
  records: async (parent: Piece) => {
    return await parent.getRecords();
  },
};

export default Attribute;
