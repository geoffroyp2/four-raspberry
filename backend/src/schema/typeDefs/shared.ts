import { gql } from "apollo-server-express";

export default gql`
  type TargetQueryRes {
    count: Int!
    rows: [Target]!
  }
  type RecordQueryRes {
    count: Int!
    rows: [Record]!
  }
  type PieceQueryRes {
    count: Int!
    rows: [Piece]!
  }
  type FormulaQueryRes {
    count: Int!
    rows: [Formula]!
  }
  type ChemicalQueryRes {
    count: Int!
    rows: [Chemical]!
  }

  input ColorInput {
    r: Int!
    g: Int!
    b: Int!
    a: Float!
  }

  input TargetPointInput {
    time: Float!
    temperature: Float!
    oxygen: Float!
  }

  """
  Color contains 4 Integer fields: r, g, b with range 0-255
  And one Float field a range 0-1
  """
  type Color {
    r: Int!
    g: Int!
    b: Int!
    a: Float!
  }
`;
