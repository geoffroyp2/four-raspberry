import { FC } from "react";

import GalleryCard from "@components/cards/GalleryCard";
import { useSelector } from "react-redux";
import { selectRecordData } from "../_state/recordDataSlice";

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
