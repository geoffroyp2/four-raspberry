import React, { BaseSyntheticEvent, FC, useEffect, useState } from "react";
import { Button, Carousel, CarouselItem, Col, Container, Modal, Row } from "react-bootstrap";

import "../styles/images.scss";

type Props = {
  photos: string[];
  showButtons: boolean;
  uploadImage?: (event: BaseSyntheticEvent) => void;
  deleteImage?: (index: number) => void;
};

const ImageZone: FC<Props> = ({ photos, uploadImage, deleteImage, showButtons }) => {
  const [selected, setSelected] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);

  // TODO: pagination for currentPage
  // TODO: double click to display carousel modal

  useEffect(() => {
    setSelected(photos.length - 1);
    setCurrentPage(Math.floor((photos.length - 1) / 12));
  }, [photos]);

  const getMosaic = () => {
    if (photos.length === 0) return <></>;

    const images: JSX.Element[] = [];
    for (let i = currentPage * 12; i < (currentPage + 1) * 12; i++) {
      if (i >= photos.length) break;
      images.push(
        <img
          className={`${i === selected ? "img-selected" : ""}`}
          src={photos[i]}
          alt={`${i}`}
          onClick={() => setSelected(i)}
          onDoubleClick={() => setShowModal(true)}
        />
      );
    }

    return images;
  };

  return (
    <>
      <Modal centered show={showModal} onHide={() => setShowModal(false)} dialogClassName="modal-images">
        <Modal.Body>
          <Carousel
            interval={null}
            className="img-carousel w-100"
            activeIndex={selected}
            onSelect={(idx, e) => {
              setSelected(idx);
            }}
          >
            {photos.map((url, idx) => (
              <CarouselItem key={`img-${idx}`}>
                <img className="d-block w-100" src={url} alt={`${idx}`} />
              </CarouselItem>
            ))}
          </Carousel>
        </Modal.Body>
      </Modal>
      <Container fluid>
        <Row className="w-100 m-0">
          <Col className="p-0">
            <div className="images-mosaic">{getMosaic()}</div>
          </Col>
        </Row>
        {showButtons && uploadImage && deleteImage && (
          <Row>
            <Col className="images-col">
              <label htmlFor="images-input" className="button btn btn-info">
                Ajouter
              </label>
              <input id="images-input" type="file" className="images-input" required onChange={uploadImage} />
              <Button onClick={() => deleteImage(selected)} className="m-1 btn-danger">
                Supprimer
              </Button>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default ImageZone;
