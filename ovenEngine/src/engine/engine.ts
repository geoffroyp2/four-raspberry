import { client, GQLSubscribe } from "../network/GQLClient";
import WSINClient from "../network/WSINClient";
import WSOUTClient from "../network/WSOUTClient";
import emul from "../comEmulation/emul";

import { refreshTargetValues } from "./targetGraph";
import { handleCommands, updateSensors } from "./network";

import { LiveStatusType, SensorValuesType, Target } from "../types/APITypes";
import { commandSubscriptionQuery, updateSensorsQuery } from "../utils/queries";
import { writeNewPoint } from "./recordedGraph";

class Engine {
  // status from api
  public target: Target = {}; // Current target Graph
  public currentRecordId: number | null = null; // Id assigned by the db for current program
  public liveMonitoring: boolean = false;

  // connection instances
  public wsin: WSINClient; // Sensor values coming from 2nd Rpi
  public wsout: WSOUTClient; // Target values sent to 2nd Rpi

  // internal program variables
  // Program status
  public status: LiveStatusType = "stop";

  // Time related
  public startDate = 0; // Start date in ms unix time
  public lastPauseDate = 0; // Last pause date in ms

  public recordInterval = 30000; // 30 seconds between db writes
  public lastRecordDate = 0; // Last point recorded in db

  public runTotalTime = 0; // Total run time in ms
  public pauseTotalTime = 0; // Total pause time in ms

  // Sensor values
  public targetValues: SensorValuesType = {
    oxygen: 0,
    temperature: 0,
  };
  public sensorValues: SensorValuesType = {
    oxygen: 0,
    temperature: 0,
  };

  /**
   * Initializes the connections with the API and the 2nd RaspberryPI
   */
  constructor() {
    GQLSubscribe(commandSubscriptionQuery, (data: any) => handleCommands(data));
    this.wsin = new WSINClient((data: any) => updateSensors(data));
    this.wsout = new WSOUTClient();
  }

  /**
   * Function called by the program main loop
   */
  public run() {
    this.sensorValues = emul.getSensorValues(this.runTotalTime);

    if (this.status === "start") {
      const now = new Date().getTime();
      this.runTotalTime = now - this.startDate + this.pauseTotalTime; // TODO : mode not to count pause time

      // 1. calculate target temperature and send it to wsout
      refreshTargetValues();
      emul.sendTarget(this.targetValues);
      // this.wsout.sendTemperature(this.targetValues.temperature);

      // 2. send current sensor values from wsin to API
      client.mutate({ mutation: updateSensorsQuery(this.sensorValues, this.runTotalTime) });

      // 3. If enough time has passed, record a new point
      const timeSinceLastRecord = now - this.lastRecordDate;
      if (timeSinceLastRecord > 30000) {
        writeNewPoint();
      }
    } else if (this.liveMonitoring) {
      // If the live monitoring has been toggled
      client.mutate({ mutation: updateSensorsQuery(this.sensorValues, this.runTotalTime) });
    }
  }
}

export default new Engine();
