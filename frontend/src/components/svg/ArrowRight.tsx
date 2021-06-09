import { FC } from "react";

type Props = {
  size: number;
  className: string;
};

const ArrowRight: FC<Props> = ({ className, size = 20 }) => {
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
      <path d="M5 12h14"></path>
      <path d="M12 5l7 7-7 7"></path>
    </svg>
  );
};

export default ArrowRight;
