import { FC } from "react";
import { Route, Routes } from "react-router";

import PieceHome from "./PieceHome";
import PieceFetcher from "./PieceFetcher";

const PieceRouter: FC = () => {
  /**
   * TODO: id a piece is already loaded, make the banner click go directly there
   * (if we come from the back button, stay here)
   */

  return (
    <Routes>
      <Route path="*" element={<PieceHome />} />
      <Route path=":id" element={<PieceFetcher />} />
    </Routes>
  );
};

export default PieceRouter;
