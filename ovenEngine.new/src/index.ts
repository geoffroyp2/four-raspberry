const init = () => {
  console.log("Engine initialized");
};

const run = () => {};

const loopInterval = 200; // 200ms
const mainLoop = () => {
  run();
  setTimeout(mainLoop, loopInterval);
};

init();
mainLoop();
