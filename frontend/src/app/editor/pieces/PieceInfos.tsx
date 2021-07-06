import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { Piece } from "@app/_types/dbTypes";
import { getSetPieceFormulaMutation, getUpdatePieceMutation } from "./_gql/mutations";

import { useDispatch, useSelector } from "react-redux";
import { selectPieceData, setPieceData } from "./_state/pieceDataSlice";
import { selectFormulaLoadId } from "@editor/formulas/_state/formulaDisplaySlice";

import FormulaLoadTable from "@editor/formulas/FormulaLoadTable";
import FormulaTableTitle from "@editor/formulas/elements/FormulaTableTitle";
import InfosCard, { InfosCardField } from "@components/cards/InfosCard";
import CustomInput from "@components/inputs/CustomInput";
import CustomTextArea from "@components/inputs/CustomTextArea";
import BasicButton from "@components/buttons/BasicButton";
import LinkTableModal from "@components/modals/LinkTableModal";

import { dateToDisplayString } from "@app/_utils/dateFormat";

const PieceInfos: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const piece = useSelector(selectPieceData);
  const formulaId = useSelector(selectFormulaLoadId);

  const [NameEditValue, setNameEditValue] = useState<string>(piece.name ?? "");
  const [DescriptionEditValue, setDescriptionEditValue] = useState<string>(piece.description ?? "");
  const [ShowLinkModal, setShowLinkModal] = useState<boolean>(false);

  useEffect(() => {
    setNameEditValue(piece.name ?? "");
    setDescriptionEditValue(piece.description ?? "");
  }, [piece]);

  const [updatePieceName] = useMutation<{ updatePiece: Piece }>(getUpdatePieceMutation("name"), {
    onCompleted: ({ updatePiece }) => {
      dispatch(setPieceData(updatePiece));
    },
  });

  const [updatePieceDescription] = useMutation<{ updatePiece: Piece }>(getUpdatePieceMutation("description"), {
    onCompleted: ({ updatePiece }) => {
      dispatch(setPieceData(updatePiece));
    },
  });

  const [setPieceFormula] = useMutation<{ setPieceFormula: Piece }>(getSetPieceFormulaMutation(true), {
    onCompleted: ({ setPieceFormula }) => {
      dispatch(setPieceData(setPieceFormula));
    },
  });

  const [unlinkPieceFormula] = useMutation<{ setPieceFormula: Piece }>(getSetPieceFormulaMutation(false), {
    onCompleted: ({ setPieceFormula }) => {
      dispatch(setPieceData(setPieceFormula));
    },
  });

  return (
    <>
      <InfosCard>
        <InfosCardField
          label="Nom"
          defaultContent={piece.name ?? "-"}
          editContent={<CustomInput value={NameEditValue} onChange={setNameEditValue} />}
          confirmChange={() => updatePieceName({ variables: { pieceId: piece.id, name: NameEditValue } })}
          discardChange={() => setNameEditValue(piece.name ?? "")}
        />
        <InfosCardField
          label="Description"
          defaultContent={piece.description ?? "-"}
          editContent={<CustomTextArea value={DescriptionEditValue} onChange={setDescriptionEditValue} />}
          confirmChange={() => updatePieceDescription({ variables: { pieceId: piece.id, description: DescriptionEditValue } })}
          discardChange={() => setDescriptionEditValue(piece.description ?? "")}
        />
        <InfosCardField
          label="Émail"
          defaultContent={piece.formula?.name ?? "-"}
          unlink={
            piece.formula?.id
              ? () => {
                  unlinkPieceFormula({ variables: { pieceId: piece.id } });
                }
              : undefined
          }
          link={() => setShowLinkModal(true)}
          goto={
            piece.formula?.id
              ? () => {
                  if (piece.formula?.id && piece.formula.id > 0) {
                    navigate(`/formulas/${piece.formula.id}`);
                  } else {
                    navigate("/formulas");
                  }
                }
              : undefined
          }
          gotoColor={"formulas"}
        />
        <InfosCardField label="Création" defaultContent={dateToDisplayString(piece.createdAt, true)} />
        <InfosCardField label="Dernière modification" defaultContent={dateToDisplayString(piece.updatedAt, true)} />
      </InfosCard>
      <LinkTableModal
        show={ShowLinkModal}
        title={<FormulaTableTitle />}
        onHide={() => setShowLinkModal(false)}
        table={
          <FormulaLoadTable
            buttons={
              <>
                <BasicButton color={"red"} onClick={() => setShowLinkModal(false)}>
                  Annuler
                </BasicButton>
                <BasicButton
                  color={"blue"}
                  onClick={() => {
                    setShowLinkModal(false);
                    setPieceFormula({ variables: { pieceId: piece.id, formulaId: formulaId ?? 0 } });
                  }}
                >
                  Sélectionner
                </BasicButton>
              </>
            }
          />
        }
      />
    </>
  );
};

export default PieceInfos;
