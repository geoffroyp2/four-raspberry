import Formula from "../../../database/models/formula/formula";
import Piece from "../../../database/models/piece/piece";
import Record from "../../../database/models/record/record";

import { GQLRecordFind, ResolverObjectType } from "../types";

const Attribute: ResolverObjectType = {
  /**
   * @param parent the Piece
   * @param args search filters
   * @return the Records linked with the Piece or null if no link
   */
  records: async (
    parent: Piece,
    { id, name, oven }: GQLRecordFind,
    { pieceRecordListLoader, targetLoader }
  ): Promise<Record[]> => {
    const pieceRecords = await pieceRecordListLoader.load(parent.id);

    const records: Record[] = [];
    await Promise.all(
      pieceRecords.map(async (rec) => {
        if ((!id && !name) || (id && rec.id === id) || (name && rec.name === name)) {
          if (oven) {
            if (rec.targetId) {
              const target = await targetLoader.load(rec.targetId);
              if (target.oven === oven) records.push(rec);
            }
          } else {
            records.push(rec);
          }
        }
      })
    );
    return records;
  },

  /**
   * @param parent the Piece
   * @return an array of urls
   */
  photos: async (parent: Piece, _: any, { photoLoader }): Promise<string[]> => {
    return photoLoader.load(parent.id);
  },

  /**
   * @param parent the Piece
   * @return the Formula linked to the Piece or null if no link
   */
  formula: async (parent: Piece, _: any, { formulaLoader }): Promise<Formula | null> => {
    return parent.formulaId ? formulaLoader.load(parent.formulaId) : null;
  },

  /**
   * @param parent The Piece
   * @return the Piece's creation Date string
   */
  createdAt: (parent: Piece) => {
    return new Date(parent.createdAt).toISOString();
  },

  /**
   * @param parent The Piece
   * @return the Piece's update Date string
   */
  updatedAt: (parent: Piece) => {
    return new Date(parent.updatedAt).toISOString();
  },
};

export default Attribute;
