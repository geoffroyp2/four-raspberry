import { FC, FormEvent } from "react";

import BasicButton from "@components/buttons/BasicButton";
import SearchInput from "@components/inputs/SearchInput";

type Props = {
  placeholder: string;
  handleSubmit: (fieldValue: string) => void;
};

const TableSearch: FC<Props> = ({ placeholder, handleSubmit }) => {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const elements = (e.target as HTMLFormElement).elements;
    const value = (elements.namedItem("load-table-search") as HTMLInputElement)?.value;

    if (value !== undefined) {
      handleSubmit(value);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-sm space-x-3 justify-end">
      <div className="relative ">
        <SearchInput id="load-table-search" color="blue" placeholder={placeholder} />
      </div>
      <BasicButton type="submit" color="blue">
        Filtrer
      </BasicButton>
    </form>
  );
};

export default TableSearch;
