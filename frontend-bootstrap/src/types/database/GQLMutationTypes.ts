import { Chemical, Formula, Piece, Record, RecordPoint, Target, TargetPoint } from "./GQLResTypes";
import {
  TargetFields,
  TargetPointFields,
  RecordFields,
  RecordPointFields,
  PieceFields,
  FormulaFields,
  ChemicalFields,
} from "./GQLQueryTypes";

export type GQLMutationType =
  | TargetMutationType
  | TargetPointMutationType
  | RecordMutationType
  | RecordPointMutationType
  | PieceMutationType
  | FormulaMutationType
  | IngredientMutationType
  | ChemicalMutationType
  | LiveMutationType;
export type GQLMutationArgs =
  | TargetArgs
  | TargetPointArgs
  | RecordArgs
  | RecordPointArgs
  | PieceArgs
  | FormulaArgs
  | IngredientArgs
  | ChemicalArgs
  | LiveArgs;
export type NoResMutationType =
  | TargetDelete
  | TargetPointDelete
  | RecordDelete
  | RecordPointDelete
  | PieceDelete
  | FormulaDelete
  | ChemicalDelete
  | SendCommand
  | LiveTargetIdUpdate;

type MutationTypeNoRes<T, U> = {
  name: T;
  args: U;
};

type MutationType<T, U, V> = {
  name: T;
  args: U;
  res: V;
};

// Target
type TargetSelectType = { targetId: number };
type TargetCreationArgs = Pick<Target, "name" | "description" | "oven" | "color">;
type TargetUpdateArgs = TargetSelectType & TargetCreationArgs;
type TargetArgs = TargetCreationArgs | TargetUpdateArgs | TargetSelectType;

type TargetCreate = MutationType<"createTarget", TargetCreationArgs, TargetFields>;
type TargetUpdate = MutationType<"updateTarget", TargetUpdateArgs, TargetFields>;
type TargetDelete = MutationTypeNoRes<"deleteTarget", TargetSelectType>;
export type TargetMutationType = TargetCreate | TargetUpdate | TargetDelete;

// TargetPoint
type PointSelectType = { pointId: number };
type TargetPointCreationArgs = Pick<TargetPoint, "time" | "temperature" | "oxygen"> & TargetSelectType;
type TargetPointUpdateArgs = PointSelectType & TargetPointCreationArgs;
type TargetPointDeleteArgs = TargetSelectType & PointSelectType;
type TargetPointArgs = TargetPointCreationArgs | TargetPointUpdateArgs | TargetPointDeleteArgs;

type TargetPointCreate = MutationType<"createTargetPoint", TargetPointCreationArgs, TargetPointFields>;
type TargetPointUpdate = MutationType<"updateTargetPoint", TargetPointUpdateArgs, TargetPointFields>;
type TargetPointDelete = MutationTypeNoRes<"deleteTargetPoint", TargetPointDeleteArgs>;
export type TargetPointMutationType = TargetPointCreate | TargetPointUpdate | TargetPointDelete;

// Record
type RecordSelectType = { recordId: number };
type RecordCreationArgs = Pick<Record, "name" | "description" | "color">;
type RecordUpdateArgs = RecordSelectType & RecordCreationArgs;
type RecordTargetArgs = RecordSelectType & TargetSelectType;
type RecordPieceArgs = RecordSelectType & PieceSelectType;
type RecordArgs = RecordCreationArgs | RecordUpdateArgs | RecordSelectType | RecordTargetArgs | RecordPieceArgs;

type RecordCreate = MutationType<"createRecord", RecordCreationArgs, RecordFields>;
type RecordUpdate = MutationType<"updateRecord", RecordUpdateArgs, RecordFields>;
type RecordDelete = MutationTypeNoRes<"deleteRecord", RecordSelectType>;
type RecordTargetLink = MutationType<"setRecordTarget", RecordTargetArgs, RecordFields>;
type RecordPieceAdd = MutationType<"addPieceToRecord", RecordPieceArgs, RecordFields>;
type RecordPieceRemove = MutationType<"removePieceFromRecord", RecordPieceArgs, RecordFields>;
export type RecordMutationType =
  | RecordCreate
  | RecordUpdate
  | RecordDelete
  | RecordTargetLink
  | RecordPieceAdd
  | RecordPieceRemove;

// RecordPoint
type RecordPointCreationArgs = Pick<RecordPoint, "time" | "temperature" | "oxygen"> & RecordSelectType;
type RecordPointUpdateArgs = PointSelectType & RecordPointCreationArgs;
type RecordPointDeleteArgs = RecordSelectType & PointSelectType;
type RecordPointArgs = RecordPointCreationArgs | RecordPointUpdateArgs | RecordPointDeleteArgs;

type RecordPointCreate = MutationType<"createRecordPoint", RecordPointCreationArgs, RecordPointFields>;
type RecordPointUpdate = MutationType<"updateRecordPoint", RecordPointUpdateArgs, RecordPointFields>;
type RecordPointDelete = MutationTypeNoRes<"deleteRecordPoint", RecordPointDeleteArgs>;
export type RecordPointMutationType = RecordPointCreate | RecordPointUpdate | RecordPointDelete;

// Piece
type PieceSelectType = { pieceId: number };
type PieceCreationArgs = Pick<Piece, "name" | "description">;
type PieceUpdateArgs = PieceSelectType & PieceCreationArgs;
type PieceFormulaArgs = PieceSelectType & FormulaSelectType;
type PieceArgs = PieceCreationArgs | PieceUpdateArgs | PieceSelectType | PieceFormulaArgs;

type PieceCreate = MutationType<"createPiece", PieceCreationArgs, PieceFields>;
type PieceUpdate = MutationType<"updatePiece", PieceUpdateArgs, PieceFields>;
type PieceDelete = MutationTypeNoRes<"deletePiece", PieceSelectType>;
type PieceFormulaLink = MutationType<"setPieceFormula", PieceFormulaArgs, PieceFields>;
export type PieceMutationType = PieceCreate | PieceUpdate | PieceDelete | PieceFormulaLink;

// Formula
type FormulaSelectType = { formulaId: number };
type FormulaCreationArgs = Pick<Formula, "name" | "description">;
type FormulaUpdateArgs = FormulaSelectType & FormulaCreationArgs;
type FormulaTargetArgs = FormulaSelectType & TargetSelectType;
type FormulaArgs = FormulaSelectType | FormulaCreationArgs | FormulaUpdateArgs | FormulaTargetArgs;

type FormulaCreate = MutationType<"createFormula", FormulaCreationArgs, FormulaFields>;
type FormulaUpdate = MutationType<"updateFormula", FormulaUpdateArgs, FormulaFields>;
type FormulaDelete = MutationTypeNoRes<"deleteFormula", FormulaSelectType>;
type FormulaTargetLink = MutationType<"setFormulaTarget", FormulaTargetArgs, FormulaFields>;
export type FormulaMutationType = FormulaCreate | FormulaUpdate | FormulaDelete | FormulaTargetLink;

//Ingredient
type IngredientCreationArgs = { amount: number };
type IngredientRemoveArgs = FormulaSelectType & ChemicalSelectType;
type IngredientAddArgs = IngredientRemoveArgs & IngredientCreationArgs;
type IngredientUpdateArgs = IngredientAddArgs & { newChemicalId?: number };
type IngredientArgs = IngredientRemoveArgs | IngredientAddArgs | IngredientUpdateArgs;

type FormulaIngredientAdd = MutationType<"addFormulaIngredient", IngredientAddArgs, FormulaFields>;
type FormulaIngredientRemove = MutationType<"removeFormulaIngredient", IngredientRemoveArgs, FormulaFields>;
type FormulaIngredientUpdate = MutationType<"updateFormulaIngredient", IngredientUpdateArgs, FormulaFields>;
export type IngredientMutationType = FormulaIngredientAdd | FormulaIngredientRemove | FormulaIngredientUpdate;

//Chemical
type ChemicalSelectType = { chemicalId: number };
type ChemicalCreationArgs = Pick<Chemical, "name" | "chemicalName" | "color">;
type ChemicalUpdateArgs = ChemicalSelectType & ChemicalCreationArgs;
type ChemicalVersionArgs = ChemicalSelectType & { versionName: string };
type ChemicalArgs = ChemicalCreationArgs | ChemicalUpdateArgs | ChemicalSelectType | ChemicalVersionArgs;

type ChemicalCreate = MutationType<"createChemical", ChemicalCreationArgs, ChemicalFields>;
type ChemicalUpdate = MutationType<"updateChemical", ChemicalUpdateArgs, ChemicalFields>;
type ChemicalDelete = MutationTypeNoRes<"deleteChemical", ChemicalSelectType>;
type ChemicalVersionSetOrCreate = MutationType<"setOrCreateChemicalVersion", ChemicalVersionArgs, ChemicalFields>;
type ChemicalVersionDelete = MutationType<"deleteChemicalVersion", ChemicalVersionArgs, ChemicalFields>;
export type ChemicalMutationType =
  | ChemicalCreate
  | ChemicalUpdate
  | ChemicalDelete
  | ChemicalVersionSetOrCreate
  | ChemicalVersionDelete;

// Live
export type LiveStatusType = "start" | "stop" | "pause";
export type CommandNameType = LiveStatusType | "ping" | "monitoring" | "targetId";
type LiveStatusArgs = { name: CommandNameType; option: number | null };
type LiveArgs = LiveStatusArgs;

type SendCommand = MutationTypeNoRes<"sendCommand", LiveStatusArgs>;
type LiveTargetIdUpdate = MutationTypeNoRes<"updateLiveTargetId", TargetSelectType>;
export type LiveMutationType = SendCommand | LiveTargetIdUpdate;
