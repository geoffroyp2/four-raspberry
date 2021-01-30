import { isValidObjectId } from "mongoose";

/**
 * Receives a string and evaluates if it can be fed to Mongoose's findByID()
 * returns the same string or undefined if invalid (which will result in a null result when the database is queried)
 *
 * @param id the id to evaluate
 */

export const validateID = (id: string): string | undefined => {
  return isValidObjectId(id) ? id : undefined;
};
