import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFormulaLoadMain from "./hooks/useFormulaLoadMain";

import { useDispatch, useSelector } from "react-redux";
import { selectFormulaData } from "./_state/formulaDataSlice";
import { setFormulaMainLoadId } from "./_state/formulaDisplaySlice";

import FormulaInfos from "./FormulaInfos";
import FormulaGallery from "./FormulaGallery";
import FormulaComposition from "./FormulaComposition";
import PiecePreview from "@editor/pieces/PiecePreview";

import BackButton from "@components/buttons/BackButton";
import MainGrid, { MainGridItem } from "@components/grids/MainGrid";

const FormulaInfosPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const formula = useSelector(selectFormulaData);
  const { called, loading } = useFormulaLoadMain();

  useEffect(() => {
    if (formula.id !== +id) {
      dispatch(setFormulaMainLoadId(+id));
    }
  }, [id, formula.id, dispatch]);

  if (!called || loading) return <div></div>;

  return (
    <MainGrid cols="1" xlRows="home-xl-1" xlCols="home-xl-3/2">
      <MainGridItem col="1" row="1" xlCol="1" xlRow="1">
        <BackButton onClick={() => navigate("/formulas/back")} />
      </MainGridItem>
      <MainGridItem col="1" row="2" xlCol="1" xlRow="2">
        <FormulaComposition />
      </MainGridItem>
      <MainGridItem col="1" row="3" xlCol="2" xlRow="2">
        <FormulaInfos />
      </MainGridItem>
      <MainGridItem col="1" row="4" xlCol="1" xlRow="3">
        <FormulaGallery />
      </MainGridItem>
      <MainGridItem col="1" row="5" xlCol="2" xlRow="3">
        <PiecePreview showGoto />
      </MainGridItem>
    </MainGrid>
  );
};

export default FormulaInfosPage;
