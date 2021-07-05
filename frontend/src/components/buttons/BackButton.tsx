import { FC } from "react";

import BasicButton from "./BasicButton";
import ArrrowLeft from "@components/svg/ArrowLeft";

type Props = {
  onClick: () => void;
};

const BackButton: FC<Props> = ({ onClick }) => {
  return (
    <BasicButton onClick={onClick} color="teal">
      <ArrrowLeft size={16} className="mr-2" />
      Retour
    </BasicButton>
  );
};

export default BackButton;
