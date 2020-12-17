import db from "@db/handler";
import { Chemical, Formula, Piece, Record, Reference } from "@sharedTypes/dbModelTypes";

// Fetch all data from database (placeholder)

export const loadData = async (): Promise<{
  chemical: Chemical[];
  formula: Formula[];
  piece: Piece[];
  record: Record[];
  reference: Reference[];
}> => {
  const chemical = await db.chemical.getAll();
  const formula = await db.formula.getAll();
  const piece = await db.piece.getAll();
  const record = await db.record.getAll();
  const reference = await db.reference.getAll();

  return {
    chemical: chemical,
    formula: formula,
    piece: piece,
    record: record,
    reference: reference,
  };
};
