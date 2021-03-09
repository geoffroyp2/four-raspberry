import Engine from "./engine/engine";

const engine = new Engine();

const init = () => {
  console.log("Engine initialized");
};

const loopInterval = 1000; // 200ms
const mainLoop = () => {
  engine.run();
  setTimeout(mainLoop, loopInterval);
};

init();
mainLoop();
