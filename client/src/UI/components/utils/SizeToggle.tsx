import React from "react";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

import { useDispatch, useSelector } from "react-redux";
import { displaySize, setDisplaySize } from "../../redux/reducers/UIControlsSlice";

const SizeToggle = () => {
  const dispatch = useDispatch();
  const displaySizeState = useSelector(displaySize);

  return (
    <BootstrapSwitchButton checked={displaySizeState} onChange={() => dispatch(setDisplaySize(!displaySizeState))} size="xs" />
  );
};

export default SizeToggle;
