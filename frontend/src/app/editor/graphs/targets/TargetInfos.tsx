import { FC, useEffect, useState } from "react";

import { useMutation } from "@apollo/client";
import { Target } from "@app/_types/dbTypes";

import { useDispatch, useSelector } from "react-redux";
import { selectTargetData, setTargetData } from "../_state/targetDataSlice";

import InfosCard, { InfosCardField } from "@components/cards/InfosCard";
import CustomSelect from "@components/inputs/CustomSelect";
import CustomInput from "@components/inputs/CustomInput";
import CustomTextArea from "@components/inputs/CustomTextArea";

import { dateToDisplayString } from "@app/_utils/dateFormat";
import { getUpdateTargetMutation } from "../_gql/mutations";

const TargetInfos: FC = () => {
  const dispatch = useDispatch();

  const target = useSelector(selectTargetData);

  const [NameEditValue, setNameEditValue] = useState<string>(target.name ?? "");
  const [DescriptionEditValue, setDescriptionEditValue] = useState<string>(target.description ?? "");

  useEffect(() => {
    setNameEditValue(target.name ?? "");
    setDescriptionEditValue(target.description ?? "");
  }, [target]);

  const [updateTargetName] = useMutation<{ updateTarget: Target }>(getUpdateTargetMutation("name"), {
    onCompleted: ({ updateTarget }) => {
      dispatch(setTargetData(updateTarget));
    },
  });

  const [updateTargetDescription] = useMutation<{ updateTarget: Target }>(getUpdateTargetMutation("description"), {
    onCompleted: ({ updateTarget }) => {
      dispatch(setTargetData(updateTarget));
    },
  });

  const [updateTargetOven] = useMutation<{ updateTarget: Target }>(getUpdateTargetMutation("oven"), {
    onCompleted: ({ updateTarget }) => {
      dispatch(setTargetData(updateTarget));
    },
  });

  return (
    <>
      <InfosCard>
        <InfosCardField
          label="Nom"
          defaultContent={target.name ?? "-"}
          editContent={<CustomInput value={NameEditValue} onChange={setNameEditValue} />}
          confirmChange={() => updateTargetName({ variables: { targetId: target.id, name: NameEditValue } })}
          discardChange={() => {
            setNameEditValue(target.name ?? "");
          }}
        />
        <InfosCardField
          label="Description"
          defaultContent={target.description ?? "-"}
          editContent={<CustomTextArea value={DescriptionEditValue} onChange={setDescriptionEditValue} />}
          confirmChange={() => updateTargetDescription({ variables: { targetId: target.id, description: DescriptionEditValue } })}
          discardChange={() => setDescriptionEditValue(target.description ?? "")}
        />
        <InfosCardField
          label="Four"
          defaultContent={
            <CustomSelect
              value={target.oven ?? "electrique"}
              onChange={(value) => updateTargetOven({ variables: { targetId: target.id, oven: value } })}
            >
              <option value="electrique">Electrique</option>
              <option value="gaz">Gaz</option>
            </CustomSelect>
          }
        />
        <InfosCardField label="Création" defaultContent={dateToDisplayString(target.createdAt, true)} />
        <InfosCardField label="Dernière modification" defaultContent={dateToDisplayString(target.updatedAt, true)} />
      </InfosCard>
    </>
  );
};

export default TargetInfos;
