import engine from "./engine/engine";

const loopInterval = 1000; // 200ms

/**
 * Init function called once at program start
 */
const init = () => {
  console.log("Engine initialized");
};

/**
 * Main program loop continuously called
 */
const mainLoop = () => {
  engine.run();
  setTimeout(mainLoop, loopInterval);
};

init();
mainLoop();
