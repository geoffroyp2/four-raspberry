import DataLoader from "dataloader";
import { Sequelize } from "sequelize";
import Formula from "../../database/models/formula/formula";
import Photo from "../../database/models/piece/photo";
import Piece from "../../database/models/piece/piece";
import Record from "../../database/models/record/record";
import Target from "../../database/models/target/target";

/**
 * DataLoaders called by resolvers to batch n + 1 queries
 */

export type DataLoadersType = typeof DataLoaders;

const DataLoaders = {
  targetLoader: new DataLoader(async (targetIds: readonly number[]) => {
    const targets = await Target.findAll({ where: { id: targetIds } });
    const map: { [key: number]: Target } = {};
    targets.forEach((e) => (map[e.id] = e));
    return targetIds.map((key) => map[key]);
  }),

  targetRecordListLoader: new DataLoader(async (targetIds: readonly number[]) => {
    const results = await Record.findAll({
      where: Sequelize.literal(`"Record"."targetId" IN ( ${targetIds} ) ORDER BY id ASC`),
    });
    const map: { [key: number]: Record[] } = {};
    results.forEach((e) => e.targetId && (map[e.targetId] ? map[e.targetId].push(e) : (map[e.targetId] = [e])));
    return targetIds.map((key) => map[key]);
  }),

  recordLoader: new DataLoader(async (recordIds: readonly number[]) => {
    const records = await Record.findAll({ where: { id: recordIds } });
    const map: { [key: number]: Record } = {};
    records.forEach((e) => (map[e.id] = e));
    return recordIds.map((key) => map[key]);
  }),

  // ovenFromTargetId: new DataLoader(async (targetIds: readonly number[]) => {
  //   const results = await Target.findAll({ where: { id: targetIds } });
  //   const map: { [key: number]: string } = {};
  //   results.forEach((e) => (map[e.id] = e.oven));
  //   return targetIds.map((key) => map[key] || null);
  // }),

  photoLoader: new DataLoader(async (pieceIds: readonly number[]) => {
    const results = await Photo.findAll({ where: { pieceId: pieceIds } });
    const map: { [key: number]: string[] } = {};
    results.forEach((e) => (map[e.pieceId] ? map[e.pieceId].push(e.url) : (map[e.pieceId] = [e.url])));
    return pieceIds.map((key) => map[key]);
  }),

  formulaLoader: new DataLoader(async (formulaIds: readonly number[]) => {
    const results = await Formula.findAll({ where: { id: formulaIds } });
    const map: { [key: number]: Formula } = {};
    results.forEach((e) => (map[e.id] = e));
    return formulaIds.map((key) => map[key]);
  }),
};

export default DataLoaders;
