import React, { FC, useCallback, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { selectTargetLoadRowSelected } from "@editor/target/_state/targetDisplaySlice";
import { setLoadTable } from "@editor/_state/editorSlice";

import { subscribe } from "./utils/subscription";
import { updateTargetId } from "./utils/mutations";

import TargetLoadTable from "@editor/target/TargetLoadTable";
import LiveGraph from "./LiveGraph";
import LiveInfos from "./LiveInfos";
import LiveButtons from "./LiveButtons";

const LiveScreen: FC = () => {
  const dispatch = useDispatch();
  const rowSelected = useSelector(selectTargetLoadRowSelected);

  useEffect(() => {
    subscribe();
  }, []);

  const handleSelect = useCallback(async () => {
    await updateTargetId(rowSelected);
    dispatch(setLoadTable({ target: false }));
  }, [rowSelected, dispatch]);

  return (
    <>
      <LiveButtons />
      <LiveInfos />
      <LiveGraph />

      <TargetLoadTable select={handleSelect} />
    </>
  );
};

export default LiveScreen;
