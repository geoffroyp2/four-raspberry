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
    records: [Record]!

    """
    la formule chimique de l'émail de la pièce
    """
    formula: Formula

    createdAt: String!
    updatedAt: String!
  }

  extend type Query {
    """
    Recherche les Records par id ou par name
    """
    pieces(id: Int, name: String): [Piece]!
  }

  extend type Mutation {
    """
    Crée un Piece, les champs par défaut sont générés automatiquement si non spécifiés
    """
    createPiece(name: String, description: String): Piece!

    """
    Supprime une Piece par id
    """
    deletePiece(id: Int!): Boolean!

    """
    Selectionne une Piece par id et met à jour les champs qui ne sont pas des jointures
    """
    updatePiece(id: Int!, name: String, description: String): Piece

    """
    Lie une Piece (par id) à une Formula (par id).
    Si formulaId n'est pas défini, retire le lien s'il existe
    """
    setPieceFormula(pieceId: Int!, formulaId: Int): Piece
  }
`;
