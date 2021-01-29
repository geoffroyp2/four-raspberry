import database from "../../database";
import { bulkCreate } from "./bulkCreate";
import { deterministic } from "./deterministic";
import { link } from "./linkElements";

export const populateTest = async () => {
  await database.sync({ force: true });
  await deterministic(); // generate deterministic data for testing purposes

  const targets = await bulkCreate.targets(10);
  const records = await bulkCreate.records(100);
  const pieces = await bulkCreate.pieces(300);
  const formulas = await bulkCreate.formulas(30);
  const chemicals = await bulkCreate.chemicals(100);

  await link.targetRecord(targets, records);
  await link.recordPiece(records, pieces, { min: 7, max: 10 });
  await link.piecePhoto(pieces, { min: 1, max: 8 });
  await link.pieceFormula(pieces, formulas);
  await link.formulaChemical(formulas, chemicals, { min: 4, max: 18 });
};
