import React, { useCallback, useState } from "react";
import program from "../program-logic/program";

const ProgramButtons = () => {
  const [running, setRunning] = useState<boolean>(program.running);

  const start = useCallback(() => {
    program.start();
    setRunning(program.running);
  }, []);

  const pause = useCallback(() => {
    program.pause();
    setRunning(program.running);
  }, []);

  const stop = useCallback(() => {
    program.stop();
    setRunning(program.running);
  }, []);

  return (
    <div>
      <button onClick={running ? pause : start}>
        {running ? "pause" : "start"}
      </button>
      <button onClick={stop}>stop</button>
    </div>
  );
};

export default ProgramButtons;
