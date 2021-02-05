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

const DataLoaders = {
  targetLoader: new DataLoader(async (keys: readonly number[]) => {
    const results = await Target.findAll({ where: { id: keys } });
    const map: { [key: number]: Target } = {};
    results.forEach((e) => (map[e.id] = e));
    return keys.map((key) => map[key]);
  }),
  recordOvenLoader: new DataLoader(async (keys: readonly number[]) => {
    const results = await Target.findAll({ where: { id: keys } });
    const map: { [key: number]: string } = {};
    results.forEach((e) => (map[e.id] = e.oven));
    return keys.map((key) => map[key] || null);
  }),
  recordLoader: new DataLoader(async (keys: readonly number[]) => {
    const results = await Record.findAll({ where: Sequelize.literal(`"Record"."targetId" IN ( ${keys} )`) });
    const map: { [key: number]: Record[] } = {};
    results.forEach((e) => e.targetId && (map[e.targetId] ? map[e.targetId].push(e) : (map[e.targetId] = [e])));
    return keys.map((key) => map[key]);
  }),
  photoLoader: new DataLoader(async (keys: readonly number[]) => {
    const results = await Photo.findAll({ where: { pieceId: keys } });
    const map: { [key: number]: string[] } = {};
    results.forEach((e) => (map[e.pieceId] ? map[e.pieceId].push(e.url) : (map[e.pieceId] = [e.url])));
    return keys.map((key) => map[key]);
  }),
  formulaLoader: new DataLoader(async (keys: readonly number[]) => {
    const results = await Formula.findAll({ where: { id: keys } });
    const map: { [key: number]: Formula } = {};
    results.forEach((e) => (map[e.id] = e));
    return keys.map((key) => map[key]);
  }),
};

export default DataLoaders;
