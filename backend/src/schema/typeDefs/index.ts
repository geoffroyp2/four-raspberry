import target from "./target";
import record from "./record";
import piece from "./piece";
import formula from "./formula";
import chemical from "./chemical";
import shared from "./shared";
import subscriptions from "./subscriptions";

/**
 * The root Query and Mutation interfaces are defined in target
 * After that, the other typeDefs are only extending already existing types and interfaces
 */

export default [target, record, piece, formula, chemical, shared, subscriptions];
