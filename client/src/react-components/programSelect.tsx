import React, { useCallback, useState } from "react";
import { ProgramInfo } from "../interfaces/programInterfaces";

interface Props {
  programList: ProgramInfo[];
  programSelectChange: (event: number) => void;
}

const ProgramSelect = ({ programList, programSelectChange }: Props) => {
  const [selected, setSelected] = useState<number>(0);

  const onSelectChange = useCallback(
    (event: any): void => {
      setSelected(event.target.value);
      programSelectChange(event.target.value);
    },
    [programSelectChange]
  );

  return (
    <select onChange={onSelectChange} defaultValue={selected}>
      {programList.map((p) => {
        return (
          <option value={p.id} key={p.id}>
            {p.name}
          </option>
        );
      })}
    </select>
  );
};

export default ProgramSelect;
