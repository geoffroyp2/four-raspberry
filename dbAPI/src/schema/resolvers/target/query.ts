import Target from "../../../database/models/target/model";
import { TargetAttributes } from "../../../database/models/target/types";

const Query = {
  targets: async (obj: any, args: TargetAttributes) => {
    return await Target.findAll({ where: args });
  },
};

export default Query;
