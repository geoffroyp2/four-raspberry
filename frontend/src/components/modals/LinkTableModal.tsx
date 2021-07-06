import { FC, ReactNode, useEffect, useState } from "react";

import ModalBackground from "./ModalBackground";
import ModalContent from "./ModalContent";

type Props = {
  show: boolean;
  title: ReactNode;
  table: ReactNode;
  onHide: () => void;
};

const LinkTableModal: FC<Props> = ({ show, title, table, onHide }) => {
  const [Mount, setMount] = useState<boolean>(false);

  useEffect(() => {
    if (show) {
      setMount(show);
    } else {
      setTimeout(() => setMount(show), 210); // Unmount after animation is finished
    }
  }, [show]);

  if (!Mount) return <></>;
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen px-4">
        <ModalBackground show={show} hide={onHide} />
        <ModalContent show={show}>
          <div className="grid grid-cols-1 bg-gray-800 px-4 pb-3 pt-4">
            {title}
            {table}{" "}
          </div>
        </ModalContent>
      </div>
    </div>
  );
};

export default LinkTableModal;
