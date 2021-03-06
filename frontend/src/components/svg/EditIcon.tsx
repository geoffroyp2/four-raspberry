import { FC } from "react";

//https://www.flaticon.com/free-icon/pencil_181540

type Props = {
  size?: number;
  onClick?: () => void;
};

const EditIcon: FC<Props> = ({ size = 20, onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 300"
      width={size}
      height={size}
      className={`fill-current text-cyan-600 ${onClick ? "hover:text-cyan-500 cursor-pointer" : ""}`}
      onClick={onClick}
    >
      <path d="M149.996 0C67.157 0 .001 67.161.001 149.997S67.157 300 149.996 300s150.003-67.163 150.003-150.003S232.835 0 149.996 0zm71.306 107.945l-14.247 14.247-29.001-28.999-11.002 11.002 29.001 29.001-71.132 71.126-28.999-28.996-11.002 11.002 28.999 28.999-7.088 7.088-.135-.135a5.612 5.612 0 01-3.582 2.575l-27.043 6.03a5.61 5.61 0 01-5.197-1.512 5.613 5.613 0 01-1.512-5.203l6.027-27.035a5.631 5.631 0 012.578-3.582l-.137-.137L192.3 78.941a4.304 4.304 0 016.082.005l22.922 22.917a4.302 4.302 0 01-.002 6.082z" />
    </svg>
  );
};

export default EditIcon;
