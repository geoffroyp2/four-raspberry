import { Sequelize } from "sequelize/types";
import { bulkCreate } from "./bulkCreate";
import { deterministic } from "./deterministic";
import { link } from "./linkElements";
import { Timer } from "./utils";

export const populateTest = async (database: Sequelize, testImages: string[]) => {
  await database.sync({ force: true });

  // await deterministic(); // generate deterministic data for testing purposes

  const targetAmount = 10;
  const recordAmount = 100;
  const pieceAmount = 300;
  const formulaAmount = 30;
  const chemicalAmount = 100;
  const timer = new Timer();

  const targets = await bulkCreate.targets(targetAmount);
  console.log(`${targetAmount} Targets created (${timer.new()})`);
  const records = await bulkCreate.records(recordAmount);
  console.log(`${recordAmount} Records created  (${timer.new()})`);
  const pieces = await bulkCreate.pieces(pieceAmount);
  console.log(`${pieceAmount} Pieces created (${timer.new()})`);
  const formulas = await bulkCreate.formulas(formulaAmount);
  console.log(`${formulaAmount} Formulas created (${timer.new()})`);
  const chemicals = await bulkCreate.chemicals(chemicalAmount);
  console.log(`${chemicalAmount} Chemicals created (${timer.new()})`);

  await link.targetRecord(targets, records);
  console.log(`Target-Record linked (${timer.new()})`);
  await link.recordPiece(records, pieces, { min: 7, max: 10 });
  console.log(`Record-Piece linked (${timer.new()})`);
  await link.piecePhoto(pieces, { min: 1, max: 3 }, testImages);
  console.log(`Photos created (${timer.new()})`);
  await link.pieceFormula(pieces, formulas);
  console.log(`Piece-Formula linked (${timer.new()})`);
  await link.formulaChemical(formulas, chemicals, { min: 4, max: 18 });
  console.log(`Formula-Chemical linked (${timer.new()})`);
  await link.targetPoints(targets, { min: 12, max: 30 });
  console.log(`Target points created (${timer.new()})`);
  await link.recordPoints(records, 3);
  console.log(`Record points created (${timer.new()})`);
  await link.formulaTarget(formulas, targets);
  console.log(`Formula-Target linked (${timer.new()})`);
  await link.chemicalVersion(chemicals, { min: 0, max: 6 });
  console.log(`Chemical versions created (${timer.new()})`);
};
