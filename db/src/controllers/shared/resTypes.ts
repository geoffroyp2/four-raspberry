import { Chemical } from "../../models/chemical/types";
import { Formula } from "../../models/formula/types";
import { Piece } from "../../models/piece/types";
import { Record } from "../../models/record/types";
import { Reference } from "../../models/reference/types";

export interface ResDataType {
  chemical?: Chemical[];
  formula?: Formula[];
  piece?: Piece[];
  record?: Record[];
  reference?: Reference[];
}
