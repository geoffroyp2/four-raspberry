import { FC } from "react";
import { useNavigate } from "react-router";

import { useSelector } from "react-redux";
import { selectGraphLoadId } from "../_state/graphDisplaySlice";

import BasicButton from "@components/buttons/BasicButton";
import ArrowRight from "@components/svg/ArrowRight";

const TargetLoadButtons: FC = () => {
  const navigate = useNavigate();
  const { targetId } = useSelector(selectGraphLoadId);

  const open = () => {
    navigate(`targets/${targetId}`);
  };

  return (
    <div className="flex justify-end">
      <BasicButton color="teal" onClick={open} disabled={targetId === null}>
        Ouvrir
        <ArrowRight size={16} className="ml-2" />
      </BasicButton>
    </div>
  );
};

export default TargetLoadButtons;
