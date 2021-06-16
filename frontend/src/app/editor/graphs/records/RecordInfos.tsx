import { FC, useEffect, useState } from "react";

import { useMutation } from "@apollo/client";
import { getUpdateRecordMutation } from "../_gql/mutations";
import { Record } from "@app/_types/dbTypes";

import { useDispatch, useSelector } from "react-redux";
import { selectRecordData, setRecordData } from "../_state/recordDataSlice";

import InfosCard, { InfosCardField } from "@components/cards/InfosCard";
import { dateToDisplayString } from "@app/_utils/dateFormat";

const RecordInfos: FC = () => {
  const dispatch = useDispatch();
  const record = useSelector(selectRecordData);
  const [NameEditValue, setNameEditValue] = useState<string>(record.name ?? "");
  const [DescriptionEditValue, setDescriptionEditValue] = useState<string>(record.description ?? "");

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

  return (
    <InfosCard>
      <InfosCardField
        label="Nom"
        defaultContent={record.name ?? "-"}
        editContent={
          <input className="text-gray-900" value={NameEditValue} onChange={({ target }) => setNameEditValue(target.value)} />
        }
        confirmChange={() => updateRecordName({ variables: { recordId: record.id, name: NameEditValue } })}
        discardChange={() => {
          setNameEditValue(record.name ?? "");
        }}
      />
      <InfosCardField
        label="Description"
        defaultContent={record.description ?? "-"}
        editContent={
          <textarea
            className="text-gray-900"
            value={DescriptionEditValue}
            onChange={({ target }) => setDescriptionEditValue(target.value)}
          />
        }
        confirmChange={() => updateRecordDescription({ variables: { recordId: record.id, description: DescriptionEditValue } })}
        discardChange={() => setNameEditValue(record.description ?? "")}
      />
      <InfosCardField label="Courbe de référence" defaultContent={record.target?.name ?? "-"} />
      <InfosCardField label="Four" defaultContent={record.oven ?? "-"} />
      <InfosCardField label="Création" defaultContent={dateToDisplayString(record.createdAt, true)} />
      <InfosCardField label="Dernière modification" defaultContent={dateToDisplayString(record.updatedAt, true)} />
    </InfosCard>
  );
};

export default RecordInfos;
