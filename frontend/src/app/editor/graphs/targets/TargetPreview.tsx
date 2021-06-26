import { FC } from "react";

import { useQuery } from "@apollo/client";
import { TargetQueryRes } from "@app/_types/dbTypes";
import { IdQueryParams } from "@editor/_gql/types";
import { targetPreviewQuery } from "../_gql/queries";

import { useDispatch, useSelector } from "react-redux";
import { selectGraphLoadId } from "../_state/graphDisplaySlice";
import { selectTargetPreview, setTargetPreview } from "../_state/targetDataSlice";

import { dateToDisplayString } from "@app/_utils/dateFormat";

import PreviewCard, { PreviewCardField } from "@components/cards/PreviewCard";
import NotFound from "@editor/NotFound";

const TargetPreview: FC = () => {
  const dispatch = useDispatch();
  const { targetId } = useSelector(selectGraphLoadId);
  const previewData = useSelector(selectTargetPreview);

  const variables: IdQueryParams = {
    variables: {
      id: targetId ?? 0,
    },
  };

  const { error } = useQuery<TargetQueryRes>(targetPreviewQuery, {
    ...variables,
    onCompleted: ({ targets }) => {
      if (targets.rows[0] && targets.rows[0].id === targetId) {
        dispatch(setTargetPreview(targets.rows[0]));
      }
    },
  });

  if (error) return <NotFound />;

  return (
    <PreviewCard title={previewData.name ?? "-"}>
      <PreviewCardField name="Description" value={previewData.description ?? "-"} />
      <PreviewCardField name="Four" value={previewData.oven ?? "-"} />
      <PreviewCardField name="Création" value={dateToDisplayString(previewData.createdAt, true)} />
      <PreviewCardField name="Dernière modification" value={dateToDisplayString(previewData.updatedAt, true)} />
    </PreviewCard>
  );
};

export default TargetPreview;