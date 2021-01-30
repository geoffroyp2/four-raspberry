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

// a,b,c,d for y = d.x**3 + c.x**2 + b.x + a
const mockTargetGraphs = [
  [30.6713, 0.00916483, 1.99017 * 10 ** -6, -3.99275 * 10 ** -11],
  [24.9576, 0.0169482, 4.48822 * 10 ** -7, -5.71366 * 10 ** -12],
  [13.5973, 0.0201861, 1.04734 * 10 ** -6, -1.96704 * 10 ** -11],
];

export const link = {
  targetRecord: async (targets: Target[], records: Record[]) => {
    return Promise.all(
      records.map(async (r) => {
        const idx = Math.floor(Math.random() * targets.length);
        await targets[idx].addRecord(r);
      })
    );
  },

  targetPoints: async (targets: Target[], pointsPerTarget: MinMax) => {
    return Promise.all(
      targets.map(async (t) => {
        const amount = Math.floor(Math.random() * (pointsPerTarget.max - pointsPerTarget.min) + pointsPerTarget.min);
        const targetGraph = mockTargetGraphs[Math.floor(Math.random() * mockTargetGraphs.length)];
        // range of 12 hours
        const oMin = Math.random() * (43200 / 2) + Math.random() * (43200 / 4);
        const oMax = oMin + Math.random() * (43200 / 4);
        for (let i = 0; i < amount; i++) {
          const x = Math.floor((i / amount) * 43200);
          t.createPoint({
            time: x,
            temperature: targetGraph[0] + targetGraph[1] * x + targetGraph[2] * x ** 2 + targetGraph[3] * x ** 3,
            oxygen: x > oMin && x < oMax ? 1 : 0,
          });
        }
      })
    );
  },

  recordPiece: async (records: Record[], pieces: Piece[], piecesPerRecord: MinMax) => {
    return Promise.all(
      records.map(async (r) => {
        const amount = Math.floor(Math.random() * (piecesPerRecord.max - piecesPerRecord.min) + piecesPerRecord.min);
        for (let i = 0; i < amount; i++) {
          const idx = Math.floor(Math.random() * pieces.length);
          await r.addPiece(pieces[idx]);
        }
      })
    );
  },

  piecePhoto: async (pieces: Piece[], photosPerPiece: MinMax) => {
    return Promise.all(
      pieces.map(async (p) => {
        const amount = Math.floor(Math.random() * (photosPerPiece.max - photosPerPiece.min) + photosPerPiece.min);
        for (let i = 0; i < amount; i++) {
          await p.createPhoto({ url: getUrl() });
        }
      })
    );
  },

  pieceFormula: async (pieces: Piece[], formulas: Formula[]) => {
    return Promise.all(
      pieces.map(async (p) => {
        const idx = Math.floor(Math.random() * formulas.length);
        await formulas[idx].addPiece(p);
      })
    );
  },

  formulaChemical: async (formulas: Formula[], chemicals: Chemical[], chemicalsPerFormula: MinMax) => {
    return Promise.all(
      formulas.map(async (f) => {
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
      })
    );
  },
};
