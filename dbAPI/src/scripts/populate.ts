import database from "../database";
import Target from "../database/models/target/model";
import Record from "../database/models/record/model";
import * as _ from "lodash";
import Piece from "../database/models/piece/model";

export const populateTest = async () => {
  await database.sync({ force: true });

  const r1 = await Record.create({ name: "Record 1", description: "Record Description 1", color: generateColor() });
  const r2 = await Record.create({ name: "Record 2", description: "Record Description 2", color: generateColor() });
  const r3 = await Record.create({ name: "Record 3", description: "Record Description 3", color: generateColor() });
  const r4 = await Record.create({ name: "Record 4", description: "Record Description 4", color: generateColor() });
  const r5 = await Record.create({ name: "Record 5", description: "Record Description 5", color: generateColor() });

  const t1 = await Target.create({ name: "Target 1", description: "Target Description 1", color: generateColor() });
  const t2 = await Target.create({ name: "Target 2", description: "Target Description 2", color: generateColor() });
  const t3 = await Target.create({ name: "Target 3", description: "Target Description 3", color: generateColor() });

  const p1 = await Piece.create({ name: "Piece 1", description: "Piece Description 1" });
  const p2 = await Piece.create({ name: "Piece 2", description: "Piece Description 2" });
  const p3 = await Piece.create({ name: "Piece 3", description: "Piece Description 3" });

  await t1.addRecord(r1);
  await t1.addRecord(r2);
  await t1.addRecord(r3);
  await t2.addRecord(r1); // overwrites r1.targetId
  await t3.addRecord(r3);
  await t1.addRecord(r4);
  await t1.addRecord(r5);

  await r1.addPiece(p1);
  await r2.addPiece(p2);
  await r3.addPiece(p3);
  await r1.addPiece(p2);
  await r1.addPiece(p3);
  await r4.addPiece(p1);
  await r4.addPiece(p2);
  await r5.addPiece(p1);
  await r5.addPiece(p2);
  await r5.addPiece(p3);
};

const generateColor = () => {
  return getNum255() + "-" + getNum255() + "-" + getNum255() + "-" + getNumFloat();
};

const getNum255 = () => {
  return ("" + Math.floor(Math.random() * 256)).padStart(3, "0");
};
const getNumFloat = () => {
  return Math.random().toFixed(1);
};
