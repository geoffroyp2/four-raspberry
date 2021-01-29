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
    name: String!
    description: String!

    """
    Le four auquel correspond la Target ("gaz" ou "eletrique")
    """
    oven: String!

    """
    Couleur de la courbe de température de la forme {r, g, b, a}
    Avec r, g, b des ints entre 0 et 255 et a un float entre 0 et 1
    """
    color: Color!

    """
    les courbes Record qui ont la Target comme modèle
    """
    records(id: Int, name: String): [Record]!

    """
    les Pieces associées à la Target
    """
    pieces(id: Int, name: String): [Piece]

    createdAt: String!
    updatedAt: String!
  }

  type Query {
    """
    Recherche les Targets par id, name, ou type de four (oven)
    """
    targets(id: Int, name: String, oven: String): [Target]!
  }

  type Mutation {
    """
    Crée un Target, les champs par défaut sont générés automatiquement
    """
    createTarget(name: String, description: String, color: ColorInput, oven: String): Target!

    """
    Supprime un Target par id
    """
    deleteTarget(id: Int!): Boolean!

    """
    Selectionne un target par id et met à jour les champs qui ne sont pas des jointures
    """
    updateTarget(id: Int!, name: String, description: String, color: ColorInput, oven: String): Target
  }
`;
