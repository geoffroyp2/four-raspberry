import React, { useCallback } from "react";
import { Container } from "react-bootstrap";
import "./styles/targetStyles.scss";

import { useDispatch, useSelector } from "react-redux";
import { selectTargetData } from "./_state/targetDataSlice";
import { setRecordId } from "@editor/record/_state/recordDataSlice";
import { setCurrentScreen } from "@navBar/MainNavSlice";

import EditorCard from "@components/EditorCard";
import RecordTable from "@components/Tables/RecordTable";
import GotoIcon from "@src/assets/GotoIcon";

const TargetRecords = () => {
  const dispatch = useDispatch();
  const currentTarget = useSelector(selectTargetData);

  const handleGoto = useCallback(
    (id: number) => {
      dispatch(setRecordId(id));
      dispatch(setCurrentScreen("record"));
    },
    [dispatch]
  );

  const getContent = () => {
    if (currentTarget.records)
      return currentTarget.records?.map((e, i) => (
        <tr key={`rpt${i}`}>
          <td>{e.name}</td>
          <td className="goto">
            <GotoIcon onClick={() => handleGoto(e.id || 0)} />
          </td>
          {/* <td>{e.formula?.name || "-"}</td> */}
        </tr>
      ));
    else return <></>;
  };

  return (
    <EditorCard className="targetRecords">
      <Container fluid>
        <label>Cuissons</label>
      </Container>
      <RecordTable>{getContent()}</RecordTable>
    </EditorCard>
  );
};

export default TargetRecords;
