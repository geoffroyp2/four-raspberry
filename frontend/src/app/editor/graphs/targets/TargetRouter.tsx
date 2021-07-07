import { FC, useEffect } from "react";
import { Route, Routes } from "react-router";
import { useNavigate, useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectTargetData } from "../_state/targetDataSlice";

import TargetInfosPage from "./TargetInfosPage";

const TargetRouter: FC = () => {
  const params = useParams();
  const target = useSelector(selectTargetData);
  const navigate = useNavigate();

  useEffect(() => {
    if (params["*"] === "") {
      // If we are at /graphs/targets => either load current record or go back if none selected
      if (target.id && target.id > 0) {
        navigate(`/graphs/targets/${target.id}`);
      } else {
        navigate("/graphs");
      }
    } else if (isNaN(+params["*"])) {
      // If id is invalid
      navigate("/graphs", { replace: true });
    }
  }, [target, navigate, params]);

  return (
    <Routes>
      <Route path=":id" element={<TargetInfosPage />} />
    </Routes>
  );
};

export default TargetRouter;
