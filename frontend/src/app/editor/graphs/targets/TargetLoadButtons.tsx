import { FC } from "react";
import { useNavigate } from "react-router";
import useTargetLoadPage from "../hooks/useTargetLoadPage";

import { useMutation } from "@apollo/client";
import { createTargetMutation, deleteTargetMutation } from "../_gql/mutations";
import { Target } from "@app/_types/dbTypes";

import { useDispatch, useSelector } from "react-redux";
import { selectTargetPreviewLoadId, setTargetPreviewLoadId } from "../_state/targetDisplaySlice";
import { setTargetData } from "../_state/targetDataSlice";

import BasicButton from "@components/buttons/BasicButton";
import ForwardButton from "@components/buttons/ForwardButton";

const TargetLoadButtons: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { refetch } = useTargetLoadPage();
  const targetId = useSelector(selectTargetPreviewLoadId);

  const [createTarget] = useMutation<{ createTarget: Target }>(createTargetMutation, {
    onCompleted: ({ createTarget }) => {
      dispatch(setTargetData(createTarget));
      navigate(`/graphs/targets/${createTarget.id}`);
    },
  });

  const [deleteTarget] = useMutation<{ deleteTarget: boolean }>(deleteTargetMutation, {
    onCompleted: ({ deleteTarget }) => {
      if (deleteTarget && refetch) {
        dispatch(setTargetPreviewLoadId(null));
        refetch();
      }
    },
  });

  return (
    <div className="flex justify-end gap-2">
      <BasicButton color="red" onClick={() => deleteTarget({ variables: { targetId } })}>
        Supprimer
      </BasicButton>
      <BasicButton color="green" onClick={createTarget}>
        Nouveau
      </BasicButton>
      <ForwardButton onClick={() => navigate(`/graphs/targets/${targetId}`)} disabled={targetId === null} />
    </div>
  );
};

export default TargetLoadButtons;
