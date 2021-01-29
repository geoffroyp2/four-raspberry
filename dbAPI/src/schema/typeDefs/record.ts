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
    name: String!
    description: String!

    """
    Couleur de la courbe de température de la forme 255-255-255-1.0 pour rgba
    Avec r, g, b ints entre 0 et 255 et a float entre 0 et 1
    """
    color: String!

    """
    La courbe target ayant servi comme modèle
    """
    target: Target

    """
    les pieces qui ont été cuites
    """
    pieces: [Piece]!
  }

  extend type Query {
    """
    Recherche les Records par field: renvoie un array de Records
    """
    records(id: Int, name: String): [Record]!
  }

  extend type Mutation {
    """
    Crée un Record, les champs par défaut sont générés automatiquement si non spécifiés
    """
    createRecord: Record!

    """
    Supprime un Record par id
    """
    deleteRecord(id: Int!): Boolean!

    """
    Met à jour les champs qui ne sont pas des jointures
    """
    updateRecord(id: Int!, name: String, description: String, color: String): Record

    """
    Lie une Target (par id) à un Record (par id).
    Si targetId n'est pas défini, retire le lien s'il existe
    """
    setRecordTarget(recordId: Int!, targetId: Int): Boolean!

    """
    Ajoute un lien entre une Piece et un Record
    """
    addPieceToRecord(pieceId: Int!, recordId: Int!): Boolean!

    """
    Supprime le lien entre une Piece et un Record
    """
    removePieceFromRecord(pieceId: Int!, recordId: Int!): Boolean!
  }
`;