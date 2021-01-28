import { gql } from "apollo-server-express";
import piece from "./piece";

import record from "./record";
import shared from "./shared";
import target from "./target";

/**
 * The root Query and Mutation interfaces are defined in target
 * After that, the other typeDefs are only extending already existing types and interfaces
 */

export default [target, record, piece, shared];
