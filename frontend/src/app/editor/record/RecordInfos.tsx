import React, { FC, useCallback, useEffect } from "react";
import { Col, Row } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { selectRecordId, selectRecordData } from "./_state/recordDataSlice";
import { selectRecordEdit, selectRecordPending, setRecordEdit, setRecordPending } from "./_state/recordStateSlice";
import { setLoadTable } from "@editor/_state/editorSlice";
import { setCurrentTargetId } from "@editor/target/_state/targetDataSlice";
import { setCurrentScreen } from "@navBar/MainNavSlice";

import EditorCard from "@components/EditorCard";
import NameField from "@components/InfoCardElements/NameField";
import DescriptionField from "@components/InfoCardElements/DescriptionField";
import DateField from "@components/InfoCardElements/DateField";
import TargetField from "@components/InfoCardElements/TargetField";

import { loadRecord } from "./utils/loadData";
import { saveRecordChanges } from "./utils/editRequests";

const RecordInfos: FC = () => {
  const dispatch = useDispatch();
  const recordId = useSelector(selectRecordId);
  const record = useSelector(selectRecordData);
  const editStates = useSelector(selectRecordEdit);
  const pendingStates = useSelector(selectRecordPending);

  useEffect(() => {
    const load = async () => {
      dispatch(setRecordPending({ data: true }));
      await loadRecord(recordId);
      dispatch(setRecordPending({ data: false }));
    };
    if (record.id !== recordId) load();
  }, [dispatch, recordId, record]);

  const handleGoto = useCallback(() => {
    if (record.target?.id) {
      dispatch(setCurrentTargetId(record.target.id));
      dispatch(setCurrentScreen("target"));
    }
  }, [dispatch, record]);

  return (
    <EditorCard>
      {pendingStates.data ? (
        <></>
      ) : (
        <Row>
          <Col md={6} sm={12}>
            <NameField
              data={selectRecordData}
              validate={saveRecordChanges}
              edit={editStates.name}
              setEdit={(val: boolean) => dispatch(setRecordEdit({ name: val }))}
              pending={pendingStates.name}
            />
            <DescriptionField
              data={selectRecordData}
              validate={saveRecordChanges}
              edit={editStates.description}
              setEdit={(val: boolean) => dispatch(setRecordEdit({ description: val }))}
              pending={pendingStates.description}
            />
          </Col>
          <Col md={6} sm={12}>
            <TargetField
              data={selectRecordData}
              setShowTable={(val: boolean) => dispatch(setLoadTable({ target: val }))}
              goto={handleGoto}
            />
            <DateField data={selectRecordData} />
          </Col>
        </Row>
      )}
    </EditorCard>
  );
};

export default RecordInfos;
