import { FC } from "react";
import { Route, Routes } from "react-router";

import TargetFetcher from "./TargetFetcher";
import TargetHome from "./TargetHome";

const TargetRouter: FC = () => {
  return (
    <Routes>
      <Route path=":id" element={<TargetFetcher />} />
      <Route path="/" element={<TargetHome />} />
    </Routes>
  );
};

export default TargetRouter;
