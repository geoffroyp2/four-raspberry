import { getColor, getOven } from "./utils";
import Chemical from "../../database/models/formula/chemical";
import Formula from "../../database/models/formula/formula";
import Piece from "../../database/models/piece/piece";
import Record from "../../database/models/record/record";
import Target from "../../database/models/target/target";

export const bulkCreate = {
  records: async (amount: number) => {
    return await Record.bulkCreate(
      [...Array(amount)].map((e, i) => ({
        name: `Record ${i + 1}`,
        description: `Record Description ${i + 1}`,
        color: getColor(),
      }))
    );
  },

  targets: async (amount: number) => {
    return await Target.bulkCreate(
      [...Array(amount)].map((e, i) => ({
        name: `Target ${i + 1}`,
        description: `Target Description ${i + 1}`,
        color: getColor(),
        oven: getOven(),
      }))
    );
  },

  pieces: async (amount: number) => {
    return await Piece.bulkCreate(
      [...Array(amount)].map((e, i) => ({
        name: `Piece ${i + 1}`,
        description: `Piece Description ${i + 1}`,
      }))
    );
  },

  formulas: async (amount: number) => {
    return await Formula.bulkCreate(
      [...Array(amount)].map((e, i) => ({
        name: `Formula ${i + 1}`,
        description: `Formula Description ${i + 1}`,
      }))
    );
  },

  chemicals: async (amount: number) => {
    return await Chemical.bulkCreate(
      [...Array(amount)].map((e, i) => ({
        name: `Chemical ${i + 1}`,
        chemicalName: `Chemical Name ${i + 1}`,
        density: Math.floor(Math.random() * 150),
        color: getColor(),
      }))
    );
  },
};
