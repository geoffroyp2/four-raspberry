import Record from "../../../database/models/record/record";
import Piece from "../../../database/models/piece/piece";
import Target, { OvenType } from "../../../database/models/target/target";

import { ColorType, GQLGenericResearchFields } from "../types";
import { stringToColor } from "../../../utils/strings";

const Attribute = {
  /**
   * @param parent the Record
   * @return the Target linked with the Record or null if no link
   */
  target: async (parent: Record): Promise<Target | null> => {
    return await Target.findOne({ where: { id: parent.targetId } });
  },

  /**
   * @param parent the Record
   * @param id id filter @param name name filter
   * @return the Pieces linked to the parent Record
   */
  pieces: async (parent: Record, { id, name }: GQLGenericResearchFields): Promise<Piece[]> => {
    const pieces = await parent.getPieces();
    return pieces
      .filter((e) => (id && e.id === id) || (name && e.name === name) || (!id && !name))
      .sort((a, b) => a.id - b.id);
  },

  /**
   * @param parent the Record
   * @return the oven of the linked Target or null if no linked Target
   */
  oven: async (parent: Record): Promise<OvenType | null> => {
    const target = await Target.findOne({ where: { id: parent.targetId } });
    if (target) {
      return target.oven;
    }
    return null;
  },

  /**
   * @param parent The Record
   * @return the Record's color {r, g, b, a}
   */
  color: (parent: Record): ColorType => {
    return stringToColor(parent.color);
  },

  /**
   * @param parent The Record
   * @return the Record's creation Date string
   */
  createdAt: (parent: Record): string => {
    return new Date(parent.createdAt).toISOString();
  },

  /**
   * @param parent The Record
   * @return the Record's update Date string
   */
  updatedAt: (parent: Record): string => {
    return new Date(parent.updatedAt).toISOString();
  },
};

export default Attribute;
