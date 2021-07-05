import React, { FC } from "react";

// https://www.flaticon.com/free-icon/tile_875161

type Props = {
  size?: number;
};

const TileIcon: FC<Props> = ({ size = 32 }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 443.733 443.733" width={size} height={size} fill="#8844CC">
      <path d="M187.733 0H17.067C7.641 0 0 7.641 0 17.067v170.667c0 9.426 7.641 17.067 17.067 17.067h170.667c9.426 0 17.067-7.641 17.067-17.067V17.067C204.8 7.641 197.159 0 187.733 0zM426.667 0H256c-9.426 0-17.067 7.641-17.067 17.067v170.667c0 9.426 7.641 17.067 17.067 17.067h170.667c9.426 0 17.067-7.641 17.067-17.067V17.067C443.733 7.641 436.092 0 426.667 0zM187.733 238.933H17.067C7.641 238.933 0 246.574 0 256v170.667c0 9.426 7.641 17.067 17.067 17.067h170.667c9.426 0 17.067-7.641 17.067-17.067V256c-.001-9.426-7.642-17.067-17.068-17.067zM426.667 238.933H256c-9.426 0-17.067 7.641-17.067 17.067v170.667c0 9.426 7.641 17.067 17.067 17.067h170.667c9.426 0 17.067-7.641 17.067-17.067V256c-.001-9.426-7.642-17.067-17.067-17.067z" />
    </svg>
  );
};

export default TileIcon;
