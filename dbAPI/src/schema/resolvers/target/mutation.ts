import Record from "../../../database/models/record/model";
import Target from "../../../database/models/target/model";
import { TargetAttributes } from "../../../database/models/target/types";

type RTIDType = {
  recordId: { id: number };
  targetId: { id: number };
};

const Mutation = {
  createTarget: async (obj: any, args: TargetAttributes) => {
    return await Target.create(args);
  },

  deleteTarget: async (obj: any, args: TargetAttributes) => {
    const result = await Target.destroy({ where: args });
    return result > 0;
  },

  updateTarget: async (obj: any, { id, name, description }: TargetAttributes) => {
    const target = await Target.findOne({ where: { id } });
    if (target) {
      if (name) target.set({ name });
      if (description) target.set({ description });
      return await target.save();
    }
    return null;
  },

  addRecordToTarget: async (obj: any, { recordId, targetId }: RTIDType) => {
    const target = await Target.findOne({ where: targetId });
    const record = await Record.findOne({ where: recordId });
    if (record && target) {
      target.addRecord(record);
      return true;
    }
    return false;
  },

  removeRecordFromTarget: async (obj: any, { recordId, targetId }: RTIDType) => {
    const target = await Target.findOne({ where: targetId });
    const record = await Record.findOne({ where: recordId });
    if (record && target) {
      target.removeRecord(record);
      return true;
    }
    return false;
  },
};

export default Mutation;
