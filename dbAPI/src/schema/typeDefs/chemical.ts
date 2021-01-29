import { gql } from "apollo-server-express";

export default gql`
  """
  Chemical est un élément chimique
  """
  type Chemical {
    """
    id de l'élément chimique généré par la db, unique
    """
    id: Int!

    """
    Le nom français de l'élément chimique
    """
    name: String!

    """
    La composition moléculaire de l'élément chimique
    """
    chemicalName: String!

    """
    La densité moléculaire de l'élément chimique -> volumetric mass density r = m / V
    """
    density: Int!

    """
    La liste des Formulas associées à l'ingrédient
    """
    formulas(id: Int, name: String): [Formula]!

    createdAt: String!
    updatedAt: String!
  }

  extend type Query {
    """
    Recherche les Chemicals par id, name ou chemicalName
    """
    chemicals(id: Int, name: String, chemicalName: String): [Chemical]!
  }

  extend type Mutation {
    """
    Crée un Chemical, les champs par défaut sont générés automatiquement si non spécifiés
    """
    createChemical(name: String, chemicalName: String, density: Int): Chemical!

    """
    Supprime un Chemical par id
    """
    deleteChemical(id: Int!): Boolean!

    """
    Sélectionne un Chemical par id et met à jour les champs qui ne sont pas des jointures
    """
    updateChemical(id: Int!, name: String, chemicalName: String, density: Int): Chemical
  }
`;
