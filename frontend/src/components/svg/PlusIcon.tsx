import { FC } from "react";

//https://www.flaticon.com/free-icon/add_561169

type Props = {
  size?: number;
  onClick?: () => void;
};

const ConfirmIcon: FC<Props> = ({ size = 20, onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={`fill-current text-green-600 ${onClick ? "hover:text-green-500 cursor-pointer" : ""}`}
      onClick={onClick}
    >
      <path d="M257 0C116.39 0 0 114.39 0 255s116.39 257 257 257 255-116.39 255-257S397.61 0 257 0zm135 285H287v107c0 16.54-13.47 30-30 30-16.54 0-30-13.46-30-30V285H120c-16.54 0-30-13.46-30-30s13.46-30 30-30h107V120c0-16.54 13.46-30 30-30 16.53 0 30 13.46 30 30v105h105c16.53 0 30 13.46 30 30s-13.47 30-30 30z" />
    </svg>
  );
};

export default ConfirmIcon;
