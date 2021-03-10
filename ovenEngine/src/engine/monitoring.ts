import engine from "./engine";
import { client } from "../network/GQLClient";
import { updateStatusQuery } from "../utils/queries";

export const toggleMonitoring = (flag: number | null) => {
  if (flag === null) {
    console.error("Monitoring flag needs to be a present");
    return;
  }

  engine.liveMonitoring = flag !== 0;
  client.mutate({ mutation: updateStatusQuery({ monitoring: engine.liveMonitoring }) });
};
