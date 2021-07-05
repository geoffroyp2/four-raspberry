import { FC } from "react";

type Props = {
  value: number;
  onChange: (value: number) => void;
};

const CustomTemperatureInput: FC<Props> = ({ value, onChange }) => {
  return (
    <div className="flex">
      <input
        type="number"
        onFocus={({ currentTarget }) => currentTarget.select()}
        className="bg-gray-100 text-gray-900 w-12 pr-2 rounded-l focus:shadow-outline text-right"
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
      <span className="inline-block bg-gray-400 text-gray-800 rounded-r px-1">°C</span>
    </div>
  );
};

export default CustomTemperatureInput;
