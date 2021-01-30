import Record, { RecordCreationAttributes } from "../../../database/models/record/record";
import Piece from "../../../database/models/piece/piece";
import Target from "../../../database/models/target/target";

import { GQLRecord, GQLRecordId, GQLRecordPiece, GQLRecordTarget, GQLRecordUpdate } from "../types";
import { colorToString } from "../../../utils/strings";

const Mutation = {
  /**
   * Creates a new Record in database
   * @param args optional arguments to be passed, all have default values
   * @return the new Record
   */
  createRecord: async (obj: any, { name, description, color }: GQLRecord): Promise<Record> => {
    const args: RecordCreationAttributes = {
      name,
      description,
      color: colorToString(color),
    };
    return await Record.create(args);
  },

  /**
   * Deletes Target in database
   * @param recordId the id of the Record to select
   */
  deleteRecord: async (obj: any, { recordId }: GQLRecordId): Promise<boolean> => {
    const result = await Record.destroy({ where: { id: recordId } });
    return result > 0;
  },

  /**
   * Selects a Record by id and updates specified fields
   * @param recordId the id of the Record to select
   * @param args the fields to update
   * @return the updated Record or null if not in database
   */
  updateRecord: async (obj: any, { recordId, name, description, color }: GQLRecordUpdate): Promise<Record | null> => {
    const record = await Record.findOne({ where: { id: recordId } });
    if (record) {
      if (name) record.set({ name });
      if (description) record.set({ description });
      if (color) record.set({ color: colorToString(color) });
      return await record.save();
    }
    return null;
  },

  /**
   * Links a Target to a Record
   * @param recordId the id of the Record to select
   * @param targetId the id of the Target to select, if undefined, remove existing link
   * @return the Record or null if the Record or the Target does not exist
   */
  setRecordTarget: async (obj: any, { recordId, targetId }: GQLRecordTarget): Promise<Record | null> => {
    const record = await Record.findOne({ where: { id: recordId } });
    if (record) {
      if (targetId) {
        // if targetId specified, find new target and update
        const target = await Target.findOne({ where: { id: targetId } });
        if (target) {
          await target.addRecord(record);
          return await Record.findOne({ where: { id: recordId } });
        }
      } else {
        // if no targetId, remove previous link if it exists
        if (record.targetId) {
          const target = await Target.findOne({ where: { id: record.targetId } });
          if (target) {
            await target.removeRecord(record);
            return await Record.findOne({ where: { id: recordId } });
          }
        }
      }
    }
    return null;
  },

  /**
   * Adds a Piece to a Record
   * @param recordId the id of the Record to select
   * @param pieceId the id of the Piece to select
   * @return the Record or null if either the Record or the Piece does not exist
   */
  addPieceToRecord: async (obj: any, { pieceId, recordId }: GQLRecordPiece): Promise<Record | null> => {
    const piece = await Piece.findOne({ where: { id: pieceId } });
    const record = await Record.findOne({ where: { id: recordId } });
    if (record && piece) {
      await record.addPiece(piece);
      return await Record.findOne({ where: { id: recordId } });
    }
    return null;
  },

  /**
   * Removes a Piece to a Record
   * @param recordId the id of the Record to select
   * @param pieceId the id of the Piece to select
   * @return the Record or null if either the Record or the Piece does not exist
   */
  removePieceFromRecord: async (obj: any, { pieceId, recordId }: GQLRecordPiece): Promise<Record | null> => {
    const piece = await Piece.findOne({ where: { id: pieceId } });
    const record = await Record.findOne({ where: { id: recordId } });
    if (record && piece) {
      await record.removePiece(piece);
      return await Record.findOne({ where: { id: recordId } });
    }
    return null;
  },
};

export default Mutation;
