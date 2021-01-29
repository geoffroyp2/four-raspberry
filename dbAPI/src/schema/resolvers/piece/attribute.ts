import Formula from "../../../database/models/formula/formula";
import Piece from "../../../database/models/piece/piece";
import Record from "../../../database/models/record/record";
import Target from "../../../database/models/target/target";

import { GQLRecordFindType, GQLRecordAttributesType } from "../record/query";

const Attribute = {
  records: async (parent: Piece, { id, name, oven }: GQLRecordFindType) => {
    const args: GQLRecordAttributesType = {};
    if (id) args.id = id;
    if (name) args.name = name;
    const records = await Record.findAll({ where: args, order: [["id", "ASC"]] });

    if (oven) {
      const results = await Promise.all(
        records.map(async (r) => ({ t: await Target.findOne({ where: { id: r.targetId } }), r }))
      );
      return results.filter((e) => e.t && e.t.oven === oven).map((e) => e.r);
    }
    return records;
  },

  photos: async (parent: Piece) => {
    const photos = await parent.getPhotos();
    return photos.map((p) => p.url);
  },

  formula: async (parent: Piece) => {
    return await Formula.findOne({ where: { id: parent.formulaId } });
  },

  createdAt: (parent: Piece) => {
    return new Date(parent.createdAt).toISOString();
  },

  updatedAt: (parent: Piece) => {
    return new Date(parent.updatedAt).toISOString();
  },
};

export default Attribute;
