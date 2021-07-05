import { FC } from "react";

type Props = {
  size: number;
  className: string;
};

const ArrowLeft: FC<Props> = ({ className, size = 20 }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      height={size}
    >
      <path d="M19.707 12h-14M12.707 5l-7 7 7 7" />
    </svg>
  );
};

export default ArrowLeft;
