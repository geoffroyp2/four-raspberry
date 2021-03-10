import React, { FC, useCallback, useEffect } from "react";
import { Col, Row } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { selectRecordId, selectRecordData, selectRecordNeedsRefresh } from "./_state/recordDataSlice";
import { selectRecordEdit, selectRecordPending, setRecordEdit, setRecordPending } from "./_state/recordStateSlice";
import { setLoadTable } from "@editor/_state/editorSlice";
import { setTargetId } from "@editor/target/_state/targetDataSlice";
import { setCurrentScreen } from "@navBar/MainNavSlice";

import EditorCard from "@components/EditorCard";
import NameField from "@components/InfoCardElements/NameField";
import DescriptionField from "@components/InfoCardElements/DescriptionField";
import DateField from "@components/InfoCardElements/DateField";
import TargetField from "@components/InfoCardElements/TargetField";

import { loadRecord } from "./utils/queries";
import { saveRecordChanges } from "./utils/mutations";

const RecordInfos: FC = () => {
  const dispatch = useDispatch();
  const needsRefresh = useSelector(selectRecordNeedsRefresh);

  const recordId = useSelector(selectRecordId);
  const currentRecord = useSelector(selectRecordData);
  const editStates = useSelector(selectRecordEdit);
  const pendingStates = useSelector(selectRecordPending);

  useEffect(() => {
    const load = async () => {
      dispatch(setRecordPending({ data: true }));
      await loadRecord(recordId);
      dispatch(setRecordPending({ data: false }));
    };
    if (needsRefresh) load();
  }, [dispatch, recordId, needsRefresh]);

  const handleGoto = useCallback(() => {
    if (currentRecord.target?.id) {
      dispatch(setTargetId(currentRecord.target.id));
      dispatch(setCurrentScreen("target"));
    }
  }, [dispatch, currentRecord]);

  return (
    <EditorCard>
      {!pendingStates.data && (
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
