import { FC } from "react";
import { useNavigate } from "react-router-dom";
import useRecordLoadPreview from "../hooks/useRecordLoadPreview";

import { useSelector } from "react-redux";
import { selectRecordPreviewLoadId } from "../_state/recordDisplaySlice";
import { selectRecordPreview } from "../_state/recordDataSlice";

import { dateToDisplayString } from "@app/_utils/dateFormat";

import PreviewCard, { PreviewCardField } from "@components/cards/PreviewCard";
import NotFound from "@editor/NotFound";

type Props = {
  showGoto?: boolean;
};

const RecordPreview: FC<Props> = ({ showGoto }) => {
  const navigate = useNavigate();
  const recordId = useSelector(selectRecordPreviewLoadId);
  const previewData = useSelector(selectRecordPreview);
  const { called, loading, error } = useRecordLoadPreview();

  if (error) return <NotFound />;
  if (!called || loading)
    return (
      <PreviewCard title={""}>
        <PreviewCardField name="Description" value={""} />
        <PreviewCardField name="Four" value={""} />
        <PreviewCardField name="Courbe de référence" value={""} />
        <PreviewCardField name="Création" value={""} />
        <PreviewCardField name="Dernière modification" value={""} />
      </PreviewCard>
    );

  return (
    <PreviewCard
      title={previewData.name ?? "-"}
      goto={showGoto && previewData.id && previewData.id > 0 ? () => navigate(`/graphs/records/${recordId}`) : undefined}
      gotoColor="records"
    >
      <PreviewCardField name="Description" value={previewData.description ?? "-"} />
      <PreviewCardField name="Four" value={previewData.oven ?? "-"} />
      <PreviewCardField name="Courbe de référence" value={previewData.target?.name ?? "-"} />
      <PreviewCardField name="Création" value={dateToDisplayString(previewData.createdAt, true)} />
      <PreviewCardField name="Dernière modification" value={dateToDisplayString(previewData.updatedAt, true)} />
    </PreviewCard>
  );
};

export default RecordPreview;
