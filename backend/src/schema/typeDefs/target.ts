import { gql } from "apollo-server-express";

export default gql`
  """
  Target est une courbe de cuisson cible
  """
  type Target {
    """
    id est généré par la db, unique
    """
    id: Int!

    """
    le nom de la Target
    """
    name: String!

    """
    la description de la Target
    """
    description: String!

    """
    Le four auquel correspond la Target ("gaz" ou "eletrique")
    """
    oven: String!

    """
    Couleur de la courbe de température de la forme {r, g, b, a}.
    Avec r, g, b des ints entre 0 et 255 et a un float entre 0 et 1
    """
    color: Color!

    """
    Les points de la courbe cible.
    Query avec range [start - end] pour un intervalle de temps (defaults to [0 - MAX_SAFE_INTEGER]).
    Et avec amount pour le nombre de points dans l'intervalle (defaults to all points if amount is not specified or too high)
    """
    points(start: Int, end: Int, amount: Int): [TargetPoint]!

    """
    les courbes Record qui ont la Target comme modèle
    """
    records(id: Int, name: String): [Record]

    """
    les Pieces associées à la Target
    """
    pieces(id: Int, name: String): [Piece]

    createdAt: String!
    updatedAt: String!
  }

  """
  TargetPoint est un point de la courbe Target
  """
  type TargetPoint {
    """
    L'id du point, utilisé pour le séléctionner quand on a besoin de le modifier ou supprimer
    """
    id: Int!

    """
    la valeur temps du point en secondes (float pour être sur de ne pas overflow avec 32-bits)
    """
    time: Float!

    """
    la valeur de température cible du point en °C
    """
    temperature: Float!

    """
    la valeur d'oxygénation cible du point entre 0.0 et 1.0
    """
    oxygen: Float!
  }

  type Query {
    """
    Recherche les Targets par id, name, ou type de four (oven: "gaz" ou "electrique")
    """
    targets(id: Int, name: String, oven: String, page: Int, amount: Int, sort: SortInput): TargetQueryRes!
  }

  type Mutation {
    """
    Crée un Target, les champs non spécifiés sont générés automatiquement
    """
    createTarget(name: String, description: String, color: ColorInput, oven: String): Target!

    """
    Supprime un Target par id
    """
    deleteTarget(targetId: Int!): Boolean!

    """
    Selectionne un target par id et met à jour les champs spécifiés
    """
    updateTarget(targetId: Int!, name: String, description: String, color: ColorInput, oven: String): Target

    """
    Selectionne un target par id et lui ajoute un point
    """
    createTargetPoint(targetId: Int!, time: Float!, temperature: Float!, oxygen: Float): TargetPoint

    """
    Selectionne un Target et un de ses points par id et supprime le point
    """
    deleteTargetPoint(targetId: Int!, pointId: Int!): Boolean!

    """
    Selectionne un Target et un de ses points par id et met à jour le point
    """
    updateTargetPoint(targetId: Int!, pointId: Int!, time: Float, temperature: Float, oxygen: Float): TargetPoint

    """
    Selectionne un Target et met à jour tous ses points
    """
    setTargetAllPoints(targetId: Int!, points: [TargetPointInput]!): Target
  }
`;
