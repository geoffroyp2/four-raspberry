import { FC } from "react";
import { useNavigate } from "react-router-dom";
import useFormulaLoadPreview from "./hooks/useFormulaLoadPreview";

import { useSelector } from "react-redux";
import { selectFormulaPreviewLoadId } from "./_state/formulaDisplaySlice";
import { selectFormulaPreview } from "./_state/formulaDataSlice";

import PreviewCard, { PreviewCardField } from "@components/cards/PreviewCard";
import NotFound from "@editor/NotFound";

import { dateToDisplayString } from "@app/_utils/dateFormat";

type Props = {
  showGoto?: boolean;
};

const FormulaPreview: FC<Props> = ({ showGoto }) => {
  const navigate = useNavigate();
  const formulaId = useSelector(selectFormulaPreviewLoadId);
  const previewData = useSelector(selectFormulaPreview);
  const { error } = useFormulaLoadPreview();

  if (error) return <NotFound />;

  return (
    <PreviewCard
      title={previewData.name ?? "-"}
      goto={showGoto && previewData.id && previewData.id > 0 ? () => navigate(`/formulas/${formulaId}`) : undefined}
      gotoColor="formulas"
    >
      <PreviewCardField name="Description" value={previewData.description ?? "-"} />
      <PreviewCardField name="Création" value={dateToDisplayString(previewData.createdAt, true)} />
      <PreviewCardField name="Dernière modification" value={dateToDisplayString(previewData.updatedAt, true)} />
    </PreviewCard>
  );
};

export default FormulaPreview;
