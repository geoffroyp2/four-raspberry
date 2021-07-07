import { FC } from "react";

import BasicButton from "./BasicButton";
import ArrowRight from "@components/svg/ArrowRight";

type Props = {
  onClick: () => void;
  disabled?: boolean;
};

const ForwardButton: FC<Props> = ({ onClick, disabled }) => {
  return (
    <BasicButton onClick={onClick} disabled={disabled} color="teal">
      Ouvrir
      <ArrowRight size={16} className="ml-2" />
    </BasicButton>
  );
};

export default ForwardButton;
