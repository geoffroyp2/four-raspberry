import { FC, useEffect, useState } from "react";

type Props = {
  show: boolean;
  hide?: () => void;
};

const ModalBackground: FC<Props> = ({ show, hide }) => {
  const [Animation, setAnimation] = useState<string>("ease-out duration-300 opacity-0");

  useEffect(() => {
    if (show) {
      setAnimation("ease-out duration-300 opacity-0");
      setTimeout(() => {
        setAnimation("ease-out duration-300 opacity-75");
      }, 5);
    } else {
      setAnimation("ease-in duration-200 opacity-75");
      setTimeout(() => {
        setAnimation("ease-in duration-200 opacity-0");
      }, 5);
    }
  }, [show]);

  return <div className={`${Animation} fixed inset-0 bg-gray-600 transition-opacity`} onClick={hide} aria-hidden="true"></div>;
};

export default ModalBackground;
