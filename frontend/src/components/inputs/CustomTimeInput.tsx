import { FC } from "react";

type Props = {
  value: number;
  onChange: (value: number) => void;
};

const CustomTimeInput: FC<Props> = ({ value, onChange }) => {
  const hours = Math.floor(value / 3600);
  const minutes = Math.floor((Math.floor(value / 60) % 60) / 5) * 5; // Rounded down with a step of 5

  return (
    <div className="p-y-1 px-2 bg-gray-100 rounded-md shadow-md">
      <select
        className="appearance-none outline-none text-gray-800 bg-transparent cursor-pointer text-right"
        value={hours}
        onChange={({ target }) => onChange(parseInt(target.value) * 3600 + minutes * 60)}
      >
        {[...Array(24)].map((_, i) => (
          <option key={`hours-${i}`} value={i}>
            {i}
          </option>
        ))}
      </select>
      <span className="text-gray-900 ">:</span>
      <select
        className="appearance-none outline-none text-gray-800 bg-transparent cursor-pointer text-left"
        value={minutes}
        onChange={({ target }) => onChange(hours * 3600 + parseInt(target.value) * 60)}
      >
        {[...Array(12)].map((_, i) => (
          <option key={`minutes-${i * 5}`} value={i * 5}>
            {i * 5}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomTimeInput;
