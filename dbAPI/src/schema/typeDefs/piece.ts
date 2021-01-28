import { gql } from "apollo-server-express";

export default gql`
  """
  Piece est une poterie
  """
  type Piece {
    """
    id est généré par la db, unique
    """
    id: Int!
    name: String!
    description: String!

    """
    Les urls des photos associées à la Piece
    """
    photos: [String]!

    """
    les courbes Record de cuisson de la Piece
    """
    records: [Record]
  }

  extend type Query {
    """
    Recherche les Records par field: renvoie un array de Records
    """
    pieces(id: Int, name: String): [Piece]!
  }

  extend type Mutation {
    """
    Crée un Piece, les champs par défaut sont générés automatiquement si non spécifiés
    """
    createPiece: Piece!

    """
    Supprime une Piece par id
    """
    deletePiece(id: Int!): Boolean!

    """
    Met à jour les champs qui ne sont pas des jointures
    """
    updatePiece(id: Int!, name: String, description: String): Piece
  }
`;
