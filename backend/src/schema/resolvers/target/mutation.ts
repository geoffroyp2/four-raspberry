import Target, { TargetCreationAttributes } from "../../../database/models/target/target";
import TargetPoint from "../../../database/models/target/targetPoints";

import {
  GQLTarget,
  GQLTargetId,
  GQLTargetPointCreate,
  GQLTargetPointDelete,
  GQLTargetPointUpdate,
  GQLTargetUpdate,
  ResolverObjectType,
} from "../types";
import { colorToString } from "../../../utils/strings";
import { DataLoadersType } from "../../dataLoaders";

/**
 * clears the cache from the loaders that are linked to the id
 */
const clearTargetLoaders = (loaders: DataLoadersType, targetId: number) => {
  loaders.targetLoader.clear(targetId);
  loaders.targetRecordListLoader.clear(targetId);
};

const Mutation: ResolverObjectType = {
  /**
   * Creates a new Target in database
   * @param args optional arguments to be passed, all have default values
   * @return the new Target
   */
  createTarget: async (_, { name, description, color, oven }: Partial<GQLTarget>): Promise<Target> => {
    const args: TargetCreationAttributes = {
      name: name || "Sans Nom",
      description: description || "",
      color: colorToString(color),
      oven: oven && (oven === "gaz" || oven === "electrique") ? oven : "gaz",
    };
    return Target.create(args);
  },

  /**
   * Deletes Target in database
   * @param targetId the id of the Target to select
   */
  deleteTarget: async (_, { targetId }: GQLTargetId, loaders): Promise<boolean> => {
    clearTargetLoaders(loaders, targetId);

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
    _,
    { targetId, name, description, color, oven }: GQLTargetUpdate,
    loaders
  ): Promise<Target | null> => {
    const target = await Target.findOne({ where: { id: targetId } });
    if (target) {
      clearTargetLoaders(loaders, targetId);

      if (name) target.set({ name });
      if (description) target.set({ description });
      if (color) target.set({ color: colorToString(color) });
      if (oven && (oven === "gaz" || oven === "electrique")) target.set({ oven });

      return target.save();
    }
    return null;
  },

  /**
   * Creates a Point on the selected Target
   * @param targetId the id of the Target
   * @param args the fields of the point
   */
  createTargetPoint: async (
    _,
    { targetId, time, temperature, oxygen }: GQLTargetPointCreate
  ): Promise<TargetPoint | null> => {
    const target = await Target.findOne({ where: { id: targetId } });
    if (target) {
      return target.createPoint({ time, temperature, oxygen });
    }
    return null;
  },

  /**
   * Select a target and one of its Points and deletes the Point
   * @return false si Target n'existe pas ou le point n'est pas associé à la Target
   * @param targetId the id of the Target
   * @param pointId the id of the Point
   */
  deleteTargetPoint: async (_, { targetId, pointId }: GQLTargetPointDelete): Promise<boolean> => {
    const target = await Target.findOne({ where: { id: targetId } });
    const point = await TargetPoint.findOne({ where: { targetId: targetId, id: pointId } });
    if (target && point) {
      await point.destroy();
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
    _,
    { targetId, pointId, time, temperature, oxygen }: GQLTargetPointUpdate
  ): Promise<TargetPoint | null> => {
    const target = await Target.findOne({ where: { id: targetId } });
    const point = await TargetPoint.findOne({ where: { targetId: targetId, id: pointId } });
    if (target && point) {
      if (time) point.set({ time });
      if (temperature) point.set({ temperature });
      if (oxygen) point.set({ oxygen });
      return point.save();
    }
    return null;
  },
};

export default Mutation;
