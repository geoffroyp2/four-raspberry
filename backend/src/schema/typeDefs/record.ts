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
    Les points de la courbe de cuisson.
    Query avec range [start - end] pour un intervalle de temps (defaults to [0 - MAX_SAFE_INTEGER]).
    Et avec amount pour le nombre de points dans l'intervalle (defaults to all points if amount is not specified or too high)
    """
    points(start: Int, end: Int, amount: Int): [RecordPoint]!

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

  """
  RecordPoint est un point de la courbe Record
  """
  type RecordPoint {
    """
    L'id du point, utilisé pour le séléctionner quand on a besoin de le modifier ou supprimer
    """
    id: Int!

    """
    la valeur temps du point en secondes (Float pour être sur de ne pas overflow avec 32-bits)
    """
    time: Float!

    """
    la valeur de température mesurée du point en °C
    """
    temperature: Float!

    """
    la valeur d'oxygénation mesurée du point entre 0.0 et 1.0
    """
    oxygen: Float!
  }

  extend type Query {
    """
    Recherche les Records par id ou par name
    """
    records(id: Int, name: String, oven: String, page: Int, amount: Int): RecordQueryRes!
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

    """
    Selectionne un Record par id et lui ajoute un point
    """
    createRecordPoint(recordId: Int!, time: Float!, temperature: Float!, oxygen: Float): RecordPoint

    """
    Selectionne Record et de ses points par id et supprime le point
    """
    deleteRecordPoint(recordId: Int!, pointId: Int!): Boolean!

    """
    Selectionne Record et de ses points par id et met à jour le point
    """
    updateRecordPoint(recordId: Int!, pointId: Int!, time: Float, temperature: Float, oxygen: Float): RecordPoint
  }
`;
