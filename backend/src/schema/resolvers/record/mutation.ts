import Record, { RecordCreationAttributes } from "../../../database/models/record/record";
import Piece from "../../../database/models/piece/piece";
import Target from "../../../database/models/target/target";

import {
  GQLRecord,
  GQLRecordId,
  GQLRecordPiece,
  GQLRecordPointCreate,
  GQLRecordPointDelete,
  GQLRecordPointUpdate,
  GQLRecordTarget,
  GQLRecordUpdate,
  ResolverObjectType,
} from "../types";
import { colorToString } from "../../../utils/strings";
import RecordPoint from "../../../database/models/record/recordPoints";
import { DataLoadersType } from "../../dataLoaders";

/**
 * clears the cache from the loaders that are linked to the id
 */
const clearRecordLoaders = async (loaders: DataLoadersType, recordId: number, targetId?: number) => {
  loaders.recordPieceListLoader.clear(recordId);

  const record = await Record.findOne({ where: { id: recordId } });
  if (record) {
    if (record.targetId) {
      loaders.targetLoader.clear(record.targetId);
      loaders.targetRecordListLoader.clear(record.targetId);
    }
    const pieces = await record.getPieces();
    pieces.forEach((p) => {
      loaders.pieceRecordListLoader.clear(p.id);
    });
  }

  if (targetId) {
    loaders.targetLoader.clear(targetId);
    loaders.targetRecordListLoader.clear(targetId);
  }
};

const Mutation: ResolverObjectType = {
  /**
   * Creates a new Record in database
   * @param args optional arguments to be passed, all have default values
   * @return the new Record
   */
  createRecord: async (_, { name, description, color }: Partial<GQLRecord>): Promise<Record> => {
    const args: RecordCreationAttributes = {
      name: name ?? "Sans Nom",
      description: description ?? "",
      color: colorToString(color),
      finished: false,
    };
    return Record.create(args);
  },

  /**
   * Deletes Target in database
   * @param recordId the id of the Record to select
   */
  deleteRecord: async (_, { recordId }: GQLRecordId, loaders): Promise<boolean> => {
    clearRecordLoaders(loaders, recordId);

    const result = await Record.destroy({ where: { id: recordId } });
    return result > 0;
  },

  /**
   * Selects a Record by id and updates specified fields
   * @param recordId the id of the Record to select
   * @param args the fields to update
   * @return the updated Record or null if not in database
   */
  updateRecord: async (
    _,
    { recordId, name, description, color, finished }: GQLRecordUpdate,
    loaders
  ): Promise<Record | null> => {
    const record = await Record.findOne({ where: { id: recordId } });
    if (record) {
      clearRecordLoaders(loaders, recordId);

      if (name !== undefined) record.set({ name });
      if (description !== undefined) record.set({ description });
      if (color !== undefined) record.set({ color: colorToString(color) });
      if (finished !== undefined) record.set({ finished });
      return record.save();
    }
    return null;
  },

  /**
   * Links a Target to a Record
   * @param recordId the id of the Record to select
   * @param targetId the id of the Target to select, if undefined, remove existing link
   * @return the Record or null if the Record or the Target does not exist
   */
  setRecordTarget: async (_, { recordId, targetId }: GQLRecordTarget, loaders): Promise<Record | null> => {
    const record = await Record.findOne({ where: { id: recordId } });
    if (record) {
      clearRecordLoaders(loaders, recordId, targetId);

      if (targetId) {
        // if targetId specified, find new target and update
        const target = await Target.findOne({ where: { id: targetId } });
        if (target) {
          await target.addRecord(record);
          return Record.findOne({ where: { id: recordId } });
        }
      } else {
        // if no targetId, remove previous link if it exists
        if (record.targetId) {
          const target = await Target.findOne({ where: { id: record.targetId } });
          if (target) {
            await target.removeRecord(record);
            return Record.findOne({ where: { id: recordId } });
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
  addPieceToRecord: async (_, { pieceId, recordId }: GQLRecordPiece, loaders): Promise<Record | null> => {
    const piece = await Piece.findOne({ where: { id: pieceId } });
    const record = await Record.findOne({ where: { id: recordId } });
    if (record && piece) {
      clearRecordLoaders(loaders, recordId);
      await record.addPiece(piece);
      return Record.findOne({ where: { id: recordId } });
    }
    return null;
  },

  /**
   * Removes a Piece from a Record
   * @param recordId the id of the Record to select
   * @param pieceId the id of the Piece to select
   * @return the Record or null if either the Record or the Piece does not exist
   */
  removePieceFromRecord: async (_, { pieceId, recordId }: GQLRecordPiece, loaders): Promise<Record | null> => {
    const piece = await Piece.findOne({ where: { id: pieceId } });
    const record = await Record.findOne({ where: { id: recordId } });
    if (record && piece) {
      clearRecordLoaders(loaders, recordId);
      await record.removePiece(piece);
      return Record.findOne({ where: { id: recordId } });
    }
    return null;
  },

  /**
   * Creates a Point on the selected Record
   * @param recordId the id of the Record
   * @param args the fields of the point
   */
  createRecordPoint: async (
    _,
    { recordId, time, temperature, oxygen }: GQLRecordPointCreate
  ): Promise<RecordPoint | null> => {
    const target = await Record.findOne({ where: { id: recordId } });
    if (target) {
      return target.createPoint({ time, temperature, oxygen });
    }
    return null;
  },

  /**
   * Select a target and one of its Points and deletes the Point
   * @return false si Record n'existe pas ou le point n'est pas associé à la Record
   * @param recordId the id of the Record
   * @param pointId the id of the Point
   */
  deleteRecordPoint: async (_, { recordId, pointId }: GQLRecordPointDelete): Promise<boolean> => {
    const target = await Record.findOne({ where: { id: recordId } });
    const point = await RecordPoint.findOne({ where: { recordId: recordId, id: pointId } });
    if (target && point) {
      await point.destroy();
      return true;
    }
    return false;
  },

  /**
   *
   * @param recordId the id of the Record
   * @param pointId the id of the Point
   * @param args the fields of the point
   * @return the Point after update or null if it does not exist
   */
  updateRecordPoint: async (
    _,
    { recordId, pointId, time, temperature, oxygen }: GQLRecordPointUpdate
  ): Promise<RecordPoint | null> => {
    const target = await Record.findOne({ where: { id: recordId } });
    const point = await RecordPoint.findOne({ where: { recordId: recordId, id: pointId } });
    if (target && point) {
      if (time) point.set({ time });
      if (temperature) point.set({ temperature });
      if (oxygen) point.set({ oxygen });
      return point.save();
    }
    return null;
  },
};

export default Mutation;
