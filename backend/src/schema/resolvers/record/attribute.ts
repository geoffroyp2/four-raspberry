import { Op } from "sequelize";

import Record from "../../../database/models/record/record";
import Piece from "../../../database/models/piece/piece";
import Target, { OvenType } from "../../../database/models/target/target";
import RecordPoint from "../../../database/models/record/recordPoints";

import { ColorType, GQLGenericResearchFields, GQLRecordPointType, ResolverObjectType, TimeRange } from "../types";
import { stringToColor } from "../../../utils/strings";
import { getEvenlySpacedEntries } from "../../../utils/arrays";

const Attribute: ResolverObjectType = {
  /**
   * @param parent the Record
   * @return the Target linked with the Record or null if no link
   */
  target: async (parent: Record, _, { targetLoader }): Promise<Target | null> => {
    return parent.targetId ? targetLoader.load(parent.targetId) : null;
  },

  /**
   * @param parent the Record
   * @param id id filter @param name name filter
   * @return the Pieces linked to the parent Record
   */
  pieces: async (
    parent: Record,
    { id, name }: GQLGenericResearchFields,
    { recordPieceListLoader }
  ): Promise<Piece[]> => {
    const pieces = await recordPieceListLoader.load(parent.id);
    return pieces.filter((e) => (!id && !name) || (id && e.id === id) || (name && e.name === name));
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
   * @param parent the Record
   * @return the oven of the linked Target or null if no linked Target
   */
  oven: async (parent: Record, _: any, { targetLoader }): Promise<OvenType | null> => {
    return parent.targetId ? (await targetLoader.load(parent.targetId)).oven : null;
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
