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
import { validateID } from "./idParser";

/**
 * @const linksHandler is a collection of methods relating to the handling of items in the database that have links in-between them
 * each database collection has it's own corresponding methods
 * for every collection, the fixLinks function aims to detect link errors and fix them
 * all of the links creation / deletion are handled here
 */

export const linksHandler = {
  /**
   * references have links to records
   * update to these links only come from the updating of records
   * deleting a reference needs to unlink the relevant records
   */

  reference: {
    /**
     * Restores the links involving the reference
     * @param referenceID the reference ID
     */

    fixLinks: async (referenceID: string): Promise<void> => {
      let currentReference = await ReferenceModel.findById(validateID(referenceID)).exec();

      // find all records that are pointed to by reference.records and break link if record does not point back
      if (currentReference) {
        currentReference.records.forEach(async (id) => {
          const currentRecord = await RecordModel.findById(validateID(id)).exec();
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

    /**
     * Deletes the links involving the reference and the reference itself
     * @param referenceID the reference ID
     */

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

  /**
   * records have links to references and pieces
   * changing the link to a reference updates both the current record and relevant reference(s)
   * adding / removing piece update both the record and relevant piece
   * the record/piece link can also be updated from the piece
   * deleting a record needs to unlink the relevant reference and pieces
   */

  record: {
    /**
     * Restores the links involving the record
     * @param recordID the record ID
     */

    fixLinks: async (recordID: string): Promise<void> => {
      let currentRecord = await RecordModel.findById(validateID(recordID)).exec();

      // find the reference that is pointed to by the currentRecord.reference and remove record link if mismatch
      if (currentRecord) {
        const referenceFound1 = await ReferenceModel.findById(validateID(currentRecord.reference)).exec();
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
          const currentPiece = await PieceModel.findById(validateID(id)).exec();
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

    /**
     * Links the record to new reference and deletes previous link if required
     * @param recordID the record ID
     * @param newReferenceID the new reference ID
     */

    changeReference: async (recordID: string, newReferenceID: string): Promise<ResDataType> => {
      const currentRecord = await RecordModel.findById(validateID(recordID)).exec();
      let updatedRecord: IRecordDocument;
      const updatedReferences: IReferenceDocument[] = [];

      // if record is not found, do nothing
      if (!currentRecord) {
        return {};
      }

      // if a reference was previously set, remove current Record from it
      const previousReference = await ReferenceModel.findById(validateID(currentRecord.reference)).exec();
      if (previousReference) {
        const updatedPreviousReference = await ReferenceModel.updateReference(previousReference._id, {
          $pull: { records: recordID },
        });
        updatedReferences.push(updatedPreviousReference);
      }

      // update new reference if it exists
      const newReference = await ReferenceModel.findById(validateID(newReferenceID)).exec();
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

    /**
     * Adds a piece to the record's piece array, and creates the corresponding link from piece to record
     * @param recordID the record ID
     * @param pieceID the piece ID
     */

    addPiece: async (recordID: string, pieceID: string): Promise<ResDataType> => {
      const currentRecord = await RecordModel.findById(validateID(recordID)).exec();
      const currentPiece = await PieceModel.findById(validateID(pieceID)).exec();

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

    /**
     * Removes a piece from the record's piece array, and deletes the corresponding link from piece to record
     * @param recordID the record ID
     * @param pieceID the piece ID
     */

    removePiece: async (recordID: string, pieceID: string): Promise<ResDataType> => {
      const currentRecord = await RecordModel.findById(validateID(recordID)).exec();
      const currentPiece = await PieceModel.findById(validateID(pieceID)).exec();

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

    /**
     * Deletes the links involving the record and the record itself
     * @param recordID the record ID
     */

    delete: async (recordID: string): Promise<ResDataType> => {
      const currentRecord = await RecordModel.findById(validateID(recordID)).exec();

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
      const currentReference = await ReferenceModel.findById(validateID(currentRecord.reference)).exec();
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

  /**
   * pieces have links to records and formulas
   * link to record can be changed by both record and piece
   * link to formula can only be changed by piece
   * deleting a piece needs to unlink the relevant records and formula
   */

  piece: {
    /**
     * Restores the links involving the piece
     * @param pieceID the piece ID
     */

    fixLinks: async (pieceID: string): Promise<void> => {
      let currentPiece = await PieceModel.findById(validateID(pieceID)).exec();

      // find the records that are pointed to by piece.records, remove links if record does not point back
      if (currentPiece) {
        currentPiece.records.forEach(async (id) => {
          const rec = await RecordModel.findById(validateID(id)).exec();
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
        const foundFormula = await FormulaModel.findById(validateID(currentPiece.formula)).exec();
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

    /**
     * Adds a record to the piece's record array, and creates the corresponding link from record to piece
     * @param pieceID the piece ID
     * @param recordID the record ID
     */

    addRecord: async (pieceID: string, recordID: string): Promise<ResDataType> => {
      const currentPiece = await PieceModel.findById(validateID(pieceID)).exec();
      const currentRecord = await RecordModel.findById(validateID(recordID)).exec();

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

    /**
     * Removes a record from the piece's record array, and deletes the corresponding link from record to piece
     * @param pieceID the piece ID
     * @param recordID the record ID
     */

    removeRecord: async (pieceID: string, recordID: string): Promise<ResDataType> => {
      const currentRecord = await RecordModel.findById(validateID(recordID)).exec();
      const currentPiece = await PieceModel.findById(validateID(pieceID)).exec();

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

    /**
     * Links the piece to new formula and deletes previous link if required
     * @param pieceID the piece ID
     * @param newFormulaID the new formula ID
     */

    changeFormula: async (pieceID: string, newFormulaID: string): Promise<ResDataType> => {
      const currentPiece = await PieceModel.findById(validateID(pieceID)).exec();
      let updatedPiece: IPieceDocument;
      const updatedFormulas: IFormulaDocument[] = [];

      // if piece is not found, do nothing
      if (!currentPiece) {
        return {};
      }

      // // if a formula was previously set, remove current Piece from it
      const previousFormula = await FormulaModel.findById(validateID(currentPiece.formula)).exec();
      if (previousFormula) {
        const updatedPreviousFormula = await FormulaModel.updateFormula(previousFormula._id, {
          $pull: { pieces: pieceID },
        });
        updatedFormulas.push(updatedPreviousFormula);
      }

      // // update new formula if it exists
      const newFormula = await FormulaModel.findById(validateID(newFormulaID)).exec();
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

    /**
     * Deletes the links involving the piece and the piece itself
     * @param pieceID  the piece ID
     */

    delete: async (pieceID: string): Promise<ResDataType> => {
      const currentPiece = await PieceModel.findById(validateID(pieceID)).exec();

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
      const currentFormula = await FormulaModel.findById(validateID(currentPiece.formula)).exec();
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

  /**
   * formula have links to pieces and chemicals
   * pieces link cannot be edited from formula
   * chemical link can only be changed by formula
   * deleting a formula needs to unlink the relevant pieces
   */

  formula: {
    /**
     * Restores the links involving the piece
     * @param formulaID the formula ID
     */

    fixLinks: async (formulaID: string): Promise<void> => {
      let currentFormula = await FormulaModel.findById(validateID(formulaID)).exec();

      // find the pieces that are pointed to by formula.pieces, remove links if piece does not point back
      if (currentFormula) {
        currentFormula.pieces.forEach(async (id) => {
          const piece = await PieceModel.findById(validateID(id)).exec();
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
        const currentChemical = await ChemicalModel.findById(validateID(item.id)).exec();
        if (!currentChemical) {
          currentFormula = await FormulaModel.updateFormula(formulaID, { $pull: { composition: { id: item.id } } });
        }
      });
    },

    /**
     * Adds a chemicalItem to the formula's composition array
     * @param formulaID the formula ID
     * @param item the formulaItem to add
     */

    addChemical: async (formulaID: string, item: FormulaItem): Promise<ResDataType> => {
      // takes in FormulaItem to add both id and amount

      const currentFormula = await FormulaModel.findById(validateID(formulaID)).exec();
      const currentChemical = await ChemicalModel.findById(validateID(item.id)).exec();

      // if either does not exist, do nothing
      if (!currentChemical || !currentFormula) {
        return {};
      }

      // add chemical to current formula
      const updatedFormula = await FormulaModel.updateFormula(formulaID, { $push: { composition: item } });

      return { formula: [updatedFormula] };
    },

    /**
     * Removes a chemicalItem from the formula's composition array
     * @param formulaID the formula ID
     * @param chemicalID the chemical ID
     */

    removeChemical: async (formulaID: string, chemicalID: string): Promise<ResDataType> => {
      // only removes by id, no amount needed
      const currentFormula = await FormulaModel.findById(validateID(formulaID)).exec();
      const currentChemical = await ChemicalModel.findById(validateID(chemicalID)).exec();

      // if either does not exist, do nothing
      if (!currentFormula || !currentChemical) {
        return {};
      }

      // remove chemical from current formula
      const updatedFormula = await FormulaModel.updateFormula(formulaID, { $pull: { composition: { id: chemicalID } } });

      return { formula: [updatedFormula] };
    },

    /**
     * Deletes the links involving the formula and the formula itself
     * @param formulaID the formula ID
     */

    delete: async (formulaID: string): Promise<ResDataType> => {
      const currentFormula = await FormulaModel.findById(validateID(formulaID)).exec();

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

  /**
   * chemicals have links to formula (they are only pointed to)
   * deleting a chemical needs to update relevant formulas
   */

  chemical: {
    /**
     *  Restores the links involving the chemical
     * @param chemicalID the chemical ID
     */

    fixLinks: async (chemicalID: string): Promise<void> => {
      const currentChemical = await ChemicalModel.findById(validateID(chemicalID)).exec();

      // if currentChemical does not exist, delete all link to it in formulas
      if (!currentChemical) {
        const foundFormulas = await FormulaModel.find({ composition: { $elemMatch: { id: chemicalID } } }).exec();
        foundFormulas.forEach(async (formula) => {
          await FormulaModel.updateFormula(formula._id, { $pull: { composition: { id: chemicalID } } });
        });
      }
    },

    /**
     * Deletes the links involving the chemical and the chemical itself
     * @param chemicalID the chemical ID
     */

    delete: async (chemicalID: string): Promise<ResDataType> => {
      const currentChemical = await ChemicalModel.findById(validateID(chemicalID)).exec();

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
