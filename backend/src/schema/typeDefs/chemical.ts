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
    Couleur de la courbe de température de la forme {r, g, b, a}.
    Avec r, g, b des ints entre 0 et 255 et a un float entre 0 et 1
    """
    color: Color!

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
    chemicals(id: Int, name: String, chemicalName: String, page: Int, amount: Int): ChemicalQueryRes!
  }

  extend type Mutation {
    """
    Crée un Chemical, les champs par défaut sont générés automatiquement si non spécifiés
    """
    createChemical(name: String, chemicalName: String, density: Int, color: ColorInput): Chemical!

    """
    Supprime un Chemical par id
    """
    deleteChemical(chemicalId: Int!): Boolean!

    """
    Sélectionne un Chemical par id et met à jour les champs spécifiés
    """
    updateChemical(chemicalId: Int!, name: String, chemicalName: String, density: Int, color: ColorInput): Chemical
  }
`;
