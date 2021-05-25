import { useNavigate } from "react-router";

import { useSelector } from "react-redux";
import { selectGraphLoadId } from "../_state/graphDisplaySlice";

import BasicButton from "@components/buttons/BasicButton";
import ArrowRight from "@components/svg/ArrowRight";

const RecordLoadButtons = () => {
  const navigate = useNavigate();
  const { recordId } = useSelector(selectGraphLoadId);

  const open = () => {
    navigate(`${recordId}`);
  };

  return (
    <div className="flex justify-end">
      <BasicButton color="teal" onClick={open}>
        Ouvrir
        <ArrowRight size={16} className="ml-2" />
      </BasicButton>
    </div>
  );
};

export default RecordLoadButtons;
