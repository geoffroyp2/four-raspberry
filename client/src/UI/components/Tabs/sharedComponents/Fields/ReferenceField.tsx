import React, { useCallback } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { infoLeftCol, infoMidCol, infoRow, divider } from "../styles/InfoZoneStyles";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@src/redux/store";
import { dbDataReference } from "@redux/dataReducers/dbDataSlice";
import { loadReference } from "@redux/dataReducers/referenceSlice";
import { setCurrentTab } from "@redux/displayStateReducers/generalDisplaySlice";

import ElementLinkButton from "../Buttons/ElementLinkButton";

type Props = {
  editSelector: (state: RootState) => boolean;
  valueSelector: (state: RootState) => string;
  selectHandler: () => void;
};

const ReferenceField = ({ editSelector, valueSelector, selectHandler }: Props) => {
  const dispatch = useDispatch();
  const editMode = useSelector(editSelector);
  const dbReferences = useSelector(dbDataReference);
  const reference = useSelector(valueSelector);

  const handleReferenceLink = useCallback(() => {
    dispatch(loadReference(dbReferences[reference]));
    dispatch(setCurrentTab("Reference"));
  }, [dispatch, dbReferences, reference]);

  return (
    <>
      <Row className={infoRow}>
        <Col className={infoLeftCol}>Courbe de Référence</Col>
        <Col className={infoMidCol}>
          <span>{dbReferences[reference]?.name || "-"}</span>
          {editMode ? (
            <Button className="btn-sm btn-secondary float-right" onClick={selectHandler}>
              Selectionner
            </Button>
          ) : (
            reference && (
              <div className="float-right mr-2 mt-2">
                <ElementLinkButton size={20} onClick={handleReferenceLink} />
              </div>
            )
          )}
        </Col>
      </Row>
      {divider}
    </>
  );
};

export default ReferenceField;
