import { FC, FormEvent, useState } from "react";

import BasicButton from "@components/buttons/BasicButton";
import SearchInput from "@components/inputs/SearchInput";

type Props = {
  placeholder: string;
  initialValue: string;
  handleSubmit: (fieldValue: string) => void;
};

const TableSearch: FC<Props> = ({ placeholder, initialValue, handleSubmit }) => {
  const [Value, setValue] = useState<string>(initialValue);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(Value);
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-sm space-x-3 justify-end">
      <div className="relative ">
        <SearchInput id="load-table-search" color="blue" placeholder={placeholder} value={Value} onChange={setValue} />
      </div>
      <BasicButton type="submit" color="blue">
        Filtrer
      </BasicButton>
    </form>
  );
};

export default TableSearch;
