import React, { useState } from "react";
import { Button } from "react-bootstrap";

import linkPhoto from "@photos/handler";

const ImageUpload = () => {
  const [Files, setFiles] = useState<FileList | null>(null);
  const [ImgURL, setImgURL] = useState<string>("");

  const handleSend = async () => {
    if (Files && Files[0]) {
      const url = await linkPhoto(Files[0]);
      setImgURL(url);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={(e) => setFiles(e.target.files)}></input>
      <Button onClick={handleSend}>Upload</Button>
      {ImgURL && <img src={`http://192.168.0.121:3003/${ImgURL}`} alt=""></img>}
    </div>
  );
};

export default ImageUpload;
