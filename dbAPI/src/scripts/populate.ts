import database from "../database";
import Target from "../database/models/target/model";
import Record from "../database/models/record/model";
import * as _ from "lodash";

export const populateTest = async () => {
  await database.sync({ force: true });

  const r1 = await Record.create({ name: "R1", description: "RD1" });
  const r2 = await Record.create({ name: "R2", description: "RD2" });
  const r3 = await Record.create({ name: "R3", description: "RD3" });

  const t1 = await Target.create({ name: "T1", description: "TD1" });
  const t2 = await Target.create({ name: "T2", description: "TD2" });
  const t3 = await Target.create({ name: "T3", description: "TD3" });

  await r1.addTarget(t1);
  await r1.addTarget(t3);
  await r2.addTarget(t2);
  await r2.addTarget(t2);
  await r2.addTarget(t2);
  await r2.addTarget(t2);

  await t1.addRecord(r2);
  await t2.addRecord(r2);

  // await t2.removeRecord(r2);
  // await t3.removeRecord(r2);
  // await r1.destroy();
};
