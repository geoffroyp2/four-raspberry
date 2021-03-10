import { client } from "../network/GQLClient";
import { createRecordPointQuery, updateStatusQuery } from "../utils/queries";
import engine from "./engine";

export const writeNewPoint = async () => {
  if (engine.currentRecordId === null) {
    console.error("Can't create a new point because no Record is selected");
    return;
  }

  const res = await client.mutate<{ createRecordPoint: null }>({
    mutation: createRecordPointQuery(engine.currentRecordId, {
      time: Math.floor(engine.runTotalTime / 1000),
      temperature: engine.sensorValues.temperature,
      oxygen: engine.sensorValues.oxygen,
    }),
  });
  if (!res?.data) {
    console.error("Error recording a new Point");
    return;
  }

  engine.lastRecordDate = new Date().getTime();
  console.log("New Point Recorded");

  client.mutate({ mutation: updateStatusQuery({ refresh: true }) });
};
