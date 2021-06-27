import { FC } from "react";

import { useQuery } from "@apollo/client";
import { PieceQueryRes } from "@app/_types/dbTypes";
import { IdQueryParams } from "@editor/_gql/types";
import { piecePreviewQuery } from "./_gql/queries";

import { useDispatch, useSelector } from "react-redux";
import { selectPieceLoadId } from "./_state/pieceDisplaySlice";
import { selectPiecePreview, setPiecePreview } from "./_state/pieceDataSlice";

import { dateToDisplayString } from "@app/_utils/dateFormat";

import PreviewCard, { PreviewCardField } from "@components/cards/PreviewCard";
import NotFound from "@editor/NotFound";

const PiecePreview: FC = () => {
  const dispatch = useDispatch();
  const pieceId = useSelector(selectPieceLoadId);
  const previewData = useSelector(selectPiecePreview);

  const variables: IdQueryParams = {
    variables: {
      id: pieceId ?? 0,
    },
  };

  const { error } = useQuery<PieceQueryRes>(piecePreviewQuery, {
    ...variables,
    onCompleted: ({ pieces }) => {
      if (pieces.rows[0] && pieces.rows[0].id === pieceId) {
        dispatch(setPiecePreview(pieces.rows[0]));
      }
    },
  });

  if (error) return <NotFound />;

  return (
    <PreviewCard title={previewData.name ?? "-"}>
      <PreviewCardField name="Description" value={previewData.description ?? "-"} />
      <PreviewCardField name="Création" value={dateToDisplayString(previewData.createdAt, true)} />
      <PreviewCardField name="Dernière modification" value={dateToDisplayString(previewData.updatedAt, true)} />
    </PreviewCard>
  );
};

export default PiecePreview;
