import { gql } from "apollo-server-express";

export default gql`
  """
  Formula est une recette d'émail: mélange d'éléments chimiques avec des proportions
  """
  type Formula {
    """
    id est généré par la db, unique
    """
    id: Int!

    """
    le nom de la Formula
    """
    name: String!

    """
    la description de la Formula
    """
    description: String!

    """
    Les Pieces qui ont utilisé la Formula
    """
    pieces(id: Int, name: String): [Piece]!

    """
    Les Ingredients de la Formula
    """
    ingredients: [Ingredient]!

    """
    La courbe Target la meilleure pour cette formule
    """
    target: Target

    createdAt: String!
    updatedAt: String!
  }

  """
  Ingredient associe un Chemical (élément chimique) et une quantité
  """
  type Ingredient {
    """
    La quantité de l'élément dans la Formula.
    entre 0.0 et 1.0 (total 1.0 pour la Formula)
    """
    amount: Float!

    """
    L'élément chimique associé
    """
    chemical: Chemical!
  }

  extend type Query {
    """
    Recherche les Formulas par id ou name
    """
    formulas(id: Int, name: String, page: Int, amount: Int): FormulaQueryRes!
  }

  extend type Mutation {
    """
    Crée une Formula, les champs par défaut sont générés automatiquement si non spécifiés
    """
    createFormula(name: String, description: String): Formula!

    """
    Supprime une Formula par id
    """
    deleteFormula(formulaId: Int!): Boolean!

    """
    Sélectionne une Formula par id et met à jour les champs spécifiés
    """
    updateFormula(formulaId: Int!, name: String, description: String): Formula

    """
    Sélectionne une Formula et un Chemical par id et met à jour leur association.
    si newChemicalId existe: change le Chemical associé, et change amount si spécifié.
    sinon, si amount existe, change amount
    """
    updateFormulaIngredient(formualId: Int!, chemicalId: Int!, amount: Float, newChemicalId: Int): Formula

    """
    Sélectionne une Formula et un Chemical par id et les associe avec un amount
    """
    addFormulaIngredient(formulaId: Int!, chemicalid: Int!, amount: Float!): Formula

    """
    Sélectionne une Formula et un Chemical par id et supprime leur association
    """
    removeFormulaIngredient(formulaId: Int!, chemicalid: Int!): Formula

    """
    Lie une Target (par id) à une Formula (par id).
    Si targetId n'est pas défini, retire le lien s'il existe
    """
    setFormulaTarget(formulaId: Int!, targetId: Int): Formula
  }
`;
