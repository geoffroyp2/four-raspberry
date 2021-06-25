import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import { useNavigate, useParams } from "react-router-dom";
import { selectRecordData } from "../_state/recordDataSlice";

import RecordFetcher from "./RecordFetcher";

const RecordRouter: FC = () => {
  const params = useParams();
  const record = useSelector(selectRecordData);
  const navigate = useNavigate();

  useEffect(() => {
    if (params["*"] === "") {
      // If we are at /graphs/records => either load current record or go back if none selected
      if (record.id && record.id > 0) {
        navigate(`/${record.id}`);
      } else {
        navigate("../");
      }
    }
  }, [record, navigate, params]);

  return (
    <Routes>
      <Route path=":id" element={<RecordFetcher />} />
    </Routes>
  );
};

export default RecordRouter;
