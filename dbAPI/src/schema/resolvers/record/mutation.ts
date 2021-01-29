import Piece from "../../../database/models/piece/piece";
import Record, { RecordAttributes, RecordCreationAttributes } from "../../../database/models/record/record";
import Target from "../../../database/models/target/target";
import { colorToString } from "../../../utils/strings";
import { ColorType } from "../sharedTypes";

type RTIDType = {
  recordId: { id: number };
  targetId?: { id: number };
};

type PRIDType = {
  pieceId: { id: number };
  recordId: { id: number };
};

interface CGQRecordCreationAttributes {
  name: string;
  description: string;
  color: ColorType;
}

interface CGQRecordAttributes extends CGQRecordCreationAttributes {
  id: number;
}

const Mutation = {
  createRecord: async (obj: any, { name, description, color }: CGQRecordCreationAttributes) => {
    const args: RecordCreationAttributes = {
      name: name,
      description: description,
      color: colorToString(color),
    };
    return await Record.create(args);
  },

  deleteRecord: async (obj: any, args: RecordAttributes) => {
    const result = await Record.destroy({ where: args });
    return result > 0;
  },

  updateRecord: async (obj: any, { id, name, description, color }: CGQRecordAttributes) => {
    // TODO : sanitize input
    const record = await Record.findOne({ where: { id } });
    if (record) {
      if (name) record.set({ name });
      if (description) record.set({ description });
      if (color) record.set({ color: colorToString(color) });
      return await record.save();
    }
    return null;
  },

  setRecordTarget: async (obj: any, { recordId, targetId }: RTIDType) => {
    const record = await Record.findOne({ where: recordId });
    if (record) {
      if (targetId) {
        // if targetId specified, find new target and update
        const target = await Target.findOne({ where: targetId });
        if (target) {
          await target.addRecord(record);
          return await Record.findOne({ where: recordId });
        }
      } else {
        // if no targetId, remove previous link if it exists
        if (record.targetId) {
          const target = await Target.findOne({ where: { id: record.targetId } });
          if (target) {
            await target.removeRecord(record);
            return await Record.findOne({ where: recordId });
          }
        }
      }
    }
    return null;
  },

  addPieceToRecord: async (obj: any, { pieceId, recordId }: PRIDType) => {
    const piece = await Piece.findOne({ where: pieceId });
    const record = await Record.findOne({ where: recordId });
    if (record && piece) {
      await record.addPiece(piece);
      return await Piece.findOne({ where: pieceId });
    }
    return null;
  },

  removePieceFromRecord: async (obj: any, { pieceId, recordId }: PRIDType) => {
    const piece = await Piece.findOne({ where: pieceId });
    const record = await Record.findOne({ where: recordId });
    if (record && piece) {
      await record.removePiece(piece);
      return await Piece.findOne({ where: pieceId });
    }
    return null;
  },
};

export default Mutation;
