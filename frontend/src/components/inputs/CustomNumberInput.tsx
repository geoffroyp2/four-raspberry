import { FC } from "react";

type Props = {
  value: number;
  onChange: (value: number) => void;
};

const CustomNumberInput: FC<Props> = ({ value, onChange }) => {
  return (
    <div className="flex">
      <input
        type="number"
        onFocus={({ currentTarget }) => currentTarget.select()}
        className="bg-gray-100 text-gray-900 w-14 pr-2 rounded-l-md focus:shadow-outline text-right"
        value={Math.floor(value)}
        onChange={({ target }) => {
          const val = parseInt(target.value);
          if (!isNaN(val)) {
            onChange(val);
          }
        }}
        style={{
          MozAppearance: "textfield",
          WebkitAppearance: "textfield",
        }}
      />
      <span className="bg-gray-400 text-gray-800 rounded-r-md px-1 max-w-max">°C</span>
    </div>
  );
};

export default CustomNumberInput;
