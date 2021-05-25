import { useSelector } from "react-redux";
import { selectRecordData } from "../_state/recordDataSlice";
import RecordGraph from "./RecordGraph";

const RecordInfos = () => {
  const record = useSelector(selectRecordData);

  return <RecordGraph />;
};

export default RecordInfos;
