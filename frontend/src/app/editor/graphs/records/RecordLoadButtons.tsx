import { FC } from "react";
import { useNavigate } from "react-router";
import useRecordLoadPage from "../hooks/useRecordLoadPage";

import { useMutation } from "@apollo/client";
import { createRecordMutation, deleteRecordMutation } from "../_gql/mutations";
import { Record } from "@app/_types/dbTypes";

import { useDispatch, useSelector } from "react-redux";
import { selectRecordPreviewLoadId, setRecordPreviewLoadId } from "../_state/recordDisplaySlice";
import { setRecordData } from "../_state/recordDataSlice";

import BasicButton from "@components/buttons/BasicButton";
import ForwardButton from "@components/buttons/ForwardButton";

const RecordLoadButtons: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { refetch } = useRecordLoadPage();
  const recordId = useSelector(selectRecordPreviewLoadId);

  const [createRecord] = useMutation<{ createRecord: Record }>(createRecordMutation, {
    onCompleted: ({ createRecord }) => {
      dispatch(setRecordData(createRecord));
      navigate(`/graphs/records/${createRecord.id}`);
    },
  });

  const [deleteRecord] = useMutation<{ deleteRecord: boolean }>(deleteRecordMutation, {
    onCompleted: ({ deleteRecord }) => {
      if (deleteRecord && refetch) {
        dispatch(setRecordPreviewLoadId(null));
        refetch();
      }
    },
  });

  return (
    <div className="flex justify-end gap-2">
      <BasicButton color="red" onClick={() => deleteRecord({ variables: { recordId } })}>
        Supprimer
      </BasicButton>
      <BasicButton color="green" onClick={createRecord}>
        Nouveau
      </BasicButton>
      <ForwardButton onClick={() => navigate(`/graphs/records/${recordId}`)} disabled={recordId === null} />
    </div>
  );
};

export default RecordLoadButtons;
