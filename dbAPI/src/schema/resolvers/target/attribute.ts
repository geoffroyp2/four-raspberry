import Target from "../../../database/models/target/target";
import { RecordAttributes } from "../../../database/models/record/record";
import Piece, { PieceAttributes } from "../../../database/models/piece/piece";
import { stringToColor } from "../../../utils/strings";

const Attribute = {
  records: async (parent: Target, { id, name }: RecordAttributes) => {
    const records = await parent.getRecords();
    return records
      .filter((e) => (id && e.id === id) || (name && e.name === name) || (!id && !name))
      .sort((a, b) => a.id - b.id);
  },

  pieces: async (parent: Target, { id, name }: PieceAttributes) => {
    const allPieces = new Set<Piece>();
    const records = await parent.getRecords();
    await Promise.all(
      records.map(async (r) => {
        const pieces = await r.getPieces();
        pieces.forEach((p) => allPieces.add(p));
      })
    );

    return [...allPieces.values()]
      .filter((e) => (id && e.id === id) || (name && e.name === name) || (!id && !name))
      .sort((a, b) => a.id - b.id);
  },

  color: (parent: Target) => {
    return stringToColor(parent.color);
  },

  createdAt: (parent: Target) => {
    return new Date(parent.createdAt).toISOString();
  },

  updatedAt: (parent: Target) => {
    return new Date(parent.updatedAt).toISOString();
  },
};

export default Attribute;
