import { FC } from "react";
import { useNavigate } from "react-router";
import useFormulaLoadPage from "./hooks/useFormulaLoadPage";

import { useMutation } from "@apollo/client";
import { createFormulaMutation, deleteFormulaMutation } from "./_gql/mutations";
import { Formula } from "@app/_types/dbTypes";

import { useDispatch, useSelector } from "react-redux";
import { selectFormulaPreviewLoadId, setFormulaPreviewLoadId } from "./_state/formulaDisplaySlice";
import { setFormulaData } from "./_state/formulaDataSlice";

import BasicButton from "@components/buttons/BasicButton";
import ForwardButton from "@components/buttons/ForwardButton";

const FormulaLoadButtons: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { refetch } = useFormulaLoadPage();
  const formulaId = useSelector(selectFormulaPreviewLoadId);

  const [createFormula] = useMutation<{ createFormula: Formula }>(createFormulaMutation, {
    onCompleted: ({ createFormula }) => {
      dispatch(setFormulaData(createFormula));
      navigate(`/formulas/${createFormula.id}`);
    },
  });

  const [deleteFormula] = useMutation<{ deleteFormula: boolean }>(deleteFormulaMutation, {
    onCompleted: ({ deleteFormula }) => {
      if (deleteFormula && refetch) {
        dispatch(setFormulaPreviewLoadId(null));
        refetch();
      }
    },
  });

  return (
    <div className="flex justify-end gap-2">
      <BasicButton color="red" onClick={() => deleteFormula({ variables: { formulaId } })}>
        Supprimer
      </BasicButton>
      <BasicButton color="green" onClick={createFormula}>
        Nouveau
      </BasicButton>
      <ForwardButton onClick={() => navigate(`/formulas/${formulaId}`)} disabled={formulaId === null} />
    </div>
  );
};

export default FormulaLoadButtons;
