import { bulkCreate } from "./bulkCreate";
import { link } from "./linkElements";

export const deterministic = async () => {
  const targets = await bulkCreate.targets(2);
  const records = await bulkCreate.records(3);
  const pieces = await bulkCreate.pieces(3);
  const formulas = await bulkCreate.formulas(3);
  const chemicals = await bulkCreate.chemicals(4);

  targets[0].addRecord(records[0]); // target 0 is linked to both records
  targets[0].addRecord(records[1]);
  // target 1 has no record
  // record 2 has no target

  link.targetPoints([targets[0]], { min: 15, max: 15 }); // add 15 points to target 0
  // target 1 has no points

  records[0].addPiece(pieces[0]); // record 0 has pieces 0 and 1
  records[0].addPiece(pieces[1]);
  records[1].addPiece(pieces[0]); // record 1 only has piece 0
  // piece 2 has no record
  // record 2 has no piece

  pieces[0].createPhoto({ url: "testurl1" }); // piece 0 has 2 urls
  pieces[0].createPhoto({ url: "testurl2" });
  pieces[1].createPhoto({ url: "testurl1" }); // piece 1 has 1 url
  // piece 2 has no url

  formulas[0].addPiece(pieces[0]); // formula 0 has piece 0
  formulas[1].addPiece(pieces[1]); // formula 1 has piece 1
  // piece 2 has no formula
  // formula 2 has no piece

  formulas[0].addChemical(chemicals[0], { through: { amount: 0.5 } }); // Formula 0 has Chemicals 0 and 1
  formulas[0].addChemical(chemicals[1], { through: { amount: 0.5 } });
  formulas[1].addChemical(chemicals[0], { through: { amount: 0.33 } }); // Formula 1 has Chemicals 0, 1 and 2
  formulas[1].addChemical(chemicals[1], { through: { amount: 0.33 } });
  formulas[1].addChemical(chemicals[2], { through: { amount: 0.33 } });
  // formula 2 has no chemical
  // chemical 3 has no formula
};
