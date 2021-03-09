import state from "./state/currentTarget";

const init = () => {
  console.log("Engine initialized");
};

const run = () => {
  // console.log("looping");
};

const loopInterval = 200; // 200ms
const mainLoop = () => {
  run();
  setTimeout(mainLoop, loopInterval);
};

state.start();
init();
mainLoop();
