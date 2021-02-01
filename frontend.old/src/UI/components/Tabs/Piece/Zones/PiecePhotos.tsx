import React from "react";
import { CurrentPieceImages } from "@redux/dataReducers/pieceSlice";

import ImageUploader from "./ImageUploader";
import ImageGallery from "@UITabs/sharedComponents/ImageGallery";
import { Container } from "react-bootstrap";

const PiecePhotos = () => {
  return (
    <>
      <ImageGallery valueSelector={CurrentPieceImages} />

      <ImageUploader />
    </>
  );
};

export default PiecePhotos;
