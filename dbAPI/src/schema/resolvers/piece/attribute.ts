import Piece from "../../../database/models/piece/model";

const Attribute = {
  records: async (parent: Piece) => {
    return await parent.getRecords();
  },
  photos: async (parent: Piece) => {
    const photos = await parent.getPhotos();
    return photos.map((p) => p.url);
  },
};

export default Attribute;
