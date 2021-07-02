import { FC } from "react";
import { useNavigate } from "react-router";

import { useSelector } from "react-redux";
import { selectFormulaLoadId } from "./_state/formulaDisplaySlice";

import BasicButton from "@components/buttons/BasicButton";
import ArrowRight from "@components/svg/ArrowRight";

const FormulaLoadButtons: FC = () => {
  const navigate = useNavigate();
  const formulaId = useSelector(selectFormulaLoadId);

  const open = () => {
    navigate(`${formulaId}`);
  };

  return (
    <div className="flex justify-end">
      <BasicButton color="teal" onClick={open} disabled={formulaId === null}>
        Ouvrir
        <ArrowRight size={16} className="ml-2" />
      </BasicButton>
    </div>
  );
};

export default FormulaLoadButtons;
