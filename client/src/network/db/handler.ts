import { chemicalMethods } from "./handlerMethods/chemical";
import { formulaMethods } from "./handlerMethods/formula";
import { pieceMethods } from "./handlerMethods/piece";
import { recordMethods } from "./handlerMethods/record";
import { referenceMethods } from "./handlerMethods/reference";

const db = {
  all: {
    getData: async () => {},
  },
  chemical: { ...chemicalMethods },
  formula: { ...formulaMethods },
  piece: { ...pieceMethods },
  record: { ...recordMethods },
  reference: { ...referenceMethods },
};

export default db;
