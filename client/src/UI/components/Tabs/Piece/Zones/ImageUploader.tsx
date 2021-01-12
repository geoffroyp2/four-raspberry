import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";

import linkPhoto from "@photos/handler";
import { CurrentPieceID } from "@redux/dataReducers/pieceSlice";
import { useSelector } from "react-redux";

const ImageUploader = () => {
  const currentPieceID = useSelector(CurrentPieceID);
  const [Files, setFiles] = useState<FileList | null>(null);

  const handleSend = async () => {
    if (Files && Files[0]) {
      await linkPhoto(Files[0]);
    }
  };

  return (
    <Container fluid className="p-1 m-1 justify-content-center align-items-center d-flex">
      <input type="file" accept="image/*" onChange={(e) => setFiles(e.target.files)}></input>
      <Button disabled={currentPieceID === "default"} onClick={handleSend}>
        Enregistrer
      </Button>
    </Container>
  );
};

export default ImageUploader;
