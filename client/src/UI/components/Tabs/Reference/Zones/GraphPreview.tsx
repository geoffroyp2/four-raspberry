import React, { useCallback } from "react";
import { Container } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import PointEditButton from "@UITabs/sharedComponents/Buttons/PointEditButton";
import { setReferencePointEditMode } from "@redux/displayStateReducers/referenceDisplaySlice";
import {
  CurrentReferenceColor,
  CurrentReferenceID,
  CurrentReferencePoints,
  memorizeReference,
} from "@redux/dataReducers/referenceSlice";

import SimpleGraph from "@UITabs/sharedComponents/SimpleGraph";

const ReferenceGraphPreview = () => {
  const dispatch = useDispatch();
  const currentReferenceID = useSelector(CurrentReferenceID);

  const handleEdit = useCallback(() => {
    dispatch(memorizeReference());
    dispatch(setReferencePointEditMode(true));
  }, [dispatch]);

  return (
    <Container
      fluid
      className="m-0 p-1 pt-2 rounded shadow"
      style={{ backgroundColor: "#232323", border: "solid 1px rgba(10,10,10,0.8)" }}
    >
      <SimpleGraph pointsSelector={CurrentReferencePoints} colorSelector={CurrentReferenceColor} refPoints={null} />
      <PointEditButton disabled={currentReferenceID === "default"} clickCallback={handleEdit} />
    </Container>
  );
};

export default ReferenceGraphPreview;
