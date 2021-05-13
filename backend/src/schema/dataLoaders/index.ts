import DataLoader from "dataloader";
import { Sequelize } from "sequelize";
import ChemicalVersion from "../../database/models/formula/chemicalVersion";
import Formula from "../../database/models/formula/formula";
import Photo from "../../database/models/piece/photo";
import Piece from "../../database/models/piece/piece";
import Record from "../../database/models/record/record";
import Target from "../../database/models/target/target";
import { imageServerConfig } from "../../imageServerConfig";

/**
 * DataLoaders called by resolvers to batch n + 1 queries
 */

export type DataLoadersType = typeof DataLoaders;

const DataLoaders = {
  targetLoader: new DataLoader(async (targetIds: readonly number[]) => {
    const targets = await Target.findAll({ where: { id: targetIds }, order: [["id", "ASC"]] });
    const map: { [key: number]: Target } = {};
    targets.forEach((e) => (map[e.id] = e));
    return targetIds.map((key) => map[key]);
  }),

  targetRecordListLoader: new DataLoader(async (targetIds: readonly number[]) => {
    const records = await Record.findAll({
      where: Sequelize.literal(`"Record"."targetId" IN ( ${targetIds} ) ORDER BY id ASC`),
    });
    const map: { [key: number]: Record[] } = {};
    records.forEach((e) => e.targetId && (map[e.targetId] ? map[e.targetId].push(e) : (map[e.targetId] = [e])));
    return targetIds.map((key) => map[key] || []);
  }),

  recordPieceListLoader: new DataLoader(async (recordIds: readonly number[]) => {
    const map: { [key: number]: Piece[] } = {};
    await Promise.all(
      recordIds.map(async (id) => {
        const record = await Record.findOne({ where: { id } });
        const pieces = await record?.getPieces();
        if (pieces) {
          map[id] = pieces;
        }
      })
    );
    return recordIds.map((key) => map[key] || []);
  }),

  pieceRecordListLoader: new DataLoader(async (pieceIds: readonly number[]) => {
    const map: { [key: number]: Record[] } = {};
    await Promise.all(
      pieceIds.map(async (id) => {
        const piece = await Piece.findOne({ where: { id }, order: [["id", "ASC"]] });
        const records = await piece?.getRecords();
        if (records) {
          map[id] = records;
        }
      })
    );
    return pieceIds.map((key) => map[key] || []);
  }),

  photoLoader: new DataLoader(async (pieceIds: readonly number[]) => {
    const results = await Photo.findAll({ where: { pieceId: pieceIds }, order: [["id", "ASC"]] });
    const map: { [key: number]: string[] } = {};
    results.forEach((e) =>
      map[e.pieceId]
        ? map[e.pieceId].push(imageServerConfig.baseUrl + e.url)
        : (map[e.pieceId] = [imageServerConfig.baseUrl + e.url])
    );
    return pieceIds.map((key) => map[key] || []);
  }),

  formulaLoader: new DataLoader(async (formulaIds: readonly number[]) => {
    const results = await Formula.findAll({ where: { id: formulaIds }, order: [["id", "ASC"]] });
    const map: { [key: number]: Formula } = {};
    results.forEach((e) => (map[e.id] = e));
    return formulaIds.map((key) => map[key]);
  }),

  versionLoader: new DataLoader(async (chemicalIds: readonly number[]) => {
    const results = await ChemicalVersion.findAll({ where: { chemicalId: chemicalIds } });
    const map: { [key: number]: string[] } = {};
    results.forEach((e) => (map[e.chemicalId] ? map[e.chemicalId].push(e.name) : (map[e.chemicalId] = [e.name])));
    return chemicalIds.map((key) => map[key]);
  }),
};

export default DataLoaders;
