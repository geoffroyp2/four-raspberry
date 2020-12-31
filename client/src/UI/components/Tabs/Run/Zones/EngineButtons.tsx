import engine from "@engine/handler";
import { engineReference, engineState, updateEngineState } from "@redux/dataReducers/engineDataSlice";
import { setLoadTableContent, setLoadTableShow } from "@redux/displayStateReducers/generalDisplaySlice";
import LoadButton from "@UITabs/sharedComponents/Buttons/LoadButton";
import React, { useCallback } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const EngineButtons = () => {
  const dispatch = useDispatch();
  const state = useSelector(engineState);
  const reference = useSelector(engineReference);

  const handleLoad = useCallback(() => {
    dispatch(setLoadTableContent("Reference"));
    dispatch(setLoadTableShow(true));
  }, [dispatch]);

  const handleStart = useCallback(async () => {
    if (state.status === "stop") {
      const newState = await engine.start();
      dispatch(updateEngineState(newState));
    } else if (state.status === "pause") {
      const newState = await engine.unpause();
      dispatch(updateEngineState(newState));
    }
  }, [state, dispatch]);

  const handleStop = useCallback(async () => {
    const newState = await engine.stop();
    dispatch(updateEngineState(newState));
  }, [dispatch]);

  const handlePause = useCallback(async () => {
    const newState = await engine.pause();
    dispatch(updateEngineState(newState));
  }, [dispatch]);

  const handleConnect = useCallback(async () => {
    await engine.reconnect();
    // dispatch(updateEngineState(newState));
  }, [dispatch]);

  return (
    <>
      <LoadButton clickCallback={handleLoad} disabled={state.status === "pause" || state.status === "run"} />
      <Button onClick={handleConnect}>Connect</Button>
      <ButtonGroup className="float-right">
        {state.status === "stop" || state.status === "pause" ? (
          <Button onClick={handleStart} className="btn-lg btn-success" disabled={reference._id === "default"}>
            Start
          </Button>
        ) : (
          <Button onClick={handlePause} className="btn-lg btn-warning" disabled={reference._id === "default"}>
            Pause
          </Button>
        )}
        <Button onClick={handleStop} className="btn-lg btn-danger" disabled={reference._id === "default"}>
          Stop
        </Button>
      </ButtonGroup>
    </>
  );
};

export default EngineButtons;
