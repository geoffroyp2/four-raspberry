import axios from "axios";
import FormData from "form-data";

import Formula from "../../../database/models/formula/formula";
import Piece, { PieceCreationAttributes } from "../../../database/models/piece/piece";
import { DataLoadersType } from "../../dataLoaders";
import { imageServerConfig } from "../../../imageServerConfig";

import { GQLPieceId, GQLPieceUpdate, GQLPieceFormula, ResolverObjectType, GQLUploadImage, GQLDeleteImage } from "../types";
import Photo from "../../../database/models/piece/photo";

/**
 * clears the cache from the loaders that are linked to the id
 */
const clearPieceLoaders = async (loaders: DataLoadersType, pieceId: number, formulaId?: number) => {
  loaders.photoLoader.clearAll();
  loaders.pieceRecordListLoader.clearAll();
  loaders.recordPieceListLoader.clearAll();
  loaders.formulaLoader.clearAll();

  // loaders.photoLoader.clear(pieceId);
  // loaders.pieceRecordListLoader.clear(pieceId);

  // const piece = await Piece.findOne({ where: { id: pieceId } });
  // const records = await piece?.getRecords();
  // if (records) {
  //   records.forEach((r) => {
  //     loaders.recordPieceListLoader.clear(r.id);
  //   });
  // }

  // if (piece?.formulaId) {
  //   loaders.formulaLoader.clear(piece.formulaId);
  // }
  // if (formulaId) {
  //   loaders.formulaLoader.clear(formulaId);
  // }
};

const Mutation: ResolverObjectType = {
  /**
   * Creates a new Piece in database
   * @param args optional arguments to be passed, all have default values
   * @return the new Piece
   */
  createPiece: async (_, { name, description }: PieceCreationAttributes): Promise<Piece> => {
    const args: PieceCreationAttributes = {
      name: name ?? "Sans Nom",
      description: description ?? "",
    };
    return Piece.create(args);
  },

  /**
   * Deletes Piece in database
   * @param pieceId the id of the Piece to select
   */
  deletePiece: async (_, { pieceId }: GQLPieceId, loaders): Promise<boolean> => {
    clearPieceLoaders(loaders, pieceId);
    const result = await Piece.destroy({ where: { id: pieceId } });
    return result > 0;
  },

  /**
   * Selects a Piece by id and updates specified fields
   * @param recordId the id of the Piece to select
   * @param args the fields to update
   * @return the updated Piece or null if not in database
   */
  updatePiece: async (_, { pieceId, name, description }: GQLPieceUpdate, loaders): Promise<Piece | null> => {
    const piece = await Piece.findOne({ where: { id: pieceId } });
    if (piece) {
      clearPieceLoaders(loaders, pieceId);

      if (name !== undefined) piece.set({ name });
      if (description !== undefined) piece.set({ description });
      return piece.save();
    }
    return null;
  },

  /**
   * Links a Formula to a Piece
   * @param pieceId the id of the Piece to select
   * @param formulaId the id of the Formula to select, if undefined, remove existing link
   * @return the Piece or null if the Piece or the Formula does not exist
   */
  setPieceFormula: async (_, { pieceId, formulaId }: GQLPieceFormula, loaders): Promise<Piece | null> => {
    const piece = await Piece.findOne({ where: { id: pieceId } });
    if (piece) {
      clearPieceLoaders(loaders, pieceId, formulaId);
      if (formulaId) {
        // if formulaId specified, find new formula and update
        const formula = await Formula.findOne({ where: { id: formulaId } });
        if (formula) {
          await formula.addPiece(piece);
          return Piece.findOne({ where: { id: pieceId } });
        }
      } else {
        // if no formulaId, remove previous link if it exists
        if (piece.formulaId) {
          const formula = await Formula.findOne({ where: { id: piece.formulaId } });
          if (formula) {
            await formula.removePiece(piece);
            return Piece.findOne({ where: { id: pieceId } });
          }
        }
      }
    }
    return null;
  },

  uploadImage: async (_, { pieceId, file }: GQLUploadImage, loaders): Promise<boolean> => {
    const piece = await Piece.findOne({ where: { id: pieceId } });
    if (!piece) return false;

    // 1. Validate file metadata.
    const { createReadStream, filename, mimetype, encoding } = await file;
    if (mimetype !== "image/jpeg") return false;

    try {
      // 2. Stream file contents into the imageServer:
      const stream = createReadStream(); // Get stream from data
      const fd = new FormData(); // Create a new form obeject
      fd.append("image", stream, { filename }); // append the stream as "image"

      const res = await axios.post(imageServerConfig.baseUrl + imageServerConfig.uploadPath, fd, { headers: fd.getHeaders() }); // Post it
      if (!res.data?.url) return false;

      // 3. Record the file url in the DB.
      // only the relative path is recorded because baseURL is subject to change
      // The full URL is re-formed by the photo attribute query resolver
      await piece.createPhoto({ url: res.data.url });
      clearPieceLoaders(loaders, pieceId);

      return true;
    } catch (e) {
      console.log({ error: "ERROR: Could not upload image", status: e.response.status, data: e.response.data });
      return false;
    }
  },

  deleteImage: async (_, { pieceId, url }: GQLDeleteImage, loaders): Promise<boolean> => {
    const piece = await Piece.findOne({ where: { id: pieceId } });
    if (!piece) return false;

    // Remove base url from the url that is sent by the frontend
    const realUrl = url.substr(imageServerConfig.baseUrl.length);

    // Remove the entry from the database
    const result = await Photo.destroy({ where: { url: realUrl } });
    clearPieceLoaders(loaders, pieceId);

    // Delete the image from the imageServer
    const imgId = realUrl.substring(imageServerConfig.deletePath.length + 1); // only the name of the file without the ./images/ path
    await axios.get(imageServerConfig.baseUrl + imageServerConfig.deletePath, { params: { del: imgId } });

    return result > 0;
  },
};

export default Mutation;
