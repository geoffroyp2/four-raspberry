import BasicButton from "@buttons/BasicButton";
import ArrowRight from "@svg/ArrowRight";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { selectGraphLoadId } from "../_state/graphDisplaySlice";

const RecordLoadButtons = () => {
  const navigate = useNavigate();
  const { recordId } = useSelector(selectGraphLoadId);

  const open = () => {
    console.log(recordId);

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
