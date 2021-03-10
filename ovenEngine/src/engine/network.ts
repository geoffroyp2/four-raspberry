import engine from "./engine";

import { pPause, pStart, pStop } from "./programRunState";
import { loadTarget } from "./targetGraph";

import { isCommandSubscribeRes } from "../utils/typeCheck";

/**
 * Callback to handle the data coming from the API subscription
 */
export const handleCommands = ({ data }: any) => {
  console.log(data);

  if (isCommandSubscribeRes(data)) {
    const command = data.command;

    switch (command.status) {
      case "start":
        pStart();
        break;
      case "pause":
        pPause();
        break;
      case "stop":
        pStop();
        break;
    }

    if (command.targetId > 0 && command.targetId !== engine.target.id) {
      loadTarget(command.targetId);
    }
  }
};

/**
 * Callback to handle the values sent by the 2nd RaspberryPI
 */
export const updateSensors = (values: any) => {
  // TODO
  // this.sensorValues = values;
  console.log(values);
};

/**
 * maybe called as a command to try to reconnect to the 2nd RaspberryPI
 */
export const reconnect = () => {
  console.log("trying to reconnect...");
  engine.wsin.connect();
  engine.wsout.connect();
};
