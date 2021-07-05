import { FC } from "react";

import { useDispatch, useSelector } from "react-redux";
import { selectTargetData } from "../_state/targetDataSlice";

import GalleryCard from "@components/cards/GalleryCard";
import { setPieceLoadId } from "@editor/pieces/_state/pieceDisplaySlice";

const TargetGallery: FC = () => {
  const dispatch = useDispatch();
  const target = useSelector(selectTargetData);

  const getUrls = () => {
    const photos: { url: string; id: number }[] = [];
    target.pieces?.forEach((p) => p.photos?.forEach((ph) => photos.push({ url: ph, id: p.id ?? 0 })));
    return photos;
  };

  return <GalleryCard images={getUrls()} onImgClick={(id) => dispatch(setPieceLoadId(id))} />;
};

export default TargetGallery;
