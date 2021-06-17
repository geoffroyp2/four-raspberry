import { FC, useState } from "react";

import BasicMainCard from "./BasicMainCard";
import ImageModal from "../modals/ImageModal";

type Props = {
  urls: string[];
};

const GalleryCard: FC<Props> = ({ urls }) => {
  const [ShowModal, setShowModal] = useState<boolean>(false);
  const [ModalUrl, setModalUrl] = useState<string>("");

  return (
    <>
      <BasicMainCard>
        <div className="grid grid-cols-4 gap-2 p-3">
          {urls.map((e, i) => (
            <img
              className="rounded-md shadow-md w-max cursor-pointer border-4 border-transparent hover:border-red-500"
              key={`img-${i}`}
              src={e}
              alt=""
              onDoubleClick={() => {
                setModalUrl(e);
                setShowModal(true);
              }}
            />
          ))}
        </div>
      </BasicMainCard>
      <ImageModal show={ShowModal} hide={() => setShowModal(false)} url={ModalUrl} />
    </>
  );
};

export default GalleryCard;
