import db from "@db/handler";
import { addPieceImage } from "@redux/dataReducers/pieceSlice";
import { store } from "@src/redux/store";
import { post } from "./client";

const linkPhoto = async (file: File): Promise<void> => {
  // Upload Image, get url back
  const form = new FormData();
  form.append("image", file);
  const res = await post(form);

  // update piece in db
  store.dispatch(addPieceImage(res.data.url));
  await db.piece.updateSimple();
};

export default linkPhoto;
