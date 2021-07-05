import { FC, useState } from "react";

import BasicMainCard from "./BasicMainCard";
import ImageModal from "../modals/ImageModal";
import Pagination from "../tables/Pagination";

type Props = {
  images: { url: string; id: number }[];
  onImgClick?: (id: number) => void;
};

const GalleryCard: FC<Props> = ({ images, onImgClick }) => {
  const [ShowModal, setShowModal] = useState<boolean>(false);
  const [ModalUrl, setModalUrl] = useState<string>("");
  const [Page, setPage] = useState<number>(0);
  const [Selected, setSelected] = useState<number | null>(null);

  const getImgPage = () => {
    const imgPage = [];
    for (let i = Page * 12; i < images.length && i < (Page + 1) * 12; i++) {
      imgPage.push(images[i]);
    }
    return imgPage;
  };

  return (
    <>
      <BasicMainCard>
        <div className="grid grid-cols-4 gap-2 p-3">
          {getImgPage().map((e, i) => (
            <img
              className={`rounded-md shadow-md w-max cursor-pointer border-4 ${
                Selected === i ? "border-purple-500" : "border-transparent"
              } hover:border-red-500`}
              key={`img-${i}`}
              src={e.url}
              alt=""
              onClick={() => {
                onImgClick && onImgClick(e.id);
                setSelected(i);
              }}
              onDoubleClick={() => {
                setModalUrl(e.url);
                setShowModal(true);
              }}
            />
          ))}
        </div>
        <Pagination
          small
          pageAmount={Math.floor((images.length - 1) / 12)}
          currentPage={Page}
          handleSetPage={(page) => {
            setPage(page);
            setSelected(null);
          }}
        />
      </BasicMainCard>
      <ImageModal show={ShowModal} hide={() => setShowModal(false)} url={ModalUrl} />
    </>
  );
};

export default GalleryCard;
