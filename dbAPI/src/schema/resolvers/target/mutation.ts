import Target from "../../../database/models/target/model";
import { TargetAttributes } from "../../../database/models/target/types";

const Mutation = {
  createTarget: async (obj: any, args: TargetAttributes) => {
    return await Target.create();
  },

  deleteTarget: async (obj: any, args: TargetAttributes) => {
    const result = await Target.destroy({ where: args });
    return result > 0;
  },

  updateTarget: async (obj: any, { id, name, description, color }: TargetAttributes) => {
    const target = await Target.findOne({ where: { id } });
    if (target) {
      if (name) target.set({ name });
      if (description) target.set({ description });
      if (color) target.set({ color });
      return await target.save();
    }
    return null;
  },
};

export default Mutation;
