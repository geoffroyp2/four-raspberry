import { FC } from "react";
import { Link } from "react-router-dom";

type Props = {
  link: string;
  text: string;
};

const NavButton: FC<Props> = ({ link, text }) => {
  return (
    <span className={`mr-5 hover:text-white rounded-sm`}>
      <Link to={link}>{text}</Link>
    </span>
  );
};

export default NavButton;
