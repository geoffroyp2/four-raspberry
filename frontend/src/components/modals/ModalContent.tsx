import { FC, useEffect, useState } from "react";

type Props = {
  show: boolean;
};

const ModalContent: FC<Props> = ({ show, children }) => {
  const [Animation, setAnimation] = useState<string>(
    "ease-out duration-300 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
  );

  useEffect(() => {
    if (show) {
      setAnimation("ease-out duration-300 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95");
      setTimeout(() => {
        setAnimation("ease-out duration-300 opacity-100 translate-y-0 sm:scale-100");
      }, 5);
    } else {
      setAnimation("ease-in duration-200 opacity-100 translate-y-0 sm:scale-100");
      setTimeout(() => {
        setAnimation("ease-in duration-200 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95");
      }, 5);
    }
  }, [show]);

  return (
    <>
      {/* Trick to center the modal contents */}
      <span className="hidden sm:inline-block align-middle sm:h-screen" aria-hidden="true">
        &#8203;
      </span>
      <div
        className={`${Animation} inline-block rounded-lg overflow-hidden shadow-xl transform transition-all align-middle max-w-3xl w-full`}
      >
        {children}
      </div>
    </>
  );
};

export default ModalContent;
