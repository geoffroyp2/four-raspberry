import { generateColor } from "./utils";
import Chemical from "../../database/models/formula/chemical";
import Formula from "../../database/models/formula/formula";
import Piece from "../../database/models/piece/piece";
import Record from "../../database/models/record/record";
import Target from "../../database/models/target/target";

export const bulkCreate = {
  records: async (amount: number) => {
    return await Record.bulkCreate(
      [...Array(amount)].map((e, i) => ({
        name: `Record ${i}`,
        description: `Record Description ${i}`,
        color: generateColor(),
      }))
    );
  },

  targets: async (amount: number) => {
    return await Target.bulkCreate(
      [...Array(amount)].map((e, i) => ({
        name: `Target ${i}`,
        description: `Target Description ${i}`,
        color: generateColor(),
      }))
    );
  },

  pieces: async (amount: number) => {
    return await Piece.bulkCreate(
      [...Array(amount)].map((e, i) => ({
        name: `Piece ${i}`,
        description: `Piece Description ${i}`,
      }))
    );
  },

  formulas: async (amount: number) => {
    return await Formula.bulkCreate(
      [...Array(amount)].map((e, i) => ({
        name: `Formula ${i}`,
        description: `Formula Description ${i}`,
      }))
    );
  },

  chemicals: async (amount: number) => {
    return await Chemical.bulkCreate(
      [...Array(amount)].map((e, i) => ({
        name: `Chemical ${i}`,
        chemicalName: `Chemical Name ${i}`,
        density: Math.floor(Math.random() * 150),
      }))
    );
  },
};
