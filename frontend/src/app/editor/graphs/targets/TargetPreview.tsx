import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useLazyQuery } from "@apollo/client";
import { TargetQueryRes } from "@app/_types/dbTypes";
import { IdQueryParams } from "@editor/_gql/types";
import { targetPreviewQuery } from "../_gql/queries";

import { useDispatch, useSelector } from "react-redux";
import { selectTargetLoadId } from "../_state/targetDisplaySlice";
import { selectTargetPreview, setTargetPreview } from "../_state/targetDataSlice";

import { dateToDisplayString } from "@app/_utils/dateFormat";

import PreviewCard, { PreviewCardField } from "@components/cards/PreviewCard";
import NotFound from "@editor/NotFound";

type Props = {
  showGoto?: boolean;
};

const TargetPreview: FC<Props> = ({ showGoto }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const targetId = useSelector(selectTargetLoadId);
  const previewData = useSelector(selectTargetPreview);

  const [loadTargetPreview, { error }] = useLazyQuery<TargetQueryRes>(targetPreviewQuery, {
    onCompleted: ({ targets }) => {
      if (targets.rows[0] && targets.rows[0].id === targetId) {
        dispatch(setTargetPreview(targets.rows[0]));
      }
    },
  });

  useEffect(() => {
    const variables: IdQueryParams = {
      variables: {
        id: targetId ?? 0,
      },
    };
    loadTargetPreview(variables);
  }, [targetId, loadTargetPreview]);

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
