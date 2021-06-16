import { FC } from "react";
import { Link } from "react-router-dom";

const NotFound: FC = () => {
  return (
    <>
      <div>ELEMENT NOT FOUND</div>
      <Link to="/">Go Back</Link>
    </>
  );
};

export default NotFound;
