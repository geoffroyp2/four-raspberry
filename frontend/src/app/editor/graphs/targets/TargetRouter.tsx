import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import { useNavigate, useParams } from "react-router-dom";
import { selectTargetData } from "../_state/targetDataSlice";

import TargetFetcher from "./TargetFetcher";

const TargetRouter: FC = () => {
  const params = useParams();
  const target = useSelector(selectTargetData);
  const navigate = useNavigate();

  useEffect(() => {
    if (params["*"] === "") {
      // If we are at /graphs/records => either load current record or go back if none selected
      if (target.id && target.id > 0) {
        navigate(`/${target.id}`);
      } else {
        navigate("../");
      }
    }
  }, [target, navigate, params]);

  return (
    <Routes>
      <Route path=":id" element={<TargetFetcher />} />
    </Routes>
  );
};

export default TargetRouter;
