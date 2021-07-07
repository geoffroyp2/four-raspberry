import { FC } from "react";
import { useNavigate } from "react-router-dom";
import useTargetLoadPreview from "../hooks/useTargetLoadPreview";

import { useSelector } from "react-redux";
import { selectTargetPreviewLoadId } from "../_state/targetDisplaySlice";
import { selectTargetPreview } from "../_state/targetDataSlice";

import { dateToDisplayString } from "@app/_utils/dateFormat";

import PreviewCard, { PreviewCardField } from "@components/cards/PreviewCard";
import NotFound from "@editor/NotFound";

type Props = {
  showGoto?: boolean;
};

const TargetPreview: FC<Props> = ({ showGoto }) => {
  const navigate = useNavigate();
  const targetId = useSelector(selectTargetPreviewLoadId);
  const previewData = useSelector(selectTargetPreview);
  const { error } = useTargetLoadPreview();

  if (error) return <NotFound />;

  return (
    <PreviewCard
      title={previewData.name ?? "-"}
      goto={showGoto && previewData.id && previewData.id > 0 ? () => navigate(`/graphs/targets/${targetId}`) : undefined}
      gotoColor="targets"
    >
      <PreviewCardField name="Description" value={previewData.description ?? "-"} />
      <PreviewCardField name="Four" value={previewData.oven ?? "-"} />
      <PreviewCardField name="Création" value={dateToDisplayString(previewData.createdAt, true)} />
      <PreviewCardField name="Dernière modification" value={dateToDisplayString(previewData.updatedAt, true)} />
    </PreviewCard>
  );
};

export default TargetPreview;
