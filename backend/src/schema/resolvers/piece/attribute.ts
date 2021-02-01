import Formula from "../../../database/models/formula/formula";
import Piece from "../../../database/models/piece/piece";
import Record from "../../../database/models/record/record";
import Target from "../../../database/models/target/target";

import { GQLRecordFind } from "../types";

const Attribute = {
  /**
   * @param parent the Piece
   * @param args search filters
   * @return the Records linked with the Piece or null if no link
   */
  records: async (parent: Piece, { id, name, oven }: GQLRecordFind): Promise<Record[]> => {
    const records = (await parent.getRecords())
      .filter((e) => (id && e.id === id) || (name && e.name === name) || (!id && !name))
      .sort((a, b) => a.id - b.id);

    if (oven) {
      // if oven is specified, look for every Record's Target and only keep the matching ones
      const results = await Promise.all(
        records.map(async (r) => ({ t: await Target.findOne({ where: { id: r.targetId } }), r }))
      );
      return results.filter((e) => e.t && e.t.oven === oven).map((e) => e.r);
    }
    return records;
  },

  /**
   * @param parent the Piece
   * @return an array of urls
   */
  photos: async (parent: Piece): Promise<string[]> => {
    const photos = await parent.getPhotos();
    return photos.map((p) => p.url);
  },

  /**
   * @param parent the Piece
   * @return the Formula linked to the Piece or null if no link
   */
  formula: async (parent: Piece): Promise<Formula | null> => {
    return await Formula.findOne({ where: { id: parent.formulaId } });
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
