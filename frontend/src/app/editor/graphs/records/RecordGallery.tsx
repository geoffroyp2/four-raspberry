import { FC } from "react";

import { useSelector } from "react-redux";
import { selectRecordData } from "../_state/recordDataSlice";

import GalleryCard from "@components/cards/GalleryCard";

const RecordGallery: FC = () => {
  const record = useSelector(selectRecordData);

  const getUrls = () => {
    const photos: string[] = [];
    record.pieces?.forEach((p) => p.photos?.forEach((ph) => photos.push(ph)));
    return photos;
  };

  return <GalleryCard urls={getUrls()} />;
};

export default RecordGallery;
