import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { Formula } from "@app/_types/dbTypes";
import { getSetFormulaTargetMutation, getUpdateFormulaMutation } from "./_gql/mutations";

import { useDispatch, useSelector } from "react-redux";
import { selectFormulaData, setFormulaData } from "./_state/formulaDataSlice";
import { selectTargetPreviewLoadId } from "@editor/graphs/_state/targetDisplaySlice";

import TargetLoadTable from "@editor/graphs/targets/TargetLoadTable";
import InfosCard, { InfosCardField } from "@components/cards/InfosCard";
import CustomInput from "@components/inputs/CustomInput";
import BasicButton from "@components/buttons/BasicButton";
import CustomTextArea from "@components/inputs/CustomTextArea";
import LinkTableModal from "@components/modals/LinkTableModal";

import { dateToDisplayString } from "@app/_utils/dateFormat";
import TargetTableTitle from "@editor/graphs/elements/TargetTableTitle";

const FormulaInfos: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formula = useSelector(selectFormulaData);
  const targetId = useSelector(selectTargetPreviewLoadId);

  const [NameEditValue, setNameEditValue] = useState<string>(formula.name ?? "");
  const [DescriptionEditValue, setDescriptionEditValue] = useState<string>(formula.description ?? "");
  const [ShowLinkModal, setShowLinkModal] = useState<boolean>(false);

  useEffect(() => {
    setNameEditValue(formula.name ?? "");
    setDescriptionEditValue(formula.description ?? "");
  }, [formula]);

  const [updateFormulaName] = useMutation<{ updateFormula: Formula }>(getUpdateFormulaMutation("name"), {
    onCompleted: ({ updateFormula }) => {
      dispatch(setFormulaData(updateFormula));
    },
  });

  const [updateFormulaDescription] = useMutation<{ updateFormula: Formula }>(getUpdateFormulaMutation("description"), {
    onCompleted: ({ updateFormula }) => {
      dispatch(setFormulaData(updateFormula));
    },
  });

  const [setFormulaTarget] = useMutation<{ setFormulaTarget: Formula }>(getSetFormulaTargetMutation(true), {
    onCompleted: ({ setFormulaTarget }) => {
      dispatch(setFormulaData(setFormulaTarget));
    },
  });

  const [unlinkFormulaTarget] = useMutation<{ setFormulaTarget: Formula }>(getSetFormulaTargetMutation(false), {
    onCompleted: ({ setFormulaTarget }) => {
      dispatch(setFormulaData(setFormulaTarget));
    },
  });

  return (
    <>
      <InfosCard>
        <InfosCardField
          label="Nom"
          defaultContent={formula.name ?? "-"}
          editContent={<CustomInput value={NameEditValue} onChange={setNameEditValue} />}
          confirmChange={() => updateFormulaName({ variables: { formulaId: formula.id, name: NameEditValue } })}
          discardChange={() => setNameEditValue(formula.name ?? "")}
        />
        <InfosCardField
          label="Description"
          defaultContent={formula.description ?? "-"}
          editContent={<CustomTextArea value={DescriptionEditValue} onChange={setDescriptionEditValue} />}
          confirmChange={() =>
            updateFormulaDescription({ variables: { formulaId: formula.id, description: DescriptionEditValue } })
          }
          discardChange={() => setDescriptionEditValue(formula.description ?? "")}
        />
        <InfosCardField
          label="Courbe de référence"
          defaultContent={formula.target?.name ?? "-"}
          unlink={
            formula.target?.id
              ? () => {
                  unlinkFormulaTarget({ variables: { formulaId: formula.id } });
                }
              : undefined
          }
          link={() => setShowLinkModal(true)}
          goto={
            formula.target?.id
              ? () => {
                  if (formula.target?.id && formula.target.id > 0) {
                    navigate(`/graphs/targets/${formula.target?.id}`);
                  } else {
                    navigate("/graphs");
                  }
                }
              : undefined
          }
          gotoColor={"targets"}
        />
        <InfosCardField label="Création" defaultContent={dateToDisplayString(formula.createdAt, true)} />
        <InfosCardField label="Dernière modification" defaultContent={dateToDisplayString(formula.updatedAt, true)} />
      </InfosCard>
      <LinkTableModal
        show={ShowLinkModal}
        title={<TargetTableTitle />}
        onHide={() => setShowLinkModal(false)}
        table={
          <TargetLoadTable
            buttons={
              <>
                <BasicButton color={"red"} onClick={() => setShowLinkModal(false)}>
                  Annuler
                </BasicButton>
                <BasicButton
                  color={"blue"}
                  onClick={() => {
                    setShowLinkModal(false);
                    setFormulaTarget({ variables: { formulaId: formula.id, targetId: targetId ?? 0 } });
                  }}
                >
                  Sélectionner
                </BasicButton>
              </>
            }
          />
        }
      />
    </>
  );
};

export default FormulaInfos;
