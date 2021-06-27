import { FC, useState } from "react";

import BasicMainCard from "./BasicMainCard";
import ImageModal from "../modals/ImageModal";
import Pagination from "../tables/Pagination";

type Props = {
  urls: string[];
};

const GalleryCard: FC<Props> = ({ urls }) => {
  const [ShowModal, setShowModal] = useState<boolean>(false);
  const [ModalUrl, setModalUrl] = useState<string>("");
  const [Page, setPage] = useState<number>(0);

  const getImgPage = () => {
    const imgPage = [];
    for (let i = Page * 12; i < urls.length && i < (Page + 1) * 12; i++) {
      imgPage.push(urls[i]);
    }
    return imgPage;
  };

  return (
    <>
      <BasicMainCard>
        <div className="grid grid-cols-4 gap-2 p-3">
          {getImgPage().map((e, i) => (
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
        <Pagination small pageAmount={Math.floor(urls.length / 12)} currentPage={Page} handleSetPage={setPage} />
      </BasicMainCard>
      <ImageModal show={ShowModal} hide={() => setShowModal(false)} url={ModalUrl} />
    </>
  );
};

export default GalleryCard;
