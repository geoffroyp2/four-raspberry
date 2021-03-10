import engine from "./engine";

export const pStart = () => {
  if (engine.status === "stop") {
    engine.status = "start";
    engine.startDate = new Date().getTime();
    engine.runTotalTime = 0;
    engine.pauseTotalTime = 0;
    console.log("Program started");
  } else if (engine.status === "pause") {
    engine.status = "start";
    engine.pauseTotalTime += new Date().getTime() - engine.lastPauseDate;
    console.log("Program unpaused");
  }
};

export const pPause = () => {
  if (engine.status === "start") {
    engine.status = "pause";
    engine.lastPauseDate = new Date().getTime();
    console.log("Program paused");
  }
};

export const pStop = () => {
  if (engine.status === "start" || engine.status === "pause") {
    engine.status = "stop";
    console.log("Program stopped");
  }
};
