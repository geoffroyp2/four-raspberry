import React, { useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import { useDispatch } from "react-redux";

import LoadingScreen from "./Generic/LoadingScreen";
import MainZone from "./Main/MainZone";

// import { loadData } from "@UIutils/loadData";
import { loadAllData } from "@redux/dataReducers/dbDataSlice";
import { loadReference } from "@redux/dataReducers/referenceSlice";
import db from "@db/handler";

const appStyle: React.CSSProperties = {
  backgroundColor: "#424242",
  display: "flex",
  width: "100%",
  height: "100%",
};

const Four = () => {
  // Load all data at program start
  // TODO: load when needed
  const [Loading, setLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    await db.all.getAll();
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div style={appStyle}>
      <Container fluid className="p-1 m-0 w-100 h-100">
        {Loading ? <LoadingScreen /> : <MainZone />}
      </Container>
    </div>
  );
};

export default Four;
