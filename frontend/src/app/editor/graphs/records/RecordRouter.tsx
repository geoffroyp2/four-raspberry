import { FC, useEffect } from "react";
import { Route, Routes } from "react-router";
import { useNavigate, useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectRecordData } from "../_state/recordDataSlice";

import RecordInfosPage from "./RecordInfosPage";

const RecordRouter: FC = () => {
  const params = useParams();
  const record = useSelector(selectRecordData);
  const navigate = useNavigate();

  useEffect(() => {
    if (params["*"] === "") {
      // If we are at /graphs/records => either load current record or go back if none selected
      if (record.id && record.id > 0) {
        navigate(`/graphs/records/${record.id}`);
      } else {
        navigate("/graphs");
      }
    } else if (isNaN(+params["*"])) {
      // If id is invalid
      navigate("/graphs", { replace: true });
    }
  }, [record, navigate, params]);

  return (
    <Routes>
      <Route path=":id" element={<RecordInfosPage />} />
    </Routes>
  );
};

export default RecordRouter;
