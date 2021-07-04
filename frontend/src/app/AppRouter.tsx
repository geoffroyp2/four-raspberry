import { FC, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import Header from "./header/Header";
import LiveScreen from "./live/LiveScreen";
import GraphRouter from "@graphs/GraphRouter";
import PieceRouter from "./editor/pieces/PieceRouter";
import FormulaRouter from "./editor/formulas/FormulaRouter";

const AppRouter: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    // Automatically redirect to the "live" screen
    if (pathname === "/") navigate("/live", { replace: true });
  }, [pathname, navigate]);

  return (
    <>
      <Header />

      <div className="text-gray-100 p-1">
        <Routes>
          <Route path="live" element={<LiveScreen />} />
          <Route path="graphs/*" element={<GraphRouter />} />
          <Route path="pieces/*" element={<PieceRouter />} />
          <Route path="formulas/*" element={<FormulaRouter />} />
        </Routes>
      </div>
    </>
  );
};

export default AppRouter;
