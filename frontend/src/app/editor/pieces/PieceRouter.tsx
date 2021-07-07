import { FC, useEffect } from "react";
import { Route, Routes } from "react-router";
import { useNavigate, useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectPieceData } from "./_state/pieceDataSlice";

import PieceHome from "./PieceHome";
import PieceInfosPage from "./PieceInfosPage";

const PieceRouter: FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const piece = useSelector(selectPieceData);

  useEffect(() => {
    if (params["*"] === "back") {
      // We're coming from the same tab, stay at PieceHome
      navigate("/pieces", { replace: true });
    } else if (params["*"] === "banner") {
      if (piece.id && piece.id > 0) {
        // We're coming from the banner, if a piece is already loaded, go there
        navigate(`/pieces/${piece.id}`, { replace: true });
      } else {
        navigate("/pieces", { replace: true });
      }
    } else if (isNaN(+params["*"])) {
      // If id is invalid
      navigate("/pieces", { replace: true });
    }
  }, [params, navigate, piece]);

  return (
    <Routes>
      <Route path="*" element={<PieceHome />} />
      <Route path=":id" element={<PieceInfosPage />} />
    </Routes>
  );
};

export default PieceRouter;
