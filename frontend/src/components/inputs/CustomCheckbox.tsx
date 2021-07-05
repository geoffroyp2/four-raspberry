import { FC } from "react";

type Props = {
  checked: boolean;
  onChange: (value: boolean) => void;
};

const CustomCheckbox: FC<Props> = ({ checked, onChange }) => {
  return (
    <input
      type="checkbox"
      className="form-checkbox h-4 w-4 text-gray-600 focus:shadow-outline"
      checked={checked}
      onChange={() => onChange(!checked)}
    />
  );
};

export default CustomCheckbox;
