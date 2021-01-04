import React from "react";

type Props = {
  size: number;
  onClick: () => void;
};

const ElementLinkButton = ({ size, onClick }: Props) => {
  return (
    <div onClick={onClick} className="d-flex align-content-center justify-content-center">
      <svg xmlns="http://www.w3.org/2000/svg" width={`${size}`} height={`${size}`} fill="#655ba3" viewBox="0 0 16 16">
        <path
          fillRule="evenodd"
          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-11.5.5a.5.5 0 0 1 0-1h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5z"
        />
      </svg>
    </div>
  );
};

export default ElementLinkButton;
