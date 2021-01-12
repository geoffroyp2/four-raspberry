import React from "react";
import { Carousel } from "react-bootstrap";

import { RootState } from "@src/redux/store";
import { useSelector } from "react-redux";

type Props = {
  valueSelector: (state: RootState) => string[];
};

const ImageGallery = ({ valueSelector }: Props) => {
  const images = useSelector(valueSelector);

  return (
    <Carousel>
      {images.map((item, idx) => {
        return (
          <Carousel.Item key={`img${idx}`} className="d-flex flex-column justify-content-between align-items-center">
            <img
              className="d-block rounded"
              style={{ maxHeight: "100%", maxWidth: "90%", border: "solid 1px rgba(10,10,10,0.8)" }}
              src={`http://192.168.0.121:3003/${item}`}
              alt={`#${idx}`}
            />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default ImageGallery;
