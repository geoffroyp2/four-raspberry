import Record from "../../../database/models/record/record";
import Target from "../../../database/models/target/target";

export interface GQLRecordAttributesType {
  id?: string;
  name?: string;
}
export interface GQLRecordFindType extends GQLRecordAttributesType {
  oven?: string;
}

const Query = {
  records: async (obj: any, { id, name, oven }: GQLRecordFindType) => {
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
};

export default Query;
