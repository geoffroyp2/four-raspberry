import { FC } from "react";

import { useMutation } from "@apollo/client";
import { getSetTargetPointsMutation } from "../_gql/mutations";
import { Target } from "@app/_types/dbTypes";

import { useDispatch, useSelector } from "react-redux";
import {
  selectTargetTempPoints,
  setTargetTempPoint,
  removeTargetTempPoint,
  resetTargetTempPoints,
  addTargetTempPoint,
  setTargetPoints,
  selectTargetData,
} from "../_state/targetDataSlice";
import { selectTargetPointZoom } from "../_state/targetDisplaySlice";

import BasicMainCard from "@components/cards/BasicMainCard";
import PointEditTable from "@components/tables/PointEditTable";
import TableHeader from "@components/tables/TableHeader";
import CustomTimeInput from "@components/inputs/CustomTimeInput";
import CustomNumberInput from "@components/inputs/CustomNumberInput";
import CustomCheckbox from "@components/inputs/CustomCheckbox";
import BasicButton from "@components/buttons/BasicButton";
import CancelIcon from "@components/svg/CancelIcon";
import PlusIcon from "@components/svg/PlusIcon";

const TargetPointEdit: FC = () => {
  const dispatch = useDispatch();
  const target = useSelector(selectTargetData);
  const points = useSelector(selectTargetTempPoints);
  const pointFilter = useSelector(selectTargetPointZoom);

  const [updateTargetPoints] = useMutation<{ setTargetAllPoints: Target }>(getSetTargetPointsMutation(pointFilter), {
    onCompleted: ({ setTargetAllPoints }) => {
      dispatch(dispatch(setTargetPoints(setTargetAllPoints.points)));
    },
  });

  return (
    <BasicMainCard>
      <PointEditTable.Table>
        <TableHeader columnNames={["Temps", "Température", "Oxygène", ""]} textCenter />
        <tbody>
          <PointEditTable.Row>
            <PointEditTable.RowElement />
            <PointEditTable.RowElement />
            <PointEditTable.RowElement />
            <PointEditTable.RowElement className="px-2 py-2 flex justify-end">
              <PlusIcon size={24} onClick={() => dispatch(addTargetTempPoint())} />
            </PointEditTable.RowElement>
          </PointEditTable.Row>
          {points.map((p, i) => (
            <PointEditTable.Row key={`tr-tp${i}`}>
              <PointEditTable.RowElement className="px-3 py-1">
                <div className="flex items-center justify-center">
                  <CustomTimeInput
                    value={p.time ?? 0}
                    onChange={(val) => {
                      console.log({ point: { ...p, time: val }, index: i });
                      dispatch(setTargetTempPoint({ point: { ...p, time: val }, index: i }));
                    }}
                  />
                </div>
              </PointEditTable.RowElement>
              <PointEditTable.RowElement className="px-3 py-1">
                <div className="flex items-center justify-center">
                  <CustomNumberInput
                    value={p.temperature ?? 0}
                    onChange={(val) => dispatch(setTargetTempPoint({ point: { ...p, temperature: val }, index: i }))}
                  />
                </div>
              </PointEditTable.RowElement>
              <PointEditTable.RowElement className="px-3 py-1">
                <div className="flex items-center justify-center">
                  <CustomCheckbox
                    checked={(p.oxygen ?? 0) > 0.5}
                    onChange={(val) => {
                      dispatch(setTargetTempPoint({ point: { ...p, oxygen: val ? 1 : 0 }, index: i }));
                    }}
                  />
                </div>
              </PointEditTable.RowElement>
              <PointEditTable.RowElement className="px-2 py-1 flex justify-end">
                <CancelIcon onClick={() => dispatch(removeTargetTempPoint(i))} />
              </PointEditTable.RowElement>
            </PointEditTable.Row>
          ))}
        </tbody>
      </PointEditTable.Table>
      <div className="flex px-2 pt-2 pb-1 gap-6 justify-center">
        <BasicButton color="red" onClick={() => dispatch(resetTargetTempPoints())}>
          Annuler
        </BasicButton>
        <BasicButton
          color="teal"
          onClick={() =>
            updateTargetPoints({
              variables: {
                targetId: target.id ?? 0,
                points: points.map((p) => ({ time: p.time, temperature: p.temperature, oxygen: p.oxygen })),
              },
            })
          }
        >
          Enregistrer
        </BasicButton>
      </div>
    </BasicMainCard>
  );
};

export default TargetPointEdit;
