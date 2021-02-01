import { Chemical } from "../../models/chemical/types";
import { Formula } from "../../models/formula/types";
import { Piece } from "../../models/piece/types";
import { Record } from "../../models/record/types";
import { Reference } from "../../models/reference/types";

/**
 * @interface ResDataType the only body structure for the db response
 */

export interface ResDataType {
  chemical?: Chemical[];
  formula?: Formula[];
  piece?: Piece[];
  record?: Record[];
  reference?: Reference[];
}
