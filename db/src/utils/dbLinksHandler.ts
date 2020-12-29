import { PieceModel } from "../models/piece/model";
import { IPieceDocument } from "../models/piece/types";
import { RecordModel } from "../models/record/model";
import { IRecordDocument } from "../models/record/types";
import { ReferenceModel } from "../models/reference/model";
import { IReferenceDocument } from "../models/reference/types";

export const linksHandler = {
  reference: {
    // references have links to records
    // update to these links come from the updating of records only
    // deleting a reference needs to unlink the relevant records

    reSyncLinks: async (referenceID: string): Promise<void> => {
      // scan db for ( reference <==> record ) links based on referenceID.
      // only update reference when de-sync found, update record if reference does not exist

      let currentReference = await ReferenceModel.findById(referenceID);

      // find all records that are pointed to by reference.records and break link if record does not point back
      if (currentReference) {
        currentReference.records.forEach(async (id) => {
          const currentRecord = await RecordModel.findById(id);
          if (!currentRecord || currentRecord.reference !== referenceID) {
            currentReference = await ReferenceModel.updateReference(referenceID, {
              records: [...currentReference.records].filter((recID) => recID !== id),
            });
          }
        });
      }

      // find all records that are linked to referenceID, and restore link from reference if missing
      let recordsFound = await RecordModel.find({ reference: referenceID });
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
              records: [...currentReference.records].concat(rec._id),
            });
          }
        });
      }
    },

    delete: async (referenceID: string): Promise<IRecordDocument[]> => {
      // update all records that are linked to the referenceID
      const recordsFound = await RecordModel.find({ reference: referenceID });
      const updatedRecords = await Promise.all(
        recordsFound.map(async (r) => {
          return RecordModel.updateRecord(r._id, { reference: "" });
        })
      );

      // delete the Reference
      await ReferenceModel.deleteOne({ _id: referenceID });

      return updatedRecords;
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

      let currentRecord = await RecordModel.findById(recordID);

      // find the reference that is pointed to by the currentRecord.reference and remove record link if mismatch
      if (currentRecord) {
        const referenceFound1 = await ReferenceModel.findById(currentRecord.reference);
        if (!referenceFound1 || !referenceFound1.records.includes(recordID)) {
          currentRecord = await RecordModel.updateRecord(recordID, { reference: "" });
        }
      }

      // find all the references that link to the currentRecord
      // if several are found, only keep the first one and erase the others
      // update the record link to point to the kept reference
      const referenceFound2 = await ReferenceModel.find({ records: { $in: [recordID] } });
      if (!currentRecord) {
        // if there is no entry for recordID, remove all links from references
        referenceFound2.forEach(async (ref) => {
          await ReferenceModel.updateReference(ref._id, { records: [...ref.records].filter((id) => id !== recordID) });
        });
      } else if (referenceFound2.length === 0 && currentRecord.reference !== "") {
        // if no reference point to currentRecord, remove record link (probably redundant)
        currentRecord = await RecordModel.updateRecord(recordID, { reference: "" });
      } else if (referenceFound2.length > 1) {
        // if several links found, only keep one and update the others
        [...referenceFound2].splice(0, 1).forEach(async (ref) => {
          await ReferenceModel.updateReference(ref._id, { records: [...ref.records].filter((id) => id !== recordID) });
        });
        currentRecord = await RecordModel.updateRecord(recordID, { reference: referenceFound2[0]._id });
      } else if (referenceFound2[0]._id !== currentRecord.reference) {
        // if the record link does not match the reference link, update record
        await RecordModel.updateRecord(recordID, { reference: referenceFound2[0]._id });
      }

      // find all pieces that are pointed to by currentRecord.pieces, and break link if piece does not point back
      if (currentRecord) {
        currentRecord.pieces.forEach(async (id) => {
          const currentPiece = await PieceModel.findById(id);
          if (!currentPiece || !currentPiece.records.includes(recordID)) {
            currentRecord = await RecordModel.updateRecord(recordID, {
              pieces: [...currentRecord.pieces].filter((pieceID) => pieceID !== id),
            });
          }
        });
      }

      // find all pieces that are linked to recordID, and restore link from record if missing
      const piecesFound = await PieceModel.find({ records: { $in: [recordID] } });
      if (!currentRecord) {
        // if there is no entry for recordID, remove all links from pieces
        piecesFound.forEach(async (piece) => {
          await PieceModel.updatePiece(piece._id, { records: [...piece.records].filter((id) => id !== recordID) });
        });
      } else {
        // else restore links
        piecesFound.forEach(async (piece) => {
          if (!currentRecord.pieces.includes(piece._id)) {
            currentRecord = await RecordModel.updateRecord(recordID, { pieces: [...currentRecord.pieces].concat(piece._id) });
          }
        });
      }
    },

    changeReference: async (
      recordID: string,
      newReferenceID: string
    ): Promise<{ rec: IRecordDocument | null; ref: IReferenceDocument[] }> => {
      const currentRecord = await RecordModel.findById(recordID);
      let updatedRecord: IRecordDocument;
      const updatedReferences: IReferenceDocument[] = [];

      // if record is not found, do nothing
      if (!currentRecord) {
        return { rec: null, ref: [] };
      }

      // if a reference was previously set, remove current Record from it
      const previousReference = await ReferenceModel.findById(currentRecord.reference);
      if (previousReference) {
        const updatedPreviousReference = await ReferenceModel.updateReference(previousReference._id, {
          records: [...previousReference.records].filter((id) => id !== recordID),
        });
        updatedReferences.push(updatedPreviousReference);
      }

      // update new reference if it exists
      const newReference = await ReferenceModel.findById(newReferenceID);
      if (newReference) {
        const updatedNewReference = await ReferenceModel.updateReference(newReferenceID, {
          records: [...newReference.records].concat(recordID),
        });
        updatedReferences.push(updatedNewReference);

        // if the new reference exists, update the record
        updatedRecord = await RecordModel.updateRecord(recordID, { reference: newReferenceID });
      } else {
        // if the new reference is not found, erase the reference field
        updatedRecord = await RecordModel.updateRecord(recordID, { reference: "" });
      }

      return {
        rec: updatedRecord,
        ref: updatedReferences,
      };
    },

    addPiece: async (
      recordID: string,
      pieceID: string
    ): Promise<{ rec: IRecordDocument | null; piece: IPieceDocument | null }> => {
      const currentRecord = await RecordModel.findById(recordID);
      const currentPiece = await PieceModel.findById(pieceID);

      // if record or piece not found, do nothing
      if (!currentRecord || !currentPiece) {
        return { rec: null, piece: null };
      }

      // add currentRecord in piece's records list
      const updatedPiece = await PieceModel.updatePiece(pieceID, { records: [...currentPiece.records].concat(recordID) });

      // add currentPiece in Record's pieces list
      const updatedRecord = await RecordModel.updateRecord(recordID, { pieces: [...currentRecord.pieces].concat(pieceID) });

      return { rec: updatedRecord, piece: updatedPiece };
    },

    removePiece: async (
      recordID: string,
      pieceID: string
    ): Promise<{ rec: IRecordDocument | null; piece: IPieceDocument | null }> => {
      const currentRecord = await RecordModel.findById(recordID);
      const currentPiece = await PieceModel.findById(pieceID);

      // if currentRecord not found, try to remove it from currentPiece's records
      if (!currentRecord) {
        const updatedPiece = await PieceModel.updatePiece(pieceID, {
          records: [...currentPiece.records].filter((id) => id !== recordID),
        });
        return { rec: null, piece: updatedPiece };
      }

      // if currentPiece not found, remove it from currentRecord anyways
      if (!currentPiece) {
        const updatedRecord = await RecordModel.updateRecord(recordID, {
          pieces: [...currentRecord.pieces].filter((id) => id !== pieceID),
        });
        return { rec: updatedRecord, piece: null };
      }

      // else update both record and piece
      const updatedRecord = await RecordModel.updateRecord(recordID, {
        pieces: [...currentRecord.pieces].filter((id) => id !== pieceID),
      });
      const updatedPiece = await PieceModel.updatePiece(pieceID, {
        records: [...currentPiece.records].filter((id) => id !== recordID),
      });

      return { rec: updatedRecord, piece: updatedPiece };
    },

    delete: async (recordID: string): Promise<{ pieces: IPieceDocument[]; ref: IReferenceDocument | null } | null> => {
      const currentRecord = await RecordModel.findById(recordID);

      // if currentRecord not found, do nothing
      if (!currentRecord) {
        return null;
      }

      // find all relevant pieces in db and update them
      const piecesFound = await PieceModel.find({ records: { $in: [recordID] } });
      const updatedPieces = await Promise.all(
        piecesFound.map(async (p) => {
          return await PieceModel.updatePiece(p._id, { records: [...p.records].filter((id) => id !== recordID) });
        })
      );

      // find reference and update it
      const currentReference = await ReferenceModel.findById(currentRecord.reference);
      let updatedReference: IReferenceDocument | null = null;
      if (currentReference) {
        updatedReference = await ReferenceModel.updateReference(currentReference._id, {
          records: [...currentReference.records].filter((id) => id !== recordID),
        });
      }

      // delete record
      await PieceModel.deleteOne({ _id: recordID });

      return { pieces: updatedPieces, ref: updatedReference };
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

      let currentPiece = await PieceModel.findById(pieceID);

      // find the records that are pointed to by piece.records, remove links if record does not point back
      if (currentPiece) {
        currentPiece.records.forEach(async (id) => {
          const rec = await RecordModel.findById(id);
          if (!rec || !rec.pieces.includes(pieceID)) {
            currentPiece = await PieceModel.updatePiece(pieceID, {
              records: [...currentPiece.records].filter((recID) => recID !== id),
            });
          }
        });
      }

      // find all records that point to the piece, restore the link from piece if it does not exist
      const foundRecords = await RecordModel.find({ pieces: { $in: [pieceID] } });
      if (!currentPiece) {
        // if currentPiece does not exist, remove link from records
        foundRecords.forEach(async (rec) => {
          await RecordModel.updateRecord(rec._id, { pieces: [...rec.pieces].filter((id) => id !== pieceID) });
        });
      } else {
        // else restore links
        foundRecords.forEach(async (rec) => {
          if (!currentPiece.records.includes(rec._id)) {
            currentPiece = await PieceModel.updatePiece(pieceID, { records: [...currentPiece.records].concat(rec._id) });
          }
        });
      }

      // find the formula that is pointed to by piece.formula, remove link if formula does not point back
      // if several are found, only keep the first one and erase the others
      /* TODO */

      // find all formulas that point to the piece, resotre the link from piece if it does not exist
      /* TODO */
    },

    addRecord: async () => {},
    removeRecord: async () => {},
    changeFormula: async () => {},
    delete: async () => {},
  },

  formula: {
    // formula have links to pieces and chemicals
    // pieces link cannot be edited from formula
    // chemical link can be changed
    // deleting a formula needs to unlink the relevant pieces

    reSyncLinks: async () => {},
    addChemical: async () => {},
    removeChemical: async () => {},
    delete: async () => {},
  },

  chemical: {
    // chemicals have no links
    // deleting a chemical needs to update relevant formulas
    reSyncLinks: async () => {},
    delete: async () => {},
  },
};
