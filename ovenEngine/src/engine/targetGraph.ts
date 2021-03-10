import engine from "./engine";

import { GQLQuery } from "../network/GQLClient";

import { getTargetQuery } from "../utils/queries";
import { isTargetQueryRes } from "../utils/typeCheck";
import { targetValues } from "./sensorValues";

/**
 * Handles the API call to update the loaded graph
 * @param id the targetId
 */
export const loadTarget = async (id: number) => {
  const targetQueryRes = await GQLQuery(getTargetQuery(id));

  if (isTargetQueryRes(targetQueryRes.data)) {
    const results = targetQueryRes.data.targets.rows;
    if (results[0]) {
      engine.target = results[0];
      console.log(`Loaded new target ${engine.target.name} (id: ${engine.target.id})`);
    } else {
      console.error("could not load target");
    }
  }
};

/**
 * TargetValues are calculated by interpolation of the loaded graph
 */
export const refreshTargetValues = () => {
  if (engine.target.points) {
    const points = engine.target.points;
    const time = Math.floor(engine.runTotalTime / 1000); // in seconds

    // find index for current time
    let idx = 1;
    for (; idx < points.length; idx++) {
      if (points[idx].time > time) break;
    }

    // calculate interpolation
    const pente = (points[idx].temperature - points[idx - 1].temperature) / (points[idx].time - points[idx - 1].time);
    const yOrigine = points[idx].temperature - pente * points[idx].time;
    targetValues.temperature = time * pente + yOrigine;
  }
};
