import { allMethods } from "./handlerMethods/all";
import { chemicalMethods } from "./handlerMethods/chemical";
import { formulaMethods } from "./handlerMethods/formula";
import { pieceMethods } from "./handlerMethods/piece";
import { recordMethods } from "./handlerMethods/record";
import { referenceMethods } from "./handlerMethods/reference";

/**
 * @const db is a collection of methods that abstract the calls to the database
 * there are 6 collections, each containing similar methods and some specific to a collection
 */

const db = {
  all: { ...allMethods },
  chemical: { ...chemicalMethods },
  formula: { ...formulaMethods },
  piece: { ...pieceMethods },
  record: { ...recordMethods },
  reference: { ...referenceMethods },
};

export default db;
