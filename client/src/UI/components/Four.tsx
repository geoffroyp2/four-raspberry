import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import LoadingScreen from "./Generic/LoadingScreen";
import MainZone from "./Main/MainZone";

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

  useEffect(() => {
    (async () => {
      await db.all.getAll();
      setLoading(false);
    })();
  }, []);

  return (
    <div style={appStyle}>
      <Container fluid className="p-1 m-0 w-100 h-100">
        {Loading ? <LoadingScreen /> : <MainZone />}
      </Container>
    </div>
  );
};

export default Four;
