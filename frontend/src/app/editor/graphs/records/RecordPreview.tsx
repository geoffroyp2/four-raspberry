import { FC, useMemo } from "react";

import { useQuery } from "@apollo/client";
import { RecordQueryRes } from "@app/_types/dbTypes";
import { IdQueryParams } from "@editor/_gql/types";
import { recordPreviewQuery } from "../_gql/queries";

import { useDispatch, useSelector } from "react-redux";
import { selectGraphLoadId } from "../_state/graphDisplaySlice";
import { selectRecordPreview, setRecordPreview } from "../_state/recordDataSlice";

import { dateToDisplayString } from "@app/_utils/dateFormat";

import PreviewCard, { PreviewCardField } from "@components/cards/PreviewCard";
import NotFound from "@editor/NotFound";

const RecordPreview: FC = () => {
  const dispatch = useDispatch();
  const { recordId } = useSelector(selectGraphLoadId);
  const previewData = useSelector(selectRecordPreview);

  const variables: IdQueryParams = {
    variables: {
      id: recordId ?? 0,
    },
  };

  const { error } = useQuery<RecordQueryRes>(recordPreviewQuery, {
    ...variables,
    onCompleted: ({ records }) => {
      if (records.rows[0] && records.rows[0].id === recordId) {
        dispatch(setRecordPreview(records.rows[0]));
      }
    },
  });

  const fields = useMemo(() => {
    return [
      <PreviewCardField key="prvw-Description" name="Description" value={previewData.description ?? "-"} />,
      <PreviewCardField key="prvw-Four" name="Four" value={previewData.oven ?? "-"} />,
      <PreviewCardField key="prvw-Courbe" name="Courbe de référence" value={previewData.target?.name ?? "-"} />,
      <PreviewCardField key="prvw-Création" name="Création" value={dateToDisplayString(previewData.createdAt, true)} />,
      <PreviewCardField
        key="prvw-modification"
        name="Dernière modification"
        value={dateToDisplayString(previewData.updatedAt, true)}
      />,
    ];
  }, [previewData]);

  if (error) return <NotFound />;

  return <PreviewCard title={previewData.name ?? "-"}>{fields}</PreviewCard>;
};

export default RecordPreview;
