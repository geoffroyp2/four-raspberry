import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useLazyQuery } from "@apollo/client";
import { FormulaQueryRes } from "@app/_types/dbTypes";
import { IdQueryParams } from "@editor/_gql/types";
import { formulaPreviewQuery } from "./_gql/queries";

import { useDispatch, useSelector } from "react-redux";
import { selectFormulaLoadId } from "./_state/formulaDisplaySlice";
import { selectFormulaPreview, setFormulaPreview } from "./_state/formulaDataSlice";

import { dateToDisplayString } from "@app/_utils/dateFormat";

import PreviewCard, { PreviewCardField } from "@components/cards/PreviewCard";
import NotFound from "@editor/NotFound";

type Props = {
  showGoto?: boolean;
};

const FormulaPreview: FC<Props> = ({ showGoto }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formulaId = useSelector(selectFormulaLoadId);
  const previewData = useSelector(selectFormulaPreview);

  const [loadFormulaPreview, { error }] = useLazyQuery<FormulaQueryRes>(formulaPreviewQuery, {
    onCompleted: ({ formulas }) => {
      if (formulas.rows[0] && formulas.rows[0].id === formulaId) {
        dispatch(setFormulaPreview(formulas.rows[0]));
      }
    },
  });

  useEffect(() => {
    const variables: IdQueryParams = {
      variables: {
        id: formulaId ?? 0,
      },
    };
    loadFormulaPreview(variables);
  }, [formulaId, loadFormulaPreview]);

  if (error) return <NotFound />;

  return (
    <PreviewCard
      title={previewData.name ?? "-"}
      goto={showGoto ? () => navigate(`/formulas/${formulaId}`) : undefined}
      gotoColor="formulas"
    >
      <PreviewCardField name="Description" value={previewData.description ?? "-"} />
      <PreviewCardField name="Création" value={dateToDisplayString(previewData.createdAt, true)} />
      <PreviewCardField name="Dernière modification" value={dateToDisplayString(previewData.updatedAt, true)} />
    </PreviewCard>
  );
};

export default FormulaPreview;
