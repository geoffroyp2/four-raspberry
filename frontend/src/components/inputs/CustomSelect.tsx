import { FC } from "react";

type Props = {
  className?: string;
  value: string;
  onChange: (value: string) => void;
};

const CustomSelect: FC<Props> = ({ className, value, children, onChange }) => {
  return (
    <div className={(className ?? "") + "relative inline-block w-full text-gray-700"}>
      <select
        value={value}
        onChange={({ target }) => onChange(target.value)}
        className="w-full pl-3 pr-6 text-base border rounded-md appearance-none focus:shadow-outline"
      >
        {children}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default CustomSelect;
