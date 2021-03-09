import { PubSub } from "apollo-server-express";
import Target from "../../../database/models/target/target";
import { ResolverObjectType } from "../types";
import { lastCommand, CommandValuesType, liveValues, SensorValuesType, SensorUpdateType } from "./liveValues";

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
  updateSensors: (_, { time, oxygen, temperature }: SensorUpdateType) => {
    liveValues.programTime = time;
    liveValues.sensors = { oxygen, temperature };
    livePubSub.publish("LIVE", { live: liveValues });
    return true;
  },

  updateStatus: (_, { status }) => {
    if (status === "start" || status === "stop" || status === "pause") {
      liveValues.status = status;
      lastCommand.status = status;
      livePubSub.publish("LIVE", { live: liveValues });
      livePubSub.publish("COMMAND", { command: lastCommand });
      return true;
    }
    return false;
  },

  updateLiveTargetId: async (_, { targetId }) => {
    const target = await Target.findOne({ where: { id: targetId } });
    if (target) {
      liveValues.currentTargetId = target.id;
      lastCommand.targetId = targetId;
      livePubSub.publish("LIVE", { live: liveValues });
      livePubSub.publish("COMMAND", { command: lastCommand });
      return true;
    }
    return false;
  },

  sendCommand: (_, { command }) => {
    livePubSub.publish("COMMAND", { command });
    return true;
  },
};
