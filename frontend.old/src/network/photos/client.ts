import axios from "axios";

export const post = async (form: FormData) => {
  return await axios({
    method: "post",
    url: "http://192.168.0.121:3003/upload",
    data: form,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
