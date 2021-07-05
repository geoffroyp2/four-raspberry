import { FC } from "react";

import { useSelector } from "react-redux";

import SimpleGraph from "@components/graphs/SimpleGraph";
import { selectLiveRecord, selectLiveTarget } from "./_state/liveScreenSlice";

const LiveGraph: FC = () => {
  const record = useSelector(selectLiveRecord);
  const target = useSelector(selectLiveTarget);

  return <SimpleGraph recordPoints={record.points} targetPoints={target.points} color={record.color} />;
};

export default LiveGraph;
