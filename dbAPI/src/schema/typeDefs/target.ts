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
    name: String
    description: String

    """
    Couleur de la courbe de température de la forme 255-255-255-1.0 pour rgba
    Avec r, g, b ints entre 0 et 255 et a float entre 0 et 1
    """
    color: String!

    """
    les courbes Record qui ont la Target comme modèle
    """
    records: [Record]
  }

  type Query {
    """
    Recherche les Targets par field: renvoie un array de Targets
    """
    targets(id: Int, name: String): [Target]!
  }

  type Mutation {
    """
    Crée un Target, les champs par défaut sont générés automatiquement
    """
    createTarget: Record!

    """
    Supprime un Target par id
    """
    deleteTarget(id: Int!): Boolean!

    """
    Met à jour les champs qui ne sont pas des jointures
    """
    updateTarget(id: Int!, name: String, description: String, color: String): Record
  }
`;
