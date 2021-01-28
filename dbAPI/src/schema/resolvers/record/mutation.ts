import Piece from "../../../database/models/piece/model";
import Record from "../../../database/models/record/model";
import { RecordAttributes } from "../../../database/models/record/types";
import Target from "../../../database/models/target/model";

type RTIDType = {
  recordId: { id: number };
  targetId: { id: number };
};

type PRIDType = {
  pieceId: { id: number };
  recordId: { id: number };
};

const Mutation = {
  createRecord: async (obj: any, args: RecordAttributes) => {
    return await Record.create();
  },

  deleteRecord: async (obj: any, args: RecordAttributes) => {
    const result = await Record.destroy({ where: args });
    return result > 0;
  },

  updateRecord: async (obj: any, { id, name, description, color }: RecordAttributes) => {
    // TODO : sanitize input
    const record = await Record.findOne({ where: { id } });
    if (record) {
      if (name) record.set({ name });
      if (description) record.set({ description });
      if (color) record.set({ color });
      return await record.save();
    }
    return null;
  },

  setRecordTarget: async (obj: any, { recordId, targetId }: RTIDType) => {
    const target = await Target.findOne({ where: targetId });
    const record = await Record.findOne({ where: recordId });
    if (record && target) {
      await target.addRecord(record);
      return true;
    }
    return false;
  },

  addPieceToRecord: async (obj: any, { pieceId, recordId }: PRIDType) => {
    const piece = await Piece.findOne({ where: pieceId });
    const record = await Record.findOne({ where: recordId });
    if (record && piece) {
      await record.addPiece(piece);
      return true;
    }
    return false;
  },

  removePieceFromRecord: async (obj: any, { pieceId, recordId }: PRIDType) => {
    const piece = await Piece.findOne({ where: pieceId });
    const record = await Record.findOne({ where: recordId });
    if (record && piece) {
      await record.removePiece(piece);
      return true;
    }
    return false;
  },
};

export default Mutation;
