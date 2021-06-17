import { FC, useEffect, useState } from "react";

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
  const [BgAnimation, setBgAnimation] = useState<string>("display-none");
  const [ImgAnimation, setImgAnimation] = useState<string>("display-none");

  useEffect(() => {
    if (show) {
      setMount(show);
      setBgAnimation("ease-out duration-300 opacity-0");
      setImgAnimation("ease-out duration-300 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95");
      setTimeout(() => {
        setBgAnimation("ease-out duration-300 opacity-75");
        setImgAnimation("ease-out duration-300 opacity-100 translate-y-0 sm:scale-100");
      }, 5);
    } else {
      setBgAnimation("ease-in duration-200 opacity-75");
      setImgAnimation("ease-in duration-200 opacity-100 translate-y-0 sm:scale-100");
      setTimeout(() => {
        setBgAnimation("ease-in duration-200 opacity-0");
        setImgAnimation("ease-in duration-200 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95");
      }, 5);
      setTimeout(() => setMount(show), 200);
    }
  }, [show]);

  if (!Mount) return <></>;
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen px-4">
        {/* Gray Background element */}
        <div
          className={`${BgAnimation} fixed inset-0 bg-gray-600 transition-opacity`}
          onClick={() => hide()}
          aria-hidden="true"
        ></div>

        {/* Trick to center the modal contents */}
        <span className="hidden sm:inline-block align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div
          className={`${ImgAnimation} inline-block rounded-lg overflow-hidden shadow-xl transform transition-all align-middle max-w-3xl w-full`}
        >
          <img src={url} alt="" />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
