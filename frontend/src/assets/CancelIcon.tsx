import React, { FC } from "react";

//https://www.flaticon.com/free-icon/error_483328

type Props = {
  size?: number;
  onClick: () => void;
};

const CancelIcon: FC<Props> = ({ size = 20, onClick }) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 300"
      width={size}
      height={size}
      fill="#C02020"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M256 0C114.844 0 0 114.844 0 256s114.844 256 256 256 256-114.844 256-256S397.156 0 256 0zm103.54 329.374c4.167 4.165 4.167 10.919 0 15.085l-15.08 15.081c-4.167 4.165-10.919 4.165-15.086 0L256 286.167l-73.374 73.374c-4.167 4.165-10.919 4.165-15.086 0l-15.081-15.082c-4.167-4.165-4.167-10.919 0-15.085l73.374-73.375-73.374-73.374c-4.167-4.165-4.167-10.919 0-15.085l15.081-15.082c4.167-4.165 10.919-4.165 15.086 0L256 225.832l73.374-73.374c4.167-4.165 10.919-4.165 15.086 0l15.081 15.082c4.167 4.165 4.167 10.919 0 15.085l-73.374 73.374 73.373 73.375z" />
      </svg>
    </svg>
  );
};

export default CancelIcon;
