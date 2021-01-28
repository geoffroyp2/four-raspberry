import Record from "../../../database/models/record/model";
import { RecordAttributes } from "../../../database/models/record/types";

const Query = {
  records: async (obj: any, args: RecordAttributes) => {
    return await Record.findAll({ where: args });
  },
};

export default Query;
