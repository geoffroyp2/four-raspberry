import { PubSub } from "apollo-server-express";
import Target from "../../../database/models/target/target";
import { ResolverObjectType } from "../types";
import { liveValues, SensorValuesType } from "./liveValues";

const livePubSub = new PubSub();

export const engineSubscription = {
  live: {
    subscribe: () => livePubSub.asyncIterator(["LIVE"]),
  },
  command: {
    subscribe: () => livePubSub.asyncIterator(["COMMAND"]),
  },
};

export const engineMutation: ResolverObjectType = {
  updateSensors: (_, sensorValues: SensorValuesType) => {
    liveValues.sensors = { ...sensorValues };
    livePubSub.publish("LIVE", { live: liveValues });
    return true;
  },

  updateStatus: (_, { status }) => {
    if (status === "start" || status === "stop" || status === "pause") {
      liveValues.status = status;
      livePubSub.publish("LIVE", { live: liveValues });
      return true;
    }
    return false;
  },

  updateTargetId: async (_, { targetId }) => {
    const target = await Target.findOne({ where: { id: targetId } });
    if (target) {
      liveValues.currentTargetId = target.id;
      livePubSub.publish("LIVE", { live: liveValues });
      livePubSub.publish("COMMAND", { command: "updateTarget" });
      return true;
    }
    return false;
  },

  sendCommand: (_, { command }) => {
    livePubSub.publish("COMMAND", { command });
    return true;
  },
};
