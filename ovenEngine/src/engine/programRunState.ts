import engine from "./engine";
import { client } from "../network/GQLClient";

import { Record } from "../types/APITypes";
import { getNewRecordAttributes } from "../utils/misc";
import { linkTargetRecordQuery, requestNewRecordQuery, updateRecordQuery, updateStatusQuery } from "../utils/queries";

export const pStart = async () => {
  if (engine.status === "stop") {
    if (!engine.target.id) {
      console.error("Needs to load a target first");
      return;
    }

    // 1. Create a new Record in the database
    const recordParams = getNewRecordAttributes();
    const res1 = await client.mutate<{ createRecord: Record }>({
      mutation: requestNewRecordQuery(recordParams),
    });
    if (!res1?.data?.createRecord?.id) {
      console.error("Could not create new Record");
      return;
    }
    const recordId = res1.data.createRecord.id;
    console.log(`Record ${recordId} created`);

    // 2. Link the new Record with the target Graph
    console.log(`linking to target ${engine.target.id}`);
    const res2 = await client.mutate<{ setRecordTarget: null }>({
      mutation: linkTargetRecordQuery(recordId, engine.target.id),
    });
    if (!res2?.data) {
      console.error("Could not link Record with Target");
      // return; ==> Keep Going ?
    } else {
      console.log(`Record ${recordId} linked to target ${engine.target.id}`);
    }
    engine.currentRecordId = recordId;

    // Start Program
    engine.status = "start";

    engine.startDate = new Date().getTime();
    engine.lastPauseDate = 0;
    engine.lastRecordDate = 0;

    engine.runTotalTime = 0;
    engine.pauseTotalTime = 0;

    console.log("Program started");

    // Send update
    client.mutate({ mutation: updateStatusQuery({ recordId: recordId, status: "start", targetId: engine.target.id }) });
  } else if (engine.status === "pause") {
    engine.status = "start";
    engine.pauseTotalTime += new Date().getTime() - engine.lastPauseDate;
    console.log("Program unpaused");

    client.mutate({ mutation: updateStatusQuery({ status: "start" }) });
  }
};

export const pPause = () => {
  if (engine.status === "start") {
    engine.status = "pause";
    engine.lastPauseDate = new Date().getTime();
    console.log("Program paused");

    client.mutate({ mutation: updateStatusQuery({ status: "pause" }) });
  }
};

export const pStop = async () => {
  if (engine.status === "start" || engine.status === "pause") {
    if (!engine.currentRecordId) {
      engine.status = "stop";
      console.error("No current Record, could not stop properly");

      client.mutate({ mutation: updateStatusQuery({ status: "stop" }) });
      return;
    }

    const res1 = await client.mutate<{ updateRecord: null }>({
      mutation: updateRecordQuery(engine.currentRecordId, { finished: true }),
    });
    if (!res1?.data) {
      console.error("Could not finish Record");
      // return;
    }

    engine.status = "stop";
    console.log("Program stopped");

    client.mutate({ mutation: updateStatusQuery({ status: "stop" }) });
  }
};
