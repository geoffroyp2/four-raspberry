import { FC } from "react";
import { useNavigate } from "react-router-dom";
import usePieceLoadPreview from "./hooks/usePieceLoadPreview";

import { useSelector } from "react-redux";
import { selectPiecePreviewLoadId } from "./_state/pieceDisplaySlice";
import { selectPiecePreview } from "./_state/pieceDataSlice";

import { dateToDisplayString } from "@app/_utils/dateFormat";

import PreviewCard, { PreviewCardField } from "@components/cards/PreviewCard";
import NotFound from "@editor/NotFound";

type Props = {
  showGoto?: boolean;
};

const PiecePreview: FC<Props> = ({ showGoto }) => {
  const navigate = useNavigate();
  const pieceId = useSelector(selectPiecePreviewLoadId);
  const previewData = useSelector(selectPiecePreview);
  const { called, loading, error } = usePieceLoadPreview();

  if (error) return <NotFound />;
  if (!called || loading)
    return (
      <PreviewCard title={""}>
        <PreviewCardField name="Description" value={""} />
        <PreviewCardField name="Création" value={""} />
        <PreviewCardField name="Dernière modification" value={""} />
      </PreviewCard>
    );

  return (
    <PreviewCard
      title={previewData.name ?? "-"}
      goto={showGoto && previewData.id && previewData.id > 0 ? () => navigate(`/pieces/${pieceId}`) : undefined}
      gotoColor="pieces"
    >
      <PreviewCardField name="Description" value={previewData.description ?? "-"} />
      <PreviewCardField name="Création" value={dateToDisplayString(previewData.createdAt, true)} />
      <PreviewCardField name="Dernière modification" value={dateToDisplayString(previewData.updatedAt, true)} />
    </PreviewCard>
  );
};

export default PiecePreview;
