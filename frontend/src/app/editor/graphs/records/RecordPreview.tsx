import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useLazyQuery } from "@apollo/client";
import { RecordQueryRes } from "@app/_types/dbTypes";
import { IdQueryParams } from "@editor/_gql/types";
import { recordPreviewQuery } from "../_gql/queries";

import { useDispatch, useSelector } from "react-redux";
import { selectRecordLoadId } from "../_state/recordDisplaySlice";
import { selectRecordPreview, setRecordPreview } from "../_state/recordDataSlice";

import { dateToDisplayString } from "@app/_utils/dateFormat";

import PreviewCard, { PreviewCardField } from "@components/cards/PreviewCard";
import NotFound from "@editor/NotFound";

type Props = {
  showGoto?: boolean;
};

const RecordPreview: FC<Props> = ({ showGoto }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const recordId = useSelector(selectRecordLoadId);
  const previewData = useSelector(selectRecordPreview);

  const [loadRecordPreview, { error }] = useLazyQuery<RecordQueryRes>(recordPreviewQuery, {
    onCompleted: ({ records }) => {
      if (records.rows[0] && records.rows[0].id === recordId) {
        dispatch(setRecordPreview(records.rows[0]));
      }
    },
  });

  useEffect(() => {
    const variables: IdQueryParams = {
      variables: {
        id: recordId ?? 0,
      },
    };
    loadRecordPreview(variables);
  }, [recordId, loadRecordPreview]);

  if (error) return <NotFound />;

  return (
    <PreviewCard
      title={previewData.name ?? "-"}
      goto={showGoto ? () => navigate(`/graphs/records/${recordId}`) : undefined}
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
