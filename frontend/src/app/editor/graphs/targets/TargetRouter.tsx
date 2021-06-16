import { FC } from "react";
import { Route, Routes } from "react-router";

import TargetLoader from "./TargetLoader";
import TargetHome from "./TargetHome";

const TargetRouter: FC = () => {
  return (
    <Routes>
      <Route path=":id" element={<TargetLoader />} />
      <Route path="/" element={<TargetHome />} />
    </Routes>
  );
};

export default TargetRouter;
