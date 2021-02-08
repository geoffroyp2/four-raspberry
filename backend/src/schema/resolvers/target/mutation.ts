import Target, { TargetCreationAttributes } from "../../../database/models/target/target";
import TargetPoint from "../../../database/models/target/targetPoints";

import {
  GQLTarget,
  GQLTargetId,
  GQLTargetPointCreate,
  GQLTargetPointDelete,
  GQLTargetPointUpdate,
  GQLTargetUpdate,
} from "../types";
import { colorToString } from "../../../utils/strings";

const Mutation = {
  /**
   * Creates a new Target in database
   * @param args optional arguments to be passed, all have default values
   * @return the new Target
   */
  createTarget: async (obj: any, { name, description, color, oven }: GQLTarget): Promise<Target> => {
    const args: TargetCreationAttributes = {
      name,
      description,
      color: colorToString(color),
      oven: oven && (oven === "gaz" || oven === "electrique") ? oven : "gaz",
    };
    return await Target.create(args);
  },

  /**
   * Deletes Target in database
   * @param targetId the id of the Target to select
   */
  deleteTarget: async (obj: any, { targetId }: GQLTargetId): Promise<boolean> => {
    const result = await Target.destroy({ where: { id: targetId } });
    return result > 0;
  },

  /**
   * Selects a Target by id and updates specified fields
   * @param targetId the id of the Target to select
   * @param args the fields to update
   * @return the updated Target or null if not in database
   */
  updateTarget: async (
    obj: any,
    { targetId, name, description, color, oven }: GQLTargetUpdate
  ): Promise<Target | null> => {
    const target = await Target.findOne({ where: { id: targetId } });
    if (target) {
      if (name) target.set({ name });
      if (description) target.set({ description });
      if (color) target.set({ color: colorToString(color) });
      if (oven && (oven === "gaz" || oven === "electrique")) target.set({ oven });

      return await target.save();
    }
    return null;
  },

  /**
   * Creates a Point on the selected Target
   * @param targetId the id of the Target
   * @param args the fields of the point
   */
  createTargetPoint: async (
    obj: any,
    { targetId, time, temperature, oxygen }: GQLTargetPointCreate
  ): Promise<TargetPoint | null> => {
    const target = await Target.findOne({ where: { id: targetId } });
    if (target) {
      return await target.createPoint({ time, temperature, oxygen });
    }
    return null;
  },

  /**
   * Select a target and one of its Points and deletes the Point
   * @return false si Target n'existe pas ou le point n'est pas associé à la Target
   * @param targetId the id of the Target
   * @param pointId the id of the Point
   */
  deleteTargetPoint: async (obj: any, { targetId, pointId }: GQLTargetPointDelete): Promise<boolean> => {
    const target = await Target.findOne({ where: { id: targetId } });
    const point = await TargetPoint.findOne({ where: { targetId: targetId, id: pointId } });
    if (target && point) {
      const result = await point.destroy();
      return true;
    }
    return false;
  },

  /**
   *
   * @param targetId the id of the Target
   * @param pointId the id of the Point
   * @param args the fields of the point
   * @return the Point after update or null if it does not exist
   */
  updateTargetPoint: async (
    obj: any,
    { targetId, pointId, time, temperature, oxygen }: GQLTargetPointUpdate
  ): Promise<TargetPoint | null> => {
    const target = await Target.findOne({ where: { id: targetId } });
    const point = await TargetPoint.findOne({ where: { targetId: targetId, id: pointId } });
    if (target && point) {
      if (time) point.set({ time });
      if (temperature) point.set({ temperature });
      if (oxygen) point.set({ oxygen });
      return await point.save();
    }
    return null;
  },
};

export default Mutation;