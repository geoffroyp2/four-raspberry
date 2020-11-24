import React, { useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { initGraphs } from "../redux/reducers/graphSlice";

import db from "../../db/handler";
import { Graph } from "../../interfaces/Igraph";

import ScreenSelect from "./ScreenSelect";
import LoadingScreen from "./utils/LoadingScreen";
import { displaySize } from "../redux/reducers/UIControlsSlice";

const small: React.CSSProperties = {
  width: 1024,
  height: 600,
  borderColor: "#888888",
  color: "#CCCCCC",
  border: "solid",
  borderWidth: 1,
  margin: 20,
  backgroundColor: "#424242",
};

const large: React.CSSProperties = {
  backgroundColor: "#424242",
  display: "flex",
  width: "100%",
  height: "100%",
};

const Four = () => {
  // Load the graphs from the db once at program start
  const dispatch = useDispatch();
  const currentSize = useSelector(displaySize);
  const [Loading, setLoading] = useState<boolean>(true);
  const [CreatedOne, setCreatedOne] = useState<boolean>(false);

  const fetchData = useCallback(() => {
    db.getAllGraphs((res: Graph[]) => {
      if (res.length > 0) {
        dispatch(initGraphs(res));
        setLoading(false);
      } else {
        if (!CreatedOne) {
          console.log("No data, trying to create a graph...");
          setCreatedOne(true);
          db.createNewGraph({}, (res: Graph) => {
            dispatch(initGraphs([res]));
            setLoading(false);
          });
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
    <div style={currentSize ? small : large}>
      <Container fluid className="p-0 m-0 w-100 h-100">
        {Loading ? <LoadingScreen /> : <ScreenSelect />}
      </Container>
    </div>
  );
};

export default Four;
