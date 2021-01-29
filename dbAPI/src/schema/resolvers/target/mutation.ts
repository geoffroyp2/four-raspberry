import Target, { TargetAttributes, TargetCreationAttributes } from "../../../database/models/target/target";
import { colorToString } from "../../../utils/strings";
import { ColorType } from "../sharedTypes";

interface CGQTargetCreationAttributes {
  name: string;
  description: string;
  color: ColorType;
  oven: string;
}

interface CGQTargetAttributes extends CGQTargetCreationAttributes {
  id: number;
}

const Mutation = {
  createTarget: async (obj: any, { name, description, color, oven }: CGQTargetCreationAttributes) => {
    const args: TargetCreationAttributes = {
      name: name,
      description: description,
      color: colorToString(color),
      oven: oven && (oven === "gaz" || oven === "electrique") ? oven : "gaz",
    };
    return await Target.create(args);
  },

  deleteTarget: async (obj: any, args: TargetAttributes) => {
    const result = await Target.destroy({ where: args });
    return result > 0;
  },

  updateTarget: async (obj: any, { id, name, description, color, oven }: CGQTargetAttributes) => {
    const target = await Target.findOne({ where: { id } });
    if (target) {
      if (name) target.set({ name });
      if (description) target.set({ description });
      if (color) target.set({ color: colorToString(color) });
      if (oven && (oven === "gaz" || oven === "electrique")) target.set({ oven });

      return await target.save();
    }
    return null;
  },
};

export default Mutation;
