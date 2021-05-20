import { Route, Routes } from "react-router";

import RecordHome from "./RecordHome";
import RecordLoader from "./RecordLoader";

const RecordRouter = () => {
  return (
    <Routes>
      <Route path=":id" element={<RecordLoader />} />
      <Route path="/" element={<RecordHome />} />
    </Routes>
  );
};

export default RecordRouter;
