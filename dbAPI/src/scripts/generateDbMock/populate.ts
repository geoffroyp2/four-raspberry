import * as _ from "lodash";
import database from "../../database";
import { bulkCreate } from "./bulkCreate";
import { link } from "./linkElements";

export const populateTest = async () => {
  await database.sync({ force: true });

  const targets = await bulkCreate.targets(10);
  const records = await bulkCreate.records(100);
  const pieces = await bulkCreate.pieces(300);
  const formulas = await bulkCreate.formulas(30);
  const chemicals = await bulkCreate.chemicals(100);

  link.targetRecord(targets, records);
  link.recordPiece(records, pieces, { min: 7, max: 10 });
  link.piecePhoto(pieces, { min: 1, max: 8 });
  link.pieceFormula(pieces, formulas);
  link.formulaChemical(formulas, chemicals, { min: 4, max: 18 });
};
