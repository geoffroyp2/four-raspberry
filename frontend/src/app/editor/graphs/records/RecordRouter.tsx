import { FC } from "react";
import { Route, Routes } from "react-router";

import RecordHome from "./RecordHome";
import RecordFetcher from "./RecordFetcher";

const RecordRouter: FC = () => {
  return (
    <Routes>
      <Route path=":id" element={<RecordFetcher />} />
      <Route path="/" element={<RecordHome />} />
    </Routes>
  );
};

export default RecordRouter;
