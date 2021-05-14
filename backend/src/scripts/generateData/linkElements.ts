import Chemical from "../../database/models/formula/chemical";
import Formula from "../../database/models/formula/formula";
import Piece from "../../database/models/piece/piece";
import Record from "../../database/models/record/record";
import Target from "../../database/models/target/target";
import { getUrl, getVersionName, interpolate, Timer } from "./utils";

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
          const x = Math.round((i / amount) * 43200);
          await t.createPoint({
            time: x,
            temperature: targetGraph[0] + targetGraph[1] * x + targetGraph[2] * x ** 2 + targetGraph[3] * x ** 3,
            oxygen: x > oMin && x < oMax ? 1 : 0,
          });
        }
      })
    );
  },

  recordPoints: async (records: Record[], pointsPerMinute: number) => {
    const timer = new Timer();
    let recordNumber = 0;
    for (const r of records) {
      const record = await Record.findOne({ where: { id: r.id } });
      const target = await Target.findOne({ where: { id: record?.targetId } });
      if (target) {
        const targetPoints = await target.getPoints({ order: [["time", "ASC"]] });
        const maxTime = targetPoints[targetPoints.length - 1].time;
        const amount = (maxTime / 60) * pointsPerMinute;
        const interval = maxTime / amount;
        const offset = Math.random() * 2 - 1;

        const batchAmount = Math.floor(amount / 10);

        for (let batchNumber = 0; batchNumber < amount; batchNumber += batchAmount) {
          await Promise.all(
            [...Array(batchAmount)].map(async (_, count) => {
              if (batchNumber + count < amount) {
                const time = Math.floor(interval * (batchNumber + count));
                const { temperature, oxygen } = interpolate(time, targetPoints, offset);
                await r.createPoint({ time, temperature, oxygen });
              }
            })
          );
          process.stdout.clearLine(0);
          process.stdout.cursorTo(0);
          process.stdout.write(
            `    Record ${recordNumber + 1}/${records.length} points ${Math.floor((batchNumber / amount) * 100)}%`
          );
        }
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        console.log(`    Record ${recordNumber++ + 1}/${records.length} points 100% (${timer.new()})`);
      }
    }
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

  piecePhoto: async (pieces: Piece[], photosPerPiece: MinMax, testImages: string[]) => {
    return Promise.all(
      pieces.map(async (p) => {
        const amount = Math.floor(Math.random() * (photosPerPiece.max - photosPerPiece.min) + photosPerPiece.min);
        for (let i = 0; i < amount; i++) {
          const idx = Math.floor(Math.random() * testImages.length);
          await p.createPhoto({ url: testImages[idx] });
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
        const amount = Math.floor(Math.random() * (chemicalsPerFormula.max - chemicalsPerFormula.min) + chemicalsPerFormula.min);
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

  chemicalVersion: async (chemicals: Chemical[], versionsPerChemical: MinMax) => {
    return Promise.all(
      chemicals.map(async (c) => {
        const amount = Math.floor(Math.random() * (versionsPerChemical.max - versionsPerChemical.min) + versionsPerChemical.min);
        for (let i = 0; i < amount; i++) {
          await c.createVersion({ name: getVersionName() });
        }
        const versions = await c.getVersions();
        if (versions.length > 0) c.set({ currentVersion: versions[Math.floor(Math.random() * versions.length)].name });
        await c.save();
      })
    );
  },

  formulaTarget: async (formulas: Formula[], targets: Target[]) => {
    return Promise.all(
      formulas.map(async (f) => {
        const idx = Math.floor(Math.random() * targets.length);
        await targets[idx].addFormula(f);
      })
    );
  },
};
