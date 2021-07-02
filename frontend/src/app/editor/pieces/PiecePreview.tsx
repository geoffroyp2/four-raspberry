import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useLazyQuery } from "@apollo/client";
import { PieceQueryRes } from "@app/_types/dbTypes";
import { IdQueryParams } from "@editor/_gql/types";
import { piecePreviewQuery } from "./_gql/queries";

import { useDispatch, useSelector } from "react-redux";
import { selectPieceLoadId } from "./_state/pieceDisplaySlice";
import { selectPiecePreview, setPiecePreview } from "./_state/pieceDataSlice";

import { dateToDisplayString } from "@app/_utils/dateFormat";

import PreviewCard, { PreviewCardField } from "@components/cards/PreviewCard";
import NotFound from "@editor/NotFound";

type Props = {
  showGoto?: boolean;
};

const PiecePreview: FC<Props> = ({ showGoto }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pieceId = useSelector(selectPieceLoadId);
  const previewData = useSelector(selectPiecePreview);

  const [loadPiecePreview, { error }] = useLazyQuery<PieceQueryRes>(piecePreviewQuery, {
    onCompleted: ({ pieces }) => {
      if (pieces.rows[0] && pieces.rows[0].id === pieceId) {
        dispatch(setPiecePreview(pieces.rows[0]));
      }
    },
  });

  useEffect(() => {
    const variables: IdQueryParams = {
      variables: {
        id: pieceId ?? 0,
      },
    };
    loadPiecePreview(variables);
  }, [pieceId, loadPiecePreview]);

  if (error) return <NotFound />;

  return (
    <PreviewCard
      title={previewData.name ?? "-"}
      goto={showGoto ? () => navigate(`/pieces/${pieceId}`) : undefined}
      gotoColor="pieces"
    >
      <PreviewCardField name="Description" value={previewData.description ?? "-"} />
      <PreviewCardField name="Création" value={dateToDisplayString(previewData.createdAt, true)} />
      <PreviewCardField name="Dernière modification" value={dateToDisplayString(previewData.updatedAt, true)} />
    </PreviewCard>
  );
};

export default PiecePreview;
