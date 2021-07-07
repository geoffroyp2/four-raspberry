import { FC } from "react";
import { useNavigate } from "react-router";

import { useSelector } from "react-redux";
import { selectRecordPreviewLoadId } from "../_state/recordDisplaySlice";

import BasicButton from "@components/buttons/BasicButton";
import ArrowRight from "@components/svg/ArrowRight";

const RecordLoadButtons: FC = () => {
  const navigate = useNavigate();
  const recordId = useSelector(selectRecordPreviewLoadId);

  const open = () => {
    navigate(`/graphs/records/${recordId}`);
  };

  return (
    <div className="flex justify-end">
      <BasicButton color="teal" onClick={open} disabled={recordId === null}>
        Ouvrir
        <ArrowRight size={16} className="ml-2" />
      </BasicButton>
    </div>
  );
};

export default RecordLoadButtons;
