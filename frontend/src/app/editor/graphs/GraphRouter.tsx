import { FC, useEffect } from "react";
import { Routes, Route, useParams, useNavigate } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import { selectGraphRoute, setGraphRoute } from "./_state/graphDisplaySlice";

import RecordRouter from "./records/RecordRouter";
import TargetRouter from "./targets/TargetRouter";
import GraphHome from "./GraphHome";

const GraphRouter: FC = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const graphRoute = useSelector(selectGraphRoute);
  const navigate = useNavigate();

  useEffect(() => {
    if (params["*"] !== graphRoute) {
      // if the url was manually changed, redirect to the new url and change the graphRoute
      if (params["*"] === "targets" || params["*"] === "records") {
        dispatch(setGraphRoute(params["*"]));
        navigate(params["*"], { replace: true });
      }
    }
  }, [params, graphRoute, navigate, dispatch]);

  return (
    <Routes>
      <Route path="*" element={<GraphHome />} />
      <Route path="targets/*" element={<TargetRouter />} />
      <Route path="records/*" element={<RecordRouter />} />
    </Routes>
  );
};

export default GraphRouter;
