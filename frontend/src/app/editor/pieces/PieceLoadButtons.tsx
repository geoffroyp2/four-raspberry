import { FC } from "react";
import { useNavigate } from "react-router";

import { useSelector } from "react-redux";
import { selectPieceLoadId } from "./_state/pieceDisplaySlice";

import BasicButton from "@components/buttons/BasicButton";
import ArrowRight from "@components/svg/ArrowRight";

const PieceLoadButtons: FC = () => {
  const navigate = useNavigate();
  const pieceId = useSelector(selectPieceLoadId);

  const open = () => {
    navigate(`/pieces/${pieceId}`);
  };

  return (
    <div className="flex justify-end">
      <BasicButton color="teal" onClick={open} disabled={pieceId === null}>
        Ouvrir
        <ArrowRight size={16} className="ml-2" />
      </BasicButton>
    </div>
  );
};

export default PieceLoadButtons;
