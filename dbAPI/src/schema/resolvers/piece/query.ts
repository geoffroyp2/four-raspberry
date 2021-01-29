import Record, { RecordAttributes } from "../../../database/models/record/record";

const Query = {
  records: async (obj: any, args: RecordAttributes) => {
    return await Record.findAll({ where: args, order: [["id", "ASC"]] });
  },
};

export default Query;
