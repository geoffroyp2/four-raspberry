import { FC } from "react";

import BasicMainCard from "./BasicMainCard";
import GotoIcon from "@components/svg/GotoIcon";

type Props = {
  title: string;
  goto?: () => void;
  gotoColor?: string;
};

const PreviewCard: FC<Props> = ({ title, children, goto, gotoColor }) => {
  return (
    <BasicMainCard>
      <div className="p-6 body-font text-gray-100 ">
        <div className="flex gap-5 items-baseline">
          <h2 className="sm:text-3xl text-2xl mb-6 title-font font-medium">{title}</h2>
          {goto && <GotoIcon onClick={goto} color={gotoColor} size={24} />}
        </div>
        {children}
      </div>
    </BasicMainCard>
  );
};

export default PreviewCard;

type PreviewCardProps = {
  name: string;
  value: string;
};

export const PreviewCardField: FC<PreviewCardProps> = ({ name, value }) => {
  return (
    <p className="grid grid-cols-2 mb-2">
      <span className="leading-relaxed text-blue-400">{name}</span>
      <span className="leading-relaxed">{value}</span>
    </p>
  );
};
