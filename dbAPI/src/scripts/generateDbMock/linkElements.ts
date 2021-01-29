import Chemical from "../../database/models/formula/chemical";
import Formula from "../../database/models/formula/formula";
import Piece from "../../database/models/piece/piece";
import Record from "../../database/models/record/record";
import Target from "../../database/models/target/target";
import { getUrl } from "./utils";

type MinMax = {
  min: number;
  max: number;
};

export const link = {
  targetRecord: async (targets: Target[], records: Record[]) => {
    records.forEach(async (r) => {
      const idx = Math.floor(Math.random() * targets.length);
      await targets[idx].addRecord(r);
    });
  },

  recordPiece: async (records: Record[], pieces: Piece[], piecesPerRecord: MinMax) => {
    records.forEach(async (r) => {
      const amount = Math.floor(Math.random() * (piecesPerRecord.max - piecesPerRecord.min) + piecesPerRecord.min);
      for (let i = 0; i < amount; i++) {
        const idx = Math.floor(Math.random() * pieces.length);
        await r.addPiece(pieces[idx]);
      }
    });
  },

  piecePhoto: async (pieces: Piece[], photosPerPiece: MinMax) => {
    pieces.forEach(async (p) => {
      const amount = Math.floor(Math.random() * (photosPerPiece.max - photosPerPiece.min) + photosPerPiece.min);
      for (let i = 0; i < amount; i++) {
        await p.createPhoto({ url: getUrl() });
      }
    });
  },

  pieceFormula: async (pieces: Piece[], formulas: Formula[]) => {
    pieces.forEach(async (p) => {
      const idx = Math.floor(Math.random() * formulas.length);
      await formulas[idx].addPiece(p);
    });
  },

  formulaChemical: async (formulas: Formula[], chemicals: Chemical[], chemicalsPerFormula: MinMax) => {
    formulas.forEach(async (f) => {
      const amount = Math.floor(
        Math.random() * (chemicalsPerFormula.max - chemicalsPerFormula.min) + chemicalsPerFormula.min
      );
      const chemicalAmounts = [...Array(amount)].map((e) => Math.floor(Math.random() * 100));
      const totalAmounts = chemicalAmounts.reduce((acc, curr) => acc + curr, 0);
      const chosenIdx: number[] = [];

      for (let i = 0; i < amount; i++) {
        let idx = -1;
        do {
          idx = Math.floor(Math.random() * chemicals.length);
        } while (chosenIdx.includes(idx));

        chosenIdx.push(idx);
        await f.addChemical(chemicals[idx], { through: { amount: chemicalAmounts[i] / totalAmounts } });
      }
    });
  },
};
