import { FC, useState } from "react";

import EditIcon from "@components/svg/EditIcon";
import ConfirmIcon from "@components/svg/ConfirmIcon";
import CancelIcon from "@components/svg/CancelIcon";
import BasicMainCard from "./BasicMainCard";

const InfosCard: FC = ({ children }) => {
  return (
    <BasicMainCard>
      <div className="p-6 body-font text-gray-100 grid grid-cols-field-button gap-x-4 gap-y-1">{children}</div>
    </BasicMainCard>
  );
};

export default InfosCard;

type Props = {
  label: string;
  defaultContent: JSX.Element | string;
  editContent?: JSX.Element;
  confirmChange?: () => void;
  discardChange?: () => void;
};

export const InfosCardField: FC<Props> = ({ label, defaultContent, editContent, confirmChange, discardChange }) => {
  const [EditMode, setEditMode] = useState<boolean>(false);

  return (
    <>
      <span className={`leading-relaxed text-blue-400 col-start-1`}>{label}</span>
      <span className={`leading-relaxed col-start-2`}>{EditMode ? editContent : defaultContent}</span>
      {editContent && confirmChange && discardChange && (
        <span className={`col-start-3 flex items-center justify-end gap-x-2`}>
          {EditMode ? (
            <>
              <ConfirmIcon
                onClick={() => {
                  confirmChange();
                  setEditMode(false);
                }}
              />
              <CancelIcon
                onClick={() => {
                  discardChange();
                  setEditMode(false);
                }}
              />
            </>
          ) : (
            <EditIcon onClick={() => setEditMode(true)} />
          )}
        </span>
      )}
    </>
  );
};
