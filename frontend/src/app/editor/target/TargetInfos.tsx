import React, { FC, useEffect } from "react";
import { Col, Row } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { selectTargetData, selectTargetId, selectTargetNeedsRefresh } from "./_state/targetDataSlice";
import { selectTargetEdit, selectTargetPending, setTargetEdit, setTargetPending } from "./_state/targetStateSlice";

import EditorCard from "@components/EditorCard";
import NameField from "@components/InfoCardElements/NameField";
import DescriptionField from "@components/InfoCardElements/DescriptionField";
import DateField from "@components/InfoCardElements/DateField";
// import TargetField from "@components/InfoCardElements/TargetField";

import { loadTarget } from "./utils/loadData";
import { saveTargetChanges } from "./utils/editRequests";
import OvenField from "@components/InfoCardElements/OvenField";

const TargetInfos: FC = () => {
  const dispatch = useDispatch();
  const needsRefresh = useSelector(selectTargetNeedsRefresh);
  const targetId = useSelector(selectTargetId);
  const target = useSelector(selectTargetData);
  const editStates = useSelector(selectTargetEdit);
  const pendingStates = useSelector(selectTargetPending);

  useEffect(() => {
    const load = async () => {
      dispatch(setTargetPending({ data: true }));
      await loadTarget(targetId);
      dispatch(setTargetPending({ data: false }));
    };
    if (needsRefresh || target.id !== targetId) load();
  }, [dispatch, targetId, target, needsRefresh]);

  return (
    <EditorCard>
      {pendingStates.data ? (
        <></>
      ) : (
        <Row>
          <Col md={6} sm={12}>
            <NameField
              data={selectTargetData}
              validate={saveTargetChanges}
              edit={editStates.name}
              setEdit={(val: boolean) => dispatch(setTargetEdit({ name: val }))}
              pending={pendingStates.name}
            />
            <DescriptionField
              data={selectTargetData}
              validate={saveTargetChanges}
              edit={editStates.description}
              setEdit={(val: boolean) => dispatch(setTargetEdit({ description: val }))}
              pending={pendingStates.description}
            />
          </Col>
          <Col md={6} sm={12}>
            <OvenField data={selectTargetData} validate={saveTargetChanges} pending={pendingStates.oven} />
            <DateField data={selectTargetData} />
          </Col>
        </Row>
      )}
    </EditorCard>
  );
};

export default TargetInfos;
