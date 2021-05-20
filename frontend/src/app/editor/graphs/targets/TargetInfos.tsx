import { useSelector } from "react-redux";
import { selectTargetData } from "../_state/targetDataSlice";

const TargetInfos = () => {
  const target = useSelector(selectTargetData);

  return <div>{target.name}</div>;
};

export default TargetInfos;
