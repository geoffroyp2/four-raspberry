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
    Le nom usuel de l'élément chimique
    """
    name: String!

    """
    Le nom chimique de l'élément
    """
    chemicalName: String!

    """
    La version de l'élément chimique (s'il y a plusieurs récoltes par exemple)
    """
    currentVersion: String

    """
    La liste des versions qui existent pour l'élément
    """
    existingVersions: [String]

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
    createChemical(name: String, chemicalName: String, color: ColorInput): Chemical!

    """
    Supprime un Chemical par id
    """
    deleteChemical(chemicalId: Int!): Boolean!

    """
    Sélectionne un Chemical par id et met à jour les champs spécifiés
    """
    updateChemical(chemicalId: Int!, name: String, chemicalName: String, color: ColorInput): Chemical

    """
    Ajoute une version pour le Chemical Spécifié (et l'ajoute en tant que currentVersion)
    """
    addChemicalVersion(chemicalId: Int!, versionName: String!): Chemical

    """
    Supprime la Version spécifiée du Chemical spécifié
    """
    deleteChemicalVersion(chemicalId: Int!, versionName: String!): Chemical

    """
    Change la version du chemical Spécifié
    """
    setChemicalVersion(chemicalId: Int!, versionName: String!): Chemical
  }
`;
