import { FC } from "react";

import { useSelector } from "react-redux";
import { selectPieceData } from "./_state/pieceDataSlice";
import GalleryCard from "@components/cards/GalleryCard";

const PieceGallery: FC = () => {
  const piece = useSelector(selectPieceData);

  const getUrls = () => {
    const photos: { url: string; id: number }[] = [];
    piece.photos?.forEach((ph) => photos.push({ url: ph, id: piece.id ?? 0 }));
    return photos;
  };

  return <GalleryCard images={getUrls()} onImgClick={() => {}} />;
};

export default PieceGallery;
