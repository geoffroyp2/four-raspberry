import { FC } from "react";

import { useSelector } from "react-redux";
import { selectTargetData } from "../_state/targetDataSlice";

import GalleryCard from "@components/cards/GalleryCard";

const TargetGallery: FC = () => {
  const target = useSelector(selectTargetData);

  const getUrls = () => {
    const photos: string[] = [];
    target.pieces?.forEach((p) => p.photos?.forEach((ph) => photos.push(ph)));
    return photos;
  };

  return <GalleryCard urls={getUrls()} />;
};

export default TargetGallery;
