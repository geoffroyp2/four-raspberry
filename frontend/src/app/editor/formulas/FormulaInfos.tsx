import { FC, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { Formula } from "@app/_types/dbTypes";
import { getUpdateFormulaMutation } from "./_gql/mutations";

import { useDispatch, useSelector } from "react-redux";
import { selectFormulaData, setFormulaData } from "./_state/formulaDataSlice";
import { setRecordData } from "@editor/graphs/_state/recordDataSlice";

import InfosCard, { InfosCardField } from "@components/cards/InfosCard";
import CustomInput from "@components/inputs/CustomInput";
import CustomTextArea from "@components/inputs/CustomTextArea";
import LinkTableModal from "@components/modals/LinkTableModal";

import { dateToDisplayString } from "@app/_utils/dateFormat";

const FormulaInfos: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formula = useSelector(selectFormulaData);
  // const formulaPageAmount = useSelector(selectFormulaPageAmount);
  // const formulaLoadPage = useSelector(selectFormulaLoadPage);
  // const formulaId = useSelector(selectFormulaLoadId);

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

  // const [setFormulaTarget] = useMutation<{ setFormulaTarget: Formula }>(getSetFormulaTargetMutation(true), {
  //   onCompleted: ({ setFormulaTarget }) => {
  //     dispatch(setFormulaData(setFormulaTarget));
  //   },
  // });

  // const [unlinkFormulaTarget] = useMutation<{ setFormulaFormula: Formula }>(getSetFormulaTargetMutation(false), {
  //   onCompleted: ({ setFormulaTarget }) => {
  //     dispatch(setFormulaData(setFormulaTarget));
  //   },
  // });

  // const handleSubmitSearch = useCallback((fieldValue: string) => {
  //   console.log(fieldValue);
  // }, []);

  // const handleSetPage = useCallback(
  //   (page: number) => {
  //     dispatch(setFormulaLoadPage(page));
  //   },
  //   [dispatch]
  // );

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
        {/* <InfosCardField
          label="Émail"
          defaultContent={formula.formula?.name ?? "-"}
          unlink={
            formula.formula?.id
              ? () => {
                  unlinkFormulaFormula({ variables: { formulaId: formula.id } });
                }
              : undefined
          }
          link={() => setShowLinkModal(true)}
          goto={
            formula.formula?.id
              ? () => {
                  if (formula.formula?.id && formula.formula.id > 0) {
                    navigate(`../../formulas/${formula.formula.id}`);
                  } else {
                    navigate("../../formulas");
                  }
                }
              : undefined
          }
          gotoColor={"formulas"}
        /> */}
        <InfosCardField label="Création" defaultContent={dateToDisplayString(formula.createdAt, true)} />
        <InfosCardField label="Dernière modification" defaultContent={dateToDisplayString(formula.updatedAt, true)} />
      </InfosCard>
      {/* <LinkTableModal
        show={ShowLinkModal}
        discardChange={() => setShowLinkModal(false)}
        confirmChange={() => {
          setShowLinkModal(false);
          setFormulaFormula({ variables: { recordId: formula.id, formulaId: formulaId ?? 0 } });
        }}
        title={<TableTitle title="Émaux" handleSubmit={handleSubmitSearch} />}
        pagination={
          formulaPageAmount > 0 && (
            <Pagination currentPage={formulaLoadPage} pageAmount={formulaPageAmount} handleSetPage={handleSetPage} small />
          )
        }
        table={<FormulaLoadTable />}
      /> */}
    </>
  );
};

export default FormulaInfos;
