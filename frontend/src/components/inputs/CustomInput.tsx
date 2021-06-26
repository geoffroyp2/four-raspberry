import { FC } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const CustomInput: FC<Props> = ({ value, onChange }) => {
  return (
    <input
      autoFocus
      onFocus={({ currentTarget }) => currentTarget.select()}
      className="text-gray-900 w-full px-3 rounded-md  focus:shadow-outline"
      value={value}
      onChange={({ target }) => onChange(target.value)}
    />
  );
};

export default CustomInput;
