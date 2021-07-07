import { FC } from "react";

// https://www.flaticon.com/free-icon/arrow-down-sign-to-navigate_32195

type Props = {
  size?: number;
  direction?: "ASC" | "DESC";
  className?: string;
};

const SortSign: FC<Props> = ({ className = "", direction = "ASC", size = 14 }) => {
  return (
    <svg
      className={className + " text-gray-300 fill-current"}
      viewBox="0 0 451.847 451.847"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      height={size}
    >
      <path
        d={
          direction === "ASC"
            ? "M225.923 354.706c-8.098 0-16.195-3.092-22.369-9.263L9.27 151.157c-12.359-12.359-12.359-32.397 0-44.751 12.354-12.354 32.388-12.354 44.748 0l171.905 171.915 171.906-171.909c12.359-12.354 32.391-12.354 44.744 0 12.365 12.354 12.365 32.392 0 44.751L248.292 345.449c-6.177 6.172-14.274 9.257-22.369 9.257z"
            : "M225.923 97.14c-8.098 0-16.195 3.092-22.369 9.263L9.27 300.69c-12.359 12.36-12.359 32.397 0 44.751 12.354 12.354 32.388 12.354 44.748 0l171.905-171.915 171.906 171.91c12.359 12.353 32.391 12.353 44.744 0 12.365-12.355 12.365-32.393 0-44.752L248.292 106.397c-6.177-6.172-14.274-9.257-22.369-9.257z"
        }
      />
    </svg>
  );
};

export default SortSign;
