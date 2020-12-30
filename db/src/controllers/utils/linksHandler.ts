import { ChemicalModel } from "../../models/chemical/model";
import { FormulaModel } from "../../models/formula/model";
import { FormulaItem, IFormulaDocument } from "../../models/formula/types";
import { PieceModel } from "../../models/piece/model";
import { IPieceDocument } from "../../models/piece/types";
import { RecordModel } from "../../models/record/model";
import { IRecordDocument } from "../../models/record/types";
import { ReferenceModel } from "../../models/reference/model";
import { IReferenceDocument } from "../../models/reference/types";

import { ResDataType } from "../shared/resTypes";

/*

Handler for all the linked elements in the database.
For every collection, there is a reSyncLinks function that aims to detect and repair possible link failures
Link creation / deletion are also handled here
Deletion of the item + deletion of all it's links is handle here

*/

export const linksHandler = {
  reference: {
    // references have links to records
    // update to these links come from the updating of records only
    // deleting a reference needs to unlink the relevant records

    reSyncLinks: async (referenceID: string): Promise<void> => {
      // scan db for ( reference <==> record ) links based on referenceID.
      // only update reference when de-sync found, update record if reference does not exist

      let currentReference = await ReferenceModel.findById(referenceID).exec();

      // find all records that are pointed to by reference.records and break link if record does not point back
      if (currentReference) {
        currentReference.records.forEach(async (id) => {
          const currentRecord = await RecordModel.findById(id).exec();
          if (!currentRecord || currentRecord.reference !== referenceID) {
            currentReference = await ReferenceModel.updateReference(referenceID, { $pull: { records: id } });
          }
        });
      }

      // find all records that are linked to referenceID, and restore link from reference if missing
      let recordsFound = await RecordModel.find({ reference: referenceID }).exec();
      if (!currentReference) {
        // if no entry for referenceID, erase links from records
        recordsFound.forEach(async (rec) => {
          await RecordModel.updateRecord(rec._id, { reference: "" });
        });
      } else {
        // if link does not exist, restore it
        recordsFound.forEach(async (rec) => {
          if (!currentReference.records.includes(rec._id)) {
            currentReference = await ReferenceModel.updateReference(referenceID, {
              $push: { records: rec._id },
            });
          }
        });
      }
    },

    delete: async (referenceID: string): Promise<ResDataType> => {
      // update all records that are linked to the referenceID
      const recordsFound = await RecordModel.find({ reference: referenceID }).exec();
      const updatedRecords = await Promise.all(
        recordsFound.map(async (r) => {
          return RecordModel.updateRecord(r._id, { reference: "" });
        })
      );

      // delete the Reference
      await ReferenceModel.deleteOne({ _id: referenceID }).exec();

      return { record: updatedRecords };
    },
  },

  record: {
    // records have links to references and pieces
    // changing the link to a reference updates both the current record and relevant reference(s)
    // adding / removing piece update both the record and relevant piece
    // the record/piece link can also be updated from the piece
    // deleting a record needs to unlink the relevant reference and pieces

    reSyncLinks: async (recordID: string): Promise<void> => {
      // scan db for ( reference <==> record ) && ( piece <==> record ) links based on recordID.
      // only update record if de-sync found, update references if collision, update references && pieces if record does not exist

      let currentRecord = await RecordModel.findById(recordID).exec();

      // find the reference that is pointed to by the currentRecord.reference and remove record link if mismatch
      if (currentRecord) {
        const referenceFound1 = await ReferenceModel.findById(currentRecord.reference).exec();
        if (!referenceFound1 || !referenceFound1.records.includes(recordID)) {
          currentRecord = await RecordModel.updateRecord(recordID, { reference: "" });
        }
      }

      // find all the references that link to the currentRecord
      // if several are found, only keep the first one and erase the others
      // update the record link to point to the kept reference
      const referenceFound2 = await ReferenceModel.find({ records: recordID }).exec();
      if (!currentRecord) {
        // if there is no entry for recordID, remove all links from references
        referenceFound2.forEach(async (ref) => {
          await ReferenceModel.updateReference(ref._id, {
            $pull: { records: recordID },
          });
        });
      } else if (referenceFound2.length === 0 && currentRecord.reference !== "") {
        // if no reference point to currentRecord, remove record link (probably redundant)
        currentRecord = await RecordModel.updateRecord(recordID, { reference: "" });
      } else if (referenceFound2.length > 1) {
        // if several links found, only keep one and update the others
        [...referenceFound2].splice(0, 1).forEach(async (ref) => {
          await ReferenceModel.updateReference(ref._id, {
            $pull: { records: recordID },
          });
        });
        currentRecord = await RecordModel.updateRecord(recordID, { reference: referenceFound2[0]._id });
      } else if (referenceFound2[0]._id !== currentRecord.reference) {
        // if the record link does not match the reference link, update record
        await RecordModel.updateRecord(recordID, { reference: referenceFound2[0]._id });
      }

      // find all pieces that are pointed to by currentRecord.pieces, and break link if piece does not point back
      if (currentRecord) {
        currentRecord.pieces.forEach(async (id) => {
          const currentPiece = await PieceModel.findById(id).exec();
          if (!currentPiece || !currentPiece.records.includes(recordID)) {
            currentRecord = await RecordModel.updateRecord(recordID, {
              $pull: { pieces: id },
            });
          }
        });
      }

      // find all pieces that are linked to recordID, and restore link from record if missing
      const piecesFound = await PieceModel.find({ records: recordID }).exec();
      if (!currentRecord) {
        // if there is no entry for recordID, remove all links from pieces
        piecesFound.forEach(async (piece) => {
          await PieceModel.updatePiece(piece._id, {
            $pull: { records: recordID },
          });
        });
      } else {
        // else restore links
        piecesFound.forEach(async (piece) => {
          if (!currentRecord.pieces.includes(piece._id)) {
            currentRecord = await RecordModel.updateRecord(recordID, { $push: { pieces: piece._id } });
          }
        });
      }
    },

    changeReference: async (recordID: string, newReferenceID: string): Promise<ResDataType> => {
      const currentRecord = await RecordModel.findById(recordID).exec();
      let updatedRecord: IRecordDocument;
      const updatedReferences: IReferenceDocument[] = [];

      // if record is not found, do nothing
      if (!currentRecord) {
        return {};
      }

      // if a reference was previously set, remove current Record from it
      const previousReference = await ReferenceModel.findById(currentRecord.reference).exec();
      if (previousReference) {
        const updatedPreviousReference = await ReferenceModel.updateReference(previousReference._id, {
          $pull: { records: recordID },
        });
        updatedReferences.push(updatedPreviousReference);
      }

      // update new reference if it exists
      const newReference = await ReferenceModel.findById(newReferenceID).exec();
      if (newReference) {
        const updatedNewReference = await ReferenceModel.updateReference(newReferenceID, {
          $push: { records: recordID },
        });
        updatedReferences.push(updatedNewReference);

        // if the new reference exists, update the record
        updatedRecord = await RecordModel.updateRecord(recordID, { reference: newReferenceID });
      } else {
        // if the new reference is not found, erase the reference field
        updatedRecord = await RecordModel.updateRecord(recordID, { reference: "" });
      }

      return {
        record: [updatedRecord],
        reference: updatedReferences,
      };
    },

    addPiece: async (recordID: string, pieceID: string): Promise<ResDataType> => {
      const currentRecord = await RecordModel.findById(recordID).exec();
      const currentPiece = await PieceModel.findById(pieceID).exec();

      // if record or piece not found, do nothing
      if (!currentRecord || !currentPiece) {
        return {};
      }

      // add currentRecord in piece's records list
      const updatedPiece = await PieceModel.updatePiece(pieceID, { $push: { records: recordID } });

      // add currentPiece in Record's pieces list
      const updatedRecord = await RecordModel.updateRecord(recordID, { $push: { pieces: pieceID } });

      return { record: [updatedRecord], piece: [updatedPiece] };
    },

    removePiece: async (recordID: string, pieceID: string): Promise<ResDataType> => {
      const currentRecord = await RecordModel.findById(recordID).exec();
      const currentPiece = await PieceModel.findById(pieceID).exec();

      // if currentRecord not found, try to remove it from currentPiece's records
      if (!currentRecord) {
        const updatedPiece = await PieceModel.updatePiece(pieceID, {
          $pull: { records: recordID },
        });
        return { piece: [updatedPiece] };
      }

      // if currentPiece not found, remove it from currentRecord anyways
      if (!currentPiece) {
        const updatedRecord = await RecordModel.updateRecord(recordID, {
          $pull: { pieces: pieceID },
        });
        return { record: [updatedRecord] };
      }

      // else update both record and piece
      const updatedRecord = await RecordModel.updateRecord(recordID, {
        $pull: { pieces: pieceID },
      });
      const updatedPiece = await PieceModel.updatePiece(pieceID, {
        $pull: { records: recordID },
      });

      return { record: [updatedRecord], piece: [updatedPiece] };
    },

    delete: async (recordID: string): Promise<ResDataType> => {
      const currentRecord = await RecordModel.findById(recordID).exec();

      // if currentRecord not found, do nothing
      if (!currentRecord) {
        return {};
      }

      // find all relevant pieces in db and update them
      const piecesFound = await PieceModel.find({ records: recordID }).exec();
      const updatedPieces = await Promise.all(
        piecesFound.map(async (p) => {
          return await PieceModel.updatePiece(p._id, {
            $pull: { records: recordID },
          });
        })
      );

      // find reference and update it
      const currentReference = await ReferenceModel.findById(currentRecord.reference).exec();
      let updatedReference: IReferenceDocument | null = null;
      if (currentReference) {
        updatedReference = await ReferenceModel.updateReference(currentReference._id, {
          $pull: { records: recordID },
        });
      }

      // delete record
      await RecordModel.deleteOne({ _id: recordID }).exec();

      return { piece: updatedPieces, reference: [updatedReference] };
    },
  },

  piece: {
    // pieces have links to records and formulas
    // link to record can be changed by both record and piece
    // link to formula can only be changed by piece
    // deleting a piece needs to unlink the relevant records and formula

    reSyncLinks: async (pieceID: string): Promise<void> => {
      // scan db for ( piece <==> record ) && ( piece <==> formula ) links based on pieceID.
      // only update piece if de-sync found, update formulas if collision, update record && formula if record does not exist

      let currentPiece = await PieceModel.findById(pieceID).exec();

      // find the records that are pointed to by piece.records, remove links if record does not point back
      if (currentPiece) {
        currentPiece.records.forEach(async (id) => {
          const rec = await RecordModel.findById(id).exec();
          if (!rec || !rec.pieces.includes(pieceID)) {
            currentPiece = await PieceModel.updatePiece(pieceID, {
              $pull: { records: id },
            });
          }
        });
      }

      // find all records that point to the piece, restore the link from piece if it does not exist
      const foundRecords = await RecordModel.find({ pieces: pieceID }).exec();
      if (!currentPiece) {
        // if currentPiece does not exist, remove link from records
        foundRecords.forEach(async (rec) => {
          await RecordModel.updateRecord(rec._id, {
            $pull: { pieces: pieceID },
          });
        });
      } else {
        // else restore links
        foundRecords.forEach(async (rec) => {
          if (!currentPiece.records.includes(rec._id)) {
            currentPiece = await PieceModel.updatePiece(pieceID, {
              $push: { records: rec._id },
            });
          }
        });
      }

      // find the formula that is pointed to by piece.formula, remove link if formula does not point back
      // if several are found, only keep the first one and erase the others
      if (currentPiece) {
        const foundFormula = await FormulaModel.findById(currentPiece.formula).exec();
        if (!foundFormula || !foundFormula.pieces.includes(pieceID)) {
          currentPiece = await PieceModel.updatePiece(pieceID, { formula: "" });
        }
      }

      // find all formulas that point to the piece, restore the link from piece if it does not exist
      const foundFormula = await FormulaModel.find({ pieces: pieceID }).exec();
      if (!currentPiece) {
        // if currentPiece does not exist, remove link from formulas
        foundFormula.forEach(async (formula) => {
          await FormulaModel.updateFormula(formula._id, {
            $pull: { pieces: pieceID },
          });
        });
      } else {
        // else restore links
        foundFormula.forEach(async (formula) => {
          if (currentPiece.formula !== formula._id) {
            currentPiece = await PieceModel.updatePiece(pieceID, { formula: formula._id });
          }
        });
      }
    },

    addRecord: async (pieceID: string, recordID: string): Promise<ResDataType> => {
      const currentPiece = await PieceModel.findById(pieceID).exec();
      const currentRecord = await RecordModel.findById(recordID).exec();

      // if record or piece not found, do nothing
      if (!currentRecord || !currentPiece) {
        return {};
      }

      // add currentRecord in piece's records list
      const updatedPiece = await PieceModel.updatePiece(pieceID, { $push: { records: recordID } });

      // add currentPiece in Record's pieces list
      const updatedRecord = await RecordModel.updateRecord(recordID, { $push: { pieces: pieceID } });

      return { record: [updatedRecord], piece: [updatedPiece] };
    },

    removeRecord: async (pieceID: string, recordID: string): Promise<ResDataType> => {
      const currentRecord = await RecordModel.findById(recordID).exec();
      const currentPiece = await PieceModel.findById(pieceID).exec();

      // if currentRecord not found, try to remove it from currentPiece's records
      if (!currentRecord) {
        const updatedPiece = await PieceModel.updatePiece(pieceID, {
          $pull: { records: recordID },
        });
        return { piece: [updatedPiece] };
      }

      // if currentPiece not found, remove it from currentRecord anyways
      if (!currentPiece) {
        const updatedRecord = await RecordModel.updateRecord(recordID, {
          $pull: { pieces: pieceID },
        });
        return { record: [updatedRecord] };
      }

      // else update both record and piece
      const updatedRecord = await RecordModel.updateRecord(recordID, {
        $pull: { pieces: pieceID },
      });
      const updatedPiece = await PieceModel.updatePiece(pieceID, {
        $pull: { records: recordID },
      });

      return { record: [updatedRecord], piece: [updatedPiece] };
    },

    changeFormula: async (pieceID: string, newFormulaID: string): Promise<ResDataType> => {
      const currentPiece = await PieceModel.findById(pieceID).exec();
      let updatedPiece: IPieceDocument;
      const updatedFormulas: IFormulaDocument[] = [];

      // if piece is not found, do nothing
      if (!currentPiece) {
        return {};
      }

      // // if a formula was previously set, remove current Piece from it
      const previousFormula = await FormulaModel.findById(currentPiece.formula).exec();
      if (previousFormula) {
        const updatedPreviousFormula = await FormulaModel.updateFormula(previousFormula._id, {
          $pull: { pieces: pieceID },
        });
        updatedFormulas.push(updatedPreviousFormula);
      }

      // // update new formula if it exists
      const newFormula = await FormulaModel.findById(newFormulaID).exec();
      if (newFormula) {
        const updatedNewFormula = await FormulaModel.updateFormula(newFormulaID, {
          $push: { pieces: pieceID },
        });
        updatedFormulas.push(updatedNewFormula);

        // if the new reference exists, update the record
        updatedPiece = await PieceModel.updatePiece(pieceID, { formula: newFormulaID });
      } else {
        // if the new reference is not found, erase the reference field
        updatedPiece = await PieceModel.updatePiece(pieceID, { formula: "" });
      }

      return {
        piece: [updatedPiece],
        formula: updatedFormulas,
      };
    },

    delete: async (pieceID: string): Promise<ResDataType> => {
      const currentPiece = await PieceModel.findById(pieceID).exec();

      // if currentPiece not found, do nothing
      if (!currentPiece) {
        return {};
      }

      // find all relevant records in db and update them
      const recordsFound = await RecordModel.find({ pieces: pieceID }).exec();
      const updatedRecords = await Promise.all(
        recordsFound.map(async (rec) => {
          return await RecordModel.updateRecord(rec._id, {
            $pull: { pieces: pieceID },
          });
        })
      );

      // find formula and update it
      const currentFormula = await FormulaModel.findById(currentPiece.formula).exec();
      let updatedFormula: IFormulaDocument | null = null;
      if (currentFormula) {
        updatedFormula = await FormulaModel.updateFormula(currentFormula._id, {
          $pull: { pieces: pieceID },
        });
      }

      // delete piece
      await PieceModel.deleteOne({ _id: pieceID }).exec();

      return { record: updatedRecords, formula: [updatedFormula] };
    },
  },

  formula: {
    // formula have links to pieces and chemicals
    // pieces link cannot be edited from formula
    // chemical link can be changed
    // deleting a formula needs to unlink the relevant pieces

    reSyncLinks: async (formulaID: string): Promise<void> => {
      let currentFormula = await FormulaModel.findById(formulaID).exec();

      // find the pieces that are pointed to by formula.pieces, remove links if piece does not point back
      if (currentFormula) {
        currentFormula.pieces.forEach(async (id) => {
          const piece = await PieceModel.findById(id).exec();
          if (!piece || piece.formula !== formulaID) {
            currentFormula = await FormulaModel.updateFormula(formulaID, {
              $pull: { pieces: id },
            });
          }
        });
      }

      // find all pieces that point to the formula, restore the link from formula if it does not exist
      const foundPieces = await PieceModel.find({ formula: formulaID }).exec();
      if (!currentFormula) {
        // if currentFormula does not exist, remove links from pieces
        foundPieces.forEach(async (piece) => {
          await PieceModel.updatePiece(piece._id, { formula: "" });
        });
      } else {
        foundPieces.forEach(async (piece) => {
          if (!currentFormula.pieces.includes(piece._id)) {
            currentFormula = await FormulaModel.updateFormula(formulaID, { $push: { pieces: piece._id } });
          }
        });
      }

      // find all chemicals that are pointed to by formula.composition, delete link if chemical does not exist
      const foundChemicals = currentFormula.composition.forEach(async (item) => {
        const currentChemical = await ChemicalModel.findById(item.id).exec();
        if (!currentChemical) {
          currentFormula = await FormulaModel.updateFormula(formulaID, { $pull: { composition: { id: item.id } } });
        }
      });
    },

    addChemical: async (formulaID: string, item: FormulaItem): Promise<ResDataType> => {
      // takes in FormulaItem to add both id and amount

      const currentFormula = await FormulaModel.findById(formulaID).exec();
      const currentChemical = await ChemicalModel.findById(item.id).exec();

      // if either does not exist, do nothing
      if (!currentChemical || !currentFormula) {
        return {};
      }

      // add chemical to current formula
      const updatedFormula = await FormulaModel.updateFormula(formulaID, { $push: { composition: item } });

      return { formula: [updatedFormula] };
    },

    removeChemical: async (formulaID: string, chemicalID: string): Promise<ResDataType> => {
      // only removes by id, no amount needed
      const currentFormula = await FormulaModel.findById(formulaID).exec();
      const currentChemical = await ChemicalModel.findById(chemicalID).exec();

      // if either does not exist, do nothing
      if (!currentFormula || !currentChemical) {
        return {};
      }

      // remove chemical from current formula
      const updatedFormula = await FormulaModel.updateFormula(formulaID, { $pull: { composition: { id: chemicalID } } });

      return { formula: [updatedFormula] };
    },

    delete: async (formulaID: string): Promise<ResDataType> => {
      const currentFormula = await FormulaModel.findById(formulaID).exec();

      // if currentPiece not found, do nothing
      if (!currentFormula) {
        return {};
      }

      // find all relevant pieces in db and update them
      const piecesFound = await PieceModel.find({ formula: formulaID }).exec();
      const updatedPieces = await Promise.all(
        piecesFound.map(async (piece) => {
          return await PieceModel.updatePiece(piece._id, { formula: "" });
        })
      );

      // delete formula
      await FormulaModel.deleteOne({ _id: formulaID }).exec();

      return { piece: updatedPieces };
    },
  },

  chemical: {
    // chemicals have no outward links
    // deleting a chemical needs to update relevant formulas

    reSyncLinks: async (chemicalID: string): Promise<void> => {
      const currentChemical = await ChemicalModel.findById(chemicalID).exec();

      // if currentChemical does not exist, delete all link to it in formulas
      if (!currentChemical) {
        const foundFormulas = await FormulaModel.find({ composition: { $elemMatch: { id: chemicalID } } }).exec();
        foundFormulas.forEach(async (formula) => {
          await FormulaModel.updateFormula(formula._id, { $pull: { composition: { id: chemicalID } } });
        });
      }
    },

    delete: async (chemicalID: string): Promise<ResDataType> => {
      const currentChemical = await ChemicalModel.findById(chemicalID).exec();

      if (!currentChemical) {
        return {};
      }

      // delete all reference to chemicalID in formulas
      const foundFormulas = await FormulaModel.find({ composition: { $elemMatch: { id: chemicalID } } }).exec();
      const updatedFomulas = await Promise.all(
        foundFormulas.map(async (formula) => {
          return await FormulaModel.updateFormula(formula._id, { $pull: { composition: { id: chemicalID } } });
        })
      );

      //delete chemical
      await FormulaModel.deleteOne({ _id: chemicalID }).exec();

      return { formula: updatedFomulas };
    },
  },
};
