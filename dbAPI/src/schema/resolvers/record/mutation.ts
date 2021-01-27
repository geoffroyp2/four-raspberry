import Record from "../../../database/models/record/model";
import { RecordAttributes } from "../../../database/models/record/types";
import Target from "../../../database/models/target/model";

type RTIDType = {
  recordId: { id: number };
  targetId: { id: number };
};

const Mutation = {
  createRecord: async (obj: any, args: RecordAttributes) => {
    return await Record.create(args);
  },

  deleteRecord: async (obj: any, args: RecordAttributes) => {
    const result = await Record.destroy({ where: args });
    return result > 0;
  },

  updateRecord: async (obj: any, { id, name, description }: RecordAttributes) => {
    const record = await Record.findOne({ where: { id } });
    if (record) {
      if (name) record.set({ name });
      if (description) record.set({ description });
      return await record.save();
    }
    return null;
  },

  addTargetToRecord: async (obj: any, { recordId, targetId }: RTIDType) => {
    const target = await Target.findOne({ where: targetId });
    const record = await Record.findOne({ where: recordId });
    if (record && target) {
      record.addTarget(target);
      return true;
    }
    return false;
  },

  removeTargetFromRecord: async (obj: any, { recordId, targetId }: RTIDType) => {
    const target = await Target.findOne({ where: targetId });
    const record = await Record.findOne({ where: recordId });
    if (record && target) {
      record.removeTarget(target);
      return true;
    }
    return false;
  },
};

export default Mutation;
