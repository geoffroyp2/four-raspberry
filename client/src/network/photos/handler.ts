import { post } from "./client";

const linkPhoto = async (file: File): Promise<string> => {
  const form = new FormData();
  form.append("image", file);
  const res = await post(form);

  return res.data.url;
};

export default linkPhoto;
