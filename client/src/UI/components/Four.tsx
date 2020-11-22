import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import { useDispatch } from "react-redux";
import { initGraphs } from "../redux/reducers/graphs/graphSlice";

import db from "../../db/handler";
import { Graph } from "../../interfaces/Igraph";

import ScreenSelect from "./ScreenSelect";
import LoadingScreen from "./utils/LoadingScreen";

const Four = () => {
  // Load the graphs from the db once on program start

  const [Loading, setLoading] = useState<boolean>(true);

  const dispatch = useDispatch();
  useEffect(() => {
    db.getAllGraphs((res: Graph[]) => {
      dispatch(initGraphs(res));
      setLoading(false);
    });
  }, [dispatch]);

  return (
    <div
      style={{
        width: 1024,
        height: 600,
        borderColor: "#888888",
        color: "#CCCCCC",
        // Only for desktop version
        border: "solid",
        borderWidth: 1,
        margin: 20,
        backgroundColor: "#424242",
      }}
    >
      <Container fluid className="p-0 m-0 w-100 h-100">
        {Loading ? <LoadingScreen /> : <ScreenSelect />}
      </Container>
    </div>
  );
};

export default Four;
