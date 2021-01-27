import Record from "../database/models/record/model";
import Target from "../database/models/target/model";

export const queryTest = async () => {
  const rec = await Record.findOne({ where: { id: 1 } });

  const targets = await rec?.getTargets();
  targets?.forEach((t) => {
    console.log(t.id, t.name, t.description);
  });
};
