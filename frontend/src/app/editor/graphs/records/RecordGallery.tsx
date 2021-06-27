import { FC } from "react";

import { useDispatch, useSelector } from "react-redux";
import { selectRecordData } from "../_state/recordDataSlice";

import GalleryCard from "@components/cards/GalleryCard";
import { setPieceLoadId } from "@editor/pieces/_state/pieceDisplaySlice";

const RecordGallery: FC = () => {
  const dispatch = useDispatch();
  const record = useSelector(selectRecordData);

  const getUrls = () => {
    const photos: { url: string; id: number }[] = [];
    record.pieces?.forEach((p) => p.photos?.forEach((ph) => photos.push({ url: ph, id: p.id ?? 0 })));
    return photos;
  };

  return <GalleryCard images={getUrls()} onImgClick={(id) => dispatch(setPieceLoadId(id))} />;
};

export default RecordGallery;
