import { PubSub } from "apollo-server-express";

import Target from "../../../database/models/target/target";
import { ResolverObjectType } from "../types";

import { lastCommand, liveValues } from "./utils/cachedValues";
import { isValidCommand } from "./utils/typeCheck";
import { CommandType, SensorUpdateType, statusUpdateType } from "./utils/types";

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
  /**
   * Called from the engine to update sensor values
   */
  updateSensors: (_, { time, oxygen, temperature }: SensorUpdateType) => {
    liveValues.refresh = false; // Always reset to false
    liveValues.programTime = time;
    liveValues.sensors = { oxygen, temperature };

    livePubSub.publish("LIVE", { live: liveValues });

    return true;
  },

  /**
   * called from the engine to update live status or targetID
   */
  updateStatus: (_, { status, targetId, recordId, monitoring, refresh }: statusUpdateType) => {
    let validUpdate = false;

    console.log({ status, targetId, recordId, monitoring, refresh });

    if (status === "start" || status === "stop" || status === "pause") {
      liveValues.status = status;
      validUpdate = true;
    }

    if (targetId !== undefined) {
      liveValues.currentTargetId = targetId;
      validUpdate = true;
    }

    if (recordId !== undefined) {
      liveValues.currentRecordId = recordId;
      validUpdate = true;
    }

    if (monitoring !== undefined) {
      liveValues.monitoring = monitoring;
      validUpdate = true;
    }

    if (refresh !== undefined) {
      liveValues.refresh = refresh;
      validUpdate = true;
    } else {
      // Reset flag to false if nothing was passed
      liveValues.refresh = false;
      validUpdate = true;
    }

    if (validUpdate) {
      livePubSub.publish("LIVE", { live: liveValues });
    }

    return validUpdate;
  },

  /**
   * called from the frontend to trigger the selection of a new target
   */
  updateLiveTargetId: async (_, { targetId }) => {
    const target = await Target.findOne({ where: { id: targetId } });
    if (target) {
      lastCommand.name = "targetId";
      lastCommand.option = targetId;

      livePubSub.publish("COMMAND", { command: lastCommand });
      return true;
    }
    return false;
  },

  sendCommand: (_, { name, option }: CommandType) => {
    if (isValidCommand(name)) {
      lastCommand.name = name;
      lastCommand.option = option === undefined ? null : option;

      livePubSub.publish("COMMAND", { command: lastCommand });
      return true;
    }
    return false;
  },
};
