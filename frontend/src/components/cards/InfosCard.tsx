import { FC, useState } from "react";

import BasicMainCard from "./BasicMainCard";
import EditIcon from "@components/svg/EditIcon";
import ConfirmIcon from "@components/svg/ConfirmIcon";
import CancelIcon from "@components/svg/CancelIcon";
import GotoIcon from "@components/svg/GotoIcon";

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
  defaultContent: React.ReactNode;
  editContent?: React.ReactNode;
  confirmChange?: () => void;
  discardChange?: () => void;
  link?: () => void;
  unlink?: () => void;
  goto?: () => void;
  gotoColor?: string;
};

export const InfosCardField: FC<Props> = ({
  label,
  defaultContent,
  editContent,
  confirmChange,
  discardChange,
  link,
  unlink,
  goto,
  gotoColor,
}) => {
  const [EditMode, setEditMode] = useState<boolean>(false);

  return (
    <>
      <span className={`leading-relaxed text-blue-400 col-start-1`}>{label}</span>
      <span className={`leading-relaxed col-start-2 flex items-center gap-x-4`}>
        {EditMode ? (
          editContent
        ) : (
          <>
            {defaultContent}
            {goto && <GotoIcon onClick={goto} color={gotoColor} />}
          </>
        )}
      </span>
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
      {!editContent && (
        <span className={`col-start-3 flex items-center justify-end gap-x-2`}>
          {unlink && <CancelIcon onClick={unlink} />}
          {link && <EditIcon onClick={link} />}
        </span>
      )}
    </>
  );
};
