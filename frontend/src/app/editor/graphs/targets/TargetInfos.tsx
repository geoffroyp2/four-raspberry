import { FC } from "react";
import { useSelector } from "react-redux";
import { selectTargetData } from "../_state/targetDataSlice";

const TargetInfos: FC = () => {
  const target = useSelector(selectTargetData);

  return <div>{target.name}</div>;
};

export default TargetInfos;
