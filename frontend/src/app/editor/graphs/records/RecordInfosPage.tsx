import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useRecordLoadMain from "../hooks/useRecordLoadMain";

import { useDispatch, useSelector } from "react-redux";
import { selectRecordData } from "../_state/recordDataSlice";
import { setRecordMainLoadId } from "../_state/recordDisplaySlice";

import RecordGraph from "./RecordGraph";
import RecordInfos from "./RecordInfos";
import RecordGallery from "./RecordGallery";
import PiecePreview from "@editor/pieces/PiecePreview";

import MainGrid, { MainGridItem } from "@components/grids/MainGrid";
import BackButton from "@components/buttons/BackButton";

const RecordInfosPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const record = useSelector(selectRecordData);
  useRecordLoadMain();

  useEffect(() => {
    if (record.id !== +id) {
      dispatch(setRecordMainLoadId(+id));
    }
  }, [id, record.id, dispatch]);

  return (
    <>
      <MainGrid cols="1" xlRows="home-xl-1" xlCols="home-xl-3/2">
        <MainGridItem col="1" row="1" xlCol="1" xlRow="1">
          <BackButton onClick={() => navigate("/graphs")} />
        </MainGridItem>
        <MainGridItem col="1" row="2" xlCol="1" xlRow="2">
          <RecordGraph />
        </MainGridItem>
        <MainGridItem col="1" row="3" xlCol="2" xlRow="2">
          <RecordInfos />
        </MainGridItem>
        <MainGridItem col="1" row="4" xlCol="1" xlRow="3">
          <RecordGallery />
        </MainGridItem>
        <MainGridItem col="1" row="5" xlCol="2" xlRow="3">
          <PiecePreview showGoto />
        </MainGridItem>
      </MainGrid>
    </>
  );
};

export default RecordInfosPage;
