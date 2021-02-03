import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setRecordData } from "./state/recordDataSlice";
import { fetchRecord } from "./state/request";

import RecordInfos from "./RecordInfos";
import RecordButtons from "./RecordButtons";
import RecordLoadTable from "./RecordLoadTable";

const RecordEditor = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchRecord(1);
      console.log(data);
      dispatch(setRecordData(data.records.rows[0]));
    };
    fetch();
  }, [dispatch]);

  return (
    <Container fluid className="mt-2">
      <RecordButtons />
      <RecordInfos />
      <RecordLoadTable />
    </Container>
  );
};

export default RecordEditor;
