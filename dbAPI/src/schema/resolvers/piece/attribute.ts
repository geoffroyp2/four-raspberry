import Formula from "../../../database/models/formula/formula";
import Piece from "../../../database/models/piece/piece";

const Attribute = {
  records: async (parent: Piece) => {
    return await parent.getRecords();
  },

  photos: async (parent: Piece) => {
    const photos = await parent.getPhotos();
    return photos.map((p) => p.url);
  },

  formula: async (parent: Piece) => {
    return await Formula.findOne({ where: { id: parent.formulaId } });
  },
};

export default Attribute;
