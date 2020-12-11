import React, { useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { initGraphs } from "@redux/graphSlice";

import db from "@db/handler";

import LoadingScreen from "./Generic/LoadingScreen";
import { screenSelect } from "@redux/UIControlsSlice";
import ProgramInfo from "@UIBrowser/ProgramInfo";
import ProgramRun from "@UIRun/ProgramRun";

const appStyle: React.CSSProperties = {
  backgroundColor: "#424242",
  display: "flex",
  width: "100%",
  height: "100%",
};

const Four = () => {
  // Load the graphs from the db once at program start
  const dispatch = useDispatch();
  const screen = useSelector(screenSelect);
  const [Loading, setLoading] = useState<boolean>(true);
  const [CreatedOne, setCreatedOne] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    await db.getAllGraphs().then((res) => {
      if (res.length > 0) {
        dispatch(initGraphs(res));
        setLoading(false);
      } else {
        if (!CreatedOne) {
          console.log("No data, trying to create a graph...");
          setCreatedOne(true);
          // await db.createNewGraph().then((res: Graph) => {
          //   dispatch(initGraphs([res]));
          //   setLoading(false);
          // });
        } else {
          console.log("No answer, retrying to connect...");
          setTimeout(() => {
            fetchData();
          }, 15000);
        }
      }
    });
  }, [dispatch, CreatedOne]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div style={appStyle}>
      <Container fluid className="p-1 m-0 w-100 h-100">
        {Loading ? <LoadingScreen /> : screen === "browse" ? <ProgramInfo /> : <ProgramRun />}
      </Container>
    </div>
  );
};

export default Four;
