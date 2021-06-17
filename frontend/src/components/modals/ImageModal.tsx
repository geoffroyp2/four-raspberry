import { FC, useEffect, useState } from "react";

import ModalBackground from "./ModalBackground";
import ModalContent from "./ModalContent";

/**
 * Animation:
 * 1. Mount html components with starting transition properties
 * 2. Right after (setTimeout 5ms) change properties to end of transition
 *
 * 3. When unmounting: set properties to start of unmount transition
 * 4. Right after (setTimeout 5ms) change properties to end of transition
 * 5. When transition is fully finished (setTimeout 200ms), unmount component
 */

type Props = {
  show: boolean;
  hide: () => void;
  url: string;
};

const ImageModal: FC<Props> = ({ show, hide, url }) => {
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
        <ModalBackground show={show} hide={hide} />
        <ModalContent show={show}>
          <img src={url} alt="" />
        </ModalContent>
      </div>
    </div>
  );
};

export default ImageModal;
