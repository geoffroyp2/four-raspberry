import { FC } from "react";

import { useDispatch, useSelector } from "react-redux";
import { selectFormulaData } from "./_state/formulaDataSlice";

import GalleryCard from "@components/cards/GalleryCard";
import { setPieceLoadId } from "@editor/pieces/_state/pieceDisplaySlice";

const FormulaGallery: FC = () => {
  const dispatch = useDispatch();
  const formula = useSelector(selectFormulaData);

  const getUrls = () => {
    const photos: { url: string; id: number }[] = [];
    formula.pieces?.forEach((p) => p.photos?.forEach((ph) => photos.push({ url: ph, id: p.id ?? 0 })));
    return photos;
  };

  return <GalleryCard images={getUrls()} onImgClick={(id) => dispatch(setPieceLoadId(id))} />;
};

export default FormulaGallery;
