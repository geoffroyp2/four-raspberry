import { FC } from "react";
import { useNavigate } from "react-router";
import usePieceLoadPage from "./hooks/usePieceLoadPage";

import { useMutation } from "@apollo/client";
import { createPieceMutation, deletePieceMutation } from "./_gql/mutations";
import { Piece } from "@app/_types/dbTypes";

import { useDispatch, useSelector } from "react-redux";
import { selectPiecePreviewLoadId, setPiecePreviewLoadId } from "./_state/pieceDisplaySlice";
import { setPieceData } from "./_state/pieceDataSlice";

import BasicButton from "@components/buttons/BasicButton";
import ForwardButton from "@components/buttons/ForwardButton";

const PieceLoadButtons: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { refetch } = usePieceLoadPage();
  const pieceId = useSelector(selectPiecePreviewLoadId);

  const [createPiece] = useMutation<{ createPiece: Piece }>(createPieceMutation, {
    onCompleted: ({ createPiece }) => {
      dispatch(setPieceData(createPiece));
      navigate(`/pieces/${createPiece.id}`);
    },
  });

  const [deletePiece] = useMutation<{ deletePiece: boolean }>(deletePieceMutation, {
    onCompleted: ({ deletePiece }) => {
      if (deletePiece && refetch) {
        dispatch(setPiecePreviewLoadId(null));
        refetch();
      }
    },
  });

  return (
    <div className="flex justify-end gap-2">
      <BasicButton color="red" onClick={() => deletePiece({ variables: { pieceId } })}>
        Supprimer
      </BasicButton>
      <BasicButton color="green" onClick={createPiece}>
        Nouveau
      </BasicButton>
      <ForwardButton onClick={() => navigate(`/pieces/${pieceId}`)} disabled={pieceId === null} />
    </div>
  );
};

export default PieceLoadButtons;
