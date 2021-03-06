import { Op } from "sequelize";

import Target from "../../../database/models/target/target";
import Record from "../../../database/models/record/record";
import Piece from "../../../database/models/piece/piece";
import TargetPoint from "../../../database/models/target/targetPoints";

import { ColorType, GQLGenericResearchFields, GQLTargetPointType, ResolverObjectType, TimeRange } from "../types";
import { stringToColor } from "../../../utils/strings";
import { getEvenlySpacedEntries } from "../../../utils/arrays";

const Attribute: ResolverObjectType = {
  /**
   * @param parent the Target
   * @param id id filter @param name name filter
   * @return the Records linked to the Parent Target
   */
  records: async (
    parent: Target,
    { id, name }: GQLGenericResearchFields,
    { targetRecordListLoader }
  ): Promise<Record[] | null> => {
    const records = await targetRecordListLoader.load(parent.id);
    return records.filter((e) => (!id && !name) || (id && e.id === id) || (name && e.name === name));
  },

  /**
   * @param parent the Target
   * @param id id filter @param name name filter
   * @return the Pieces linked to the parent Target through Records
   */
  pieces: async (
    parent: Target,
    { id, name }: GQLGenericResearchFields,
    { recordPieceListLoader }
  ): Promise<Piece[]> => {
    const records = await parent.getRecords();

    // To filter duplicates
    const pieces: { [key: number]: Piece } = {};

    await Promise.all(
      records.map(async (r) => {
        const result = await recordPieceListLoader.load(r.id);
        result.forEach((p) => {
          if ((!id && !name) || (id && p.id === id) || (name && p.name === name)) pieces[p.id] = p;
        });
      })
    );

    return Object.values(pieces).sort((a, b) => a.id - b.id);
  },

  /**
   * Returns the points that belong to the Target
   * @param parent The Target
   * @param start The start of the time range, minimum 0
   * @param end The end of the time range, between start and MAX_SAFE_INTEGER
   * @param amount The amount of points to return, mininmum 2, maximum the amount of points in specified range
   * @return a specified amount of points in time range [start, end] in seconds
   */
  points: async (parent: Target, { start, end, amount }: TimeRange): Promise<GQLTargetPointType[]> => {
    // find min and max boundaries
    const min = (start && Math.max(start, 0)) || 0;
    const max = (end && Math.max(Math.min(end, Number.MAX_SAFE_INTEGER), min)) || Number.MAX_SAFE_INTEGER;

    // Query for all the points in range
    const points = await TargetPoint.findAll({
      where: { targetId: parent.id, time: { [Op.between]: [min, max] } },
      order: [["time", "ASC"]],
    });

    // Only keep required amount
    const filteredPoints = getEvenlySpacedEntries(points, amount);

    return filteredPoints.map((p) => ({
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
