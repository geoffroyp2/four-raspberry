import React, { BaseSyntheticEvent, FC } from "react";
import { gql, useMutation } from "@apollo/client";

import { useSelector } from "react-redux";
import { selectPieceData } from "./_state/pieceDataSlice";
import { loadPiece } from "./utils/queries";
import { setNeedRefresh } from "@editor/_shared/setNeedsRefresh";

import EditorCard from "@components/EditorCard";
import ImageZone from "@components/images/ImageZone";

/**
 * Needed to use that pattern to upload files
 */

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
  // const [index, setIndex] = useState<number>(0);

  // useEffect(() => {
  //   setIndex((piece.photos?.length ?? 1) - 1);
  // }, [piece]);

  const handleUpload = async (event: BaseSyntheticEvent) => {
    event.preventDefault();

    const variables = { file: event.target.files[0], pieceId: piece.id };
    const { data } = await uploadMutation({ variables });

    if (data.uploadImage) {
      await loadPiece(piece.id ?? 0);
      setNeedRefresh("piece");
    }
  };

  const handleDelete = async (index: number) => {
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
      <ImageZone photos={piece.photos ?? []} uploadImage={handleUpload} deleteImage={handleDelete} showButtons={true} />
    </EditorCard>
  );
};

export default PiecePhotos;
