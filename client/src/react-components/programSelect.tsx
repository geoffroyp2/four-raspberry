import React, { useCallback, useState } from "react";

import { IGraph } from "../../../db/src/models/graph/types";

interface Props {
  programList: IGraph[];
  programSelectChange: (event: number) => void;
}

const ProgramSelect = ({ programList, programSelectChange }: Props) => {
  const [selected, setSelected] = useState<number>(0);

  const onSelectChange = useCallback(
    (event: any): void => {
      setSelected(event.target.selectedIndex);
      programSelectChange(event.target.selectedIndex);
    },
    [programSelectChange]
  );

  return (
    <select onChange={onSelectChange} defaultValue={selected}>
      {programList.map((p) => {
        return (
          <option value={p.name} key={p.name}>
            {p.name}
          </option>
        );
      })}
    </select>
  );
};

export default ProgramSelect;
