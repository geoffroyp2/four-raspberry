import { Op } from "sequelize";

import Record from "../../../database/models/record/record";
import Piece from "../../../database/models/piece/piece";
import Target, { OvenType } from "../../../database/models/target/target";
import RecordPoint from "../../../database/models/record/recordPoints";

import { ColorType, GQLGenericResearchFields, GQLRecordPointType, TimeRange } from "../types";
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
   * Returns the points that belong to the Record
   * @param parent The Record
   * @param start The start of the time range, minimum 0
   * @param end The end of the time range, between start and MAX_SAFE_INTEGER
   * @param amount The amount of points to return, mininmum 2, maximum the amount of points in specified range
   * @return a specified amount of points in time range [start, end] in seconds
   */
  points: async (parent: Record, { start, end, amount }: TimeRange): Promise<GQLRecordPointType[]> => {
    // find min and max boundaries
    const min = (start && Math.max(start, 0)) || 0;
    const max = (end && Math.max(Math.min(end, Number.MAX_SAFE_INTEGER), min)) || Number.MAX_SAFE_INTEGER;

    // Query for all the points in range
    const points = await RecordPoint.findAll({
      where: { recordId: parent.id, time: { [Op.between]: [min, max] } },
      order: [["time", "ASC"]],
    });

    // Filter for the amount of points to keep
    const interval = amount ? Math.max((points.length - 2) / (amount - 2), 1) : 1;
    const lastIndex = points.length - 1;
    let pointAmount = 0;

    return points
      .filter((p, idx) => {
        // keep 1st && last point && points spread evenly
        if (idx === 0 || idx === lastIndex || idx === Math.round(interval * pointAmount)) {
          pointAmount++;
          return true;
        }
        return false;
      })
      .map((p) => ({
        id: p.id,
        time: p.time,
        temperature: p.temperature,
        oxygen: p.oxygen,
      }));
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
