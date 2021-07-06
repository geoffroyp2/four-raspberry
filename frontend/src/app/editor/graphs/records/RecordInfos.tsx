import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { getSetRecordTargetMutation, getUpdateRecordMutation } from "../_gql/mutations";
import { Record } from "@app/_types/dbTypes";

import { useDispatch, useSelector } from "react-redux";
import { selectRecordData, setRecordData } from "../_state/recordDataSlice";
import { selectTargetLoadId } from "../_state/targetDisplaySlice";

import TargetLoadTable from "../targets/TargetLoadTable";
import TargetTableTitle from "../elements/TargetTableTitle";
import InfosCard, { InfosCardField } from "@components/cards/InfosCard";
import LinkTableModal from "@components/modals/LinkTableModal";
import CustomInput from "@components/inputs/CustomInput";
import BasicButton from "@components/buttons/BasicButton";
import CustomTextArea from "@components/inputs/CustomTextArea";
import ColorPicker from "@components/inputs/ColorPicker";

import { dateToDisplayString } from "@app/_utils/dateFormat";

const RecordInfos: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const record = useSelector(selectRecordData);
  const targetId = useSelector(selectTargetLoadId);

  const [NameEditValue, setNameEditValue] = useState<string>(record.name ?? "");
  const [DescriptionEditValue, setDescriptionEditValue] = useState<string>(record.description ?? "");
  const [ShowLinkModal, setShowLinkModal] = useState<boolean>(false);

  useEffect(() => {
    setNameEditValue(record.name ?? "");
    setDescriptionEditValue(record.description ?? "");
  }, [record]);

  const [updateRecordName] = useMutation<{ updateRecord: Record }>(getUpdateRecordMutation("name"), {
    onCompleted: ({ updateRecord }) => {
      dispatch(setRecordData(updateRecord));
    },
  });

  const [updateRecordDescription] = useMutation<{ updateRecord: Record }>(getUpdateRecordMutation("description"), {
    onCompleted: ({ updateRecord }) => {
      dispatch(setRecordData(updateRecord));
    },
  });

  const [setRecordTarget] = useMutation<{ setRecordTarget: Record }>(getSetRecordTargetMutation(true), {
    onCompleted: ({ setRecordTarget }) => {
      dispatch(setRecordData(setRecordTarget));
    },
  });

  const [unlinkRecordTarget] = useMutation<{ setRecordTarget: Record }>(getSetRecordTargetMutation(false), {
    onCompleted: ({ setRecordTarget }) => {
      dispatch(setRecordData(setRecordTarget));
    },
  });

  const [updateRecordColor] = useMutation<{ updateRecord: Record }>(getUpdateRecordMutation("color"), {
    onCompleted: ({ updateRecord }) => {
      dispatch(setRecordData(updateRecord));
    },
  });

  return (
    <>
      <InfosCard>
        <InfosCardField
          label="Nom"
          defaultContent={record.name ?? "-"}
          editContent={<CustomInput value={NameEditValue} onChange={setNameEditValue} />}
          confirmChange={() => updateRecordName({ variables: { recordId: record.id, name: NameEditValue } })}
          discardChange={() => setNameEditValue(record.name ?? "")}
        />
        <InfosCardField
          label="Description"
          defaultContent={record.description ?? "-"}
          editContent={<CustomTextArea value={DescriptionEditValue} onChange={setDescriptionEditValue} />}
          confirmChange={() => updateRecordDescription({ variables: { recordId: record.id, description: DescriptionEditValue } })}
          discardChange={() => setDescriptionEditValue(record.description ?? "")}
        />
        <InfosCardField
          label="Courbe de référence"
          defaultContent={record.target?.name ?? "-"}
          unlink={
            record.target?.id
              ? () => {
                  unlinkRecordTarget({ variables: { recordId: record.id } });
                }
              : undefined
          }
          link={() => setShowLinkModal(true)}
          goto={
            record.target?.id
              ? () => {
                  if (record.target?.id && record.target.id > 0) {
                    navigate(`/graphs/targets/${record.target?.id}`);
                  } else {
                    navigate("/graphs");
                  }
                }
              : undefined
          }
          gotoColor={"targets"}
        />
        <InfosCardField label="Four" defaultContent={record.oven ?? "-"} />
        <InfosCardField
          label="Couleur"
          defaultContent={
            <ColorPicker
              value={record.color ?? { r: 0, g: 0, b: 0, a: 1 }}
              onChange={(value) => updateRecordColor({ variables: { recordId: record.id, color: value } })}
            />
          }
        />
        <InfosCardField label="Création" defaultContent={dateToDisplayString(record.createdAt, true)} />
        <InfosCardField label="Dernière modification" defaultContent={dateToDisplayString(record.updatedAt, true)} />
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
                    setRecordTarget({ variables: { recordId: record.id, targetId: targetId ?? 0 } });
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

export default RecordInfos;
