import { gql } from "apollo-server-express";

export default gql`
  """
  Record est une courbe de cuisson enregistrée
  """
  type Record {
    """
    id est généré par la db, unique
    """
    id: Int!
    """
    le nom du Record
    """
    name: String!

    """
    la description du Record
    """
    description: String!

    """
    Couleur de la courbe de température de la forme {r, g, b, a}.
    Avec r, g, b des ints entre 0 et 255 et a un float entre 0 et 1
    """
    color: Color!

    """
    Le four auquel correspond la Cuisson ("gaz" ou "eletrique").
    ou null si Record n'a pas de Target associé
    """
    oven: String

    """
    La courbe target ayant servi comme modèle
    """
    target: Target

    """
    les pieces qui ont été cuites
    """
    pieces(id: Int, name: String): [Piece]!

    createdAt: String!
    updatedAt: String!
  }

  extend type Query {
    """
    Recherche les Records par id ou par name
    """
    records(id: Int, name: String, oven: String): [Record]!
  }

  extend type Mutation {
    """
    Crée un Record, les champs par défaut sont générés automatiquement si non spécifiés
    """
    createRecord(name: String, description: String, color: ColorInput): Record!

    """
    Supprime un Record par id
    """
    deleteRecord(recordId: Int!): Boolean!

    """
    Selectionne un Record par id et met à jour les champs spécifiés
    """
    updateRecord(recordId: Int!, name: String, description: String, color: ColorInput): Record

    """
    Lie une Target (par id) à un Record (par id).
    Si targetId n'est pas défini, retire le lien s'il existe
    """
    setRecordTarget(recordId: Int!, targetId: Int): Record

    """
    Ajoute un lien entre une Piece et un Record
    """
    addPieceToRecord(pieceId: Int!, recordId: Int!): Record

    """
    Supprime le lien entre une Piece et un Record
    """
    removePieceFromRecord(pieceId: Int!, recordId: Int!): Record
  }
`;
