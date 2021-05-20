import { useSelector } from "react-redux";
import { selectRecordData } from "../_state/recordDataSlice";

const RecordInfos = () => {
  const record = useSelector(selectRecordData);

  return <div>{record.name}</div>;
};

export default RecordInfos;
