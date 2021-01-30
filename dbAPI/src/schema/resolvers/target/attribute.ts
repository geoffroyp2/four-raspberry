import { Op } from "sequelize";

import Target from "../../../database/models/target/target";
import Record, { RecordAttributes } from "../../../database/models/record/record";
import Piece, { PieceAttributes } from "../../../database/models/piece/piece";
import TargetPoint from "../../../database/models/target/targetPoints";

import { ColorType, TimeRangeType } from "../sharedTypes";
import { stringToColor } from "../../../utils/strings";

type GQLTargetPointType = {
  id: number;
  time: number;
  temperature: number;
  oxygen: number;
};

const Attribute = {
  /**
   * @param parent the Target
   * @param id id filter @param name name filter
   * @return the Records linked to the Parent Target
   */
  records: async (parent: Target, { id, name }: RecordAttributes): Promise<Record[]> => {
    const records = await parent.getRecords();
    return records
      .filter((e) => (id && e.id === id) || (name && e.name === name) || (!id && !name))
      .sort((a, b) => a.id - b.id);
  },

  /**
   * @param parent the Target
   * @param id id filter @param name name filter
   * @return the Pieces linked to the parent Target through Records
   */

  pieces: async (parent: Target, { id, name }: PieceAttributes): Promise<Piece[]> => {
    const allPieces = new Set<Piece>();
    const records = await parent.getRecords();
    await Promise.all(
      records.map(async (r) => {
        const pieces = await r.getPieces();
        pieces.forEach((p) => allPieces.add(p));
      })
    );

    return [...allPieces.values()]
      .filter((e) => (id && e.id === id) || (name && e.name === name) || (!id && !name))
      .sort((a, b) => a.id - b.id);
  },

  /**
   * Returns the points that belong to the Target
   * @param parent The Target
   * @param start The start of the time range, minimum 0
   * @param end The end of the time range, between start and MAX_SAFE_INTEGER
   * @param amount The amount of points to return, mininmum 2, maximum the amount of points in specified range
   * @return a specified amount of points in time range [start, end] in seconds
   */
  points: async (parent: Target, { start, end, amount }: TimeRangeType): Promise<GQLTargetPointType[]> => {
    // find min and max boundaries
    const min = (start && Math.max(start, 0)) || 0;
    const max = (end && Math.max(Math.min(end && Number.MAX_SAFE_INTEGER)), min) || Number.MAX_SAFE_INTEGER;

    // Query for all the points in range
    const points = await TargetPoint.findAll({
      where: { targetId: parent.id, time: { [Op.between]: [min, max] } },
      order: [["time", "ASC"]],
    });

    // Filter for the amount of points to keep
    const interval = amount ? Math.max((points.length - 2) / (amount - 2), 1) : 1;
    const lastIndex = points.length - 1;
    let pointAmount = 0;

    return points
      .filter((p, idx) => {
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
   * @param parent The Target
   * @return the Target's color {r, g, b, a}
   */
  color: (parent: Target): ColorType => {
    return stringToColor(parent.color);
  },

  /**
   * @param parent The Target
   * @return the Target's creation Date string
   */
  createdAt: (parent: Target): string => {
    return new Date(parent.createdAt).toISOString();
  },

  /**
   * @param parent The Target
   * @return the Target's update Date string
   */
  updatedAt: (parent: Target): string => {
    return new Date(parent.updatedAt).toISOString();
  },
};

export default Attribute;
