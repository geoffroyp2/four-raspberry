import { FC, useEffect } from "react";
import { Route, Routes } from "react-router";
import { useNavigate, useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectFormulaData } from "./_state/formulaDataSlice";

import FormulaHome from "./FormulaHome";
import FormulaInfosPage from "./FormulaInfosPage";

const FormulaRouter: FC = () => {
  const params = useParams();
  const navigate = useNavigate();

  const formula = useSelector(selectFormulaData);

  useEffect(() => {
    if (params["*"] === "back") {
      // We're coming from the same tab, stay at FormulaHome
      navigate("/formulas", { replace: true });
    } else if (params["*"] === "banner") {
      if (formula.id && formula.id > 0) {
        // We're coming from the banner, if a formula is already loaded, go there
        navigate(`/formulas/${formula.id}`, { replace: true });
      } else {
        navigate("/formulas", { replace: true });
      }
    } else if (isNaN(+params["*"])) {
      // If id is invalid
      navigate("/formulas", { replace: true });
    }
  }, [params, navigate, formula]);

  return (
    <Routes>
      <Route path="*" element={<FormulaHome />} />
      <Route path=":id" element={<FormulaInfosPage />} />
    </Routes>
  );
};

export default FormulaRouter;
