import React, { BaseSyntheticEvent, FC, useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Button, Carousel, CarouselItem, Container, Form, FormFile, Row } from "react-bootstrap";

import { useSelector } from "react-redux";
import { selectPieceData } from "./_state/pieceDataSlice";

import EditorCard from "@components/EditorCard";
import "./styles/pieceStyles.scss";
import { loadPiece } from "./utils/queries";
import { setNeedRefresh } from "@editor/_shared/setNeedsRefresh";

const UPLOAD = gql`
  mutation ($file: Upload!, $pieceId: Int!) {
    uploadImage(file: $file, pieceId: $pieceId)
  }
`;

const DELETE = gql`
  mutation ($pieceId: Int!, $url: String!) {
    deleteImage(pieceId: $pieceId, url: $url)
  }
`;

const PiecePhotos: FC = () => {
  const piece = useSelector(selectPieceData);
  const [uploadMutation] = useMutation(UPLOAD);
  const [deleteMutation] = useMutation(DELETE);
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    setIndex((piece.photos?.length ?? 1) - 1);
  }, [piece]);

  const handleSubmit = async (event: BaseSyntheticEvent) => {
    event.preventDefault();
    const variables = { file: event.target[0].files[0], pieceId: piece.id };
    const { data } = await uploadMutation({ variables });

    if (data.uploadImage) {
      await loadPiece(piece.id ?? 0);
      setNeedRefresh("piece");
    }
  };

  const deletePhoto = async () => {
    if (!piece.photos) return;
    const variables = { pieceId: piece.id, url: piece.photos[index] ?? "" };
    const { data } = await deleteMutation({ variables });

    if (data.deleteImage) {
      await loadPiece(piece.id ?? 0);
      setNeedRefresh("piece");
    }
  };

  return (
    <EditorCard>
      <Row>
        <Carousel
          interval={null}
          className="img-carousel w-100"
          activeIndex={index}
          onSelect={(idx, e) => {
            setIndex(idx);
          }}
        >
          {piece.photos?.map((url, idx) => (
            <CarouselItem key={`${piece.id}-${idx}`}>
              <img className="d-block" src={url} alt={`${piece.name}-${idx}`} />
            </CarouselItem>
          ))}
        </Carousel>
      </Row>
      <Row>
        <Container className="d-flex justify-content-end">
          <Form onSubmit={handleSubmit}>
            <FormFile className="" required />
            <Button type="sumbmit" className="m-1 ">
              Ajouter
            </Button>
          </Form>
          <Button onClick={deletePhoto} className="m-1 btn-danger">
            Supprimer
          </Button>
        </Container>
      </Row>
    </EditorCard>
  );
};

export default PiecePhotos;
