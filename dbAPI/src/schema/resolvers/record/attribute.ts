import { PieceAttributes } from "../../../database/models/piece/piece";
import Record from "../../../database/models/record/record";
import Target from "../../../database/models/target/target";
import { stringToColor } from "../../../utils/strings";

const Attribute = {
  target: async (parent: Record) => {
    return await Target.findOne({ where: { id: parent.targetId } });
  },

  pieces: async (parent: Record, { id, name }: PieceAttributes) => {
    const pieces = await parent.getPieces();
    return pieces
      .filter((e) => (id && e.id === id) || (name && e.name === name) || (!id && !name))
      .sort((a, b) => a.id - b.id);
  },

  oven: async (parent: Record) => {
    const target = await Target.findOne({ where: { id: parent.targetId } });
    if (target) {
      return target.oven;
    }
    return null;
  },

  color: (parent: Record) => {
    return stringToColor(parent.color);
  },

  createdAt: (parent: Record) => {
    return new Date(parent.createdAt).toISOString();
  },

  updatedAt: (parent: Record) => {
    return new Date(parent.updatedAt).toISOString();
  },
};

export default Attribute;
