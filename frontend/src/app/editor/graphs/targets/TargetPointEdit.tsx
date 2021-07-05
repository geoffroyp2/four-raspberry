import { FC, useState } from "react";

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
import CustomTemperatureInput from "@components/inputs/CustomTemperatureInput";
import CustomCheckbox from "@components/inputs/CustomCheckbox";
import BasicButton from "@components/buttons/BasicButton";
import CancelIcon from "@components/svg/CancelIcon";
import PlusIcon from "@components/svg/PlusIcon";

const TargetPointEdit: FC = () => {
  const dispatch = useDispatch();
  const target = useSelector(selectTargetData);
  const points = useSelector(selectTargetTempPoints);
  const pointFilter = useSelector(selectTargetPointZoom);

  const [SelectedRow, setSelectedRow] = useState<number | null>(null);

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
              <PlusIcon
                size={24}
                onClick={() => {
                  setSelectedRow(points.length);
                  dispatch(addTargetTempPoint());
                }}
              />
            </PointEditTable.RowElement>
          </PointEditTable.Row>
          {points
            .map((p, idx) => ({ ...p, idx })) // Associate each point to its index to keep track of the highlighted row after sort
            .sort((a, b) => {
              if (a.time === undefined || a.temperature === undefined || b.time === undefined || b.temperature === undefined)
                return 1;
              if (a.time === b.time) return a.temperature - b.temperature;
              return a.time - b.time;
            })
            .map((p) => (
              <PointEditTable.Row key={`tr-tp${p.idx}`} selected={SelectedRow === p.idx}>
                <PointEditTable.RowElement className="px-3 py-1">
                  <div className="flex items-center justify-center">
                    <CustomTimeInput
                      value={p.time ?? 0}
                      onChange={(val) => {
                        setSelectedRow(p.idx);
                        dispatch(setTargetTempPoint({ point: { ...p, time: val }, index: p.idx }));
                      }}
                    />
                  </div>
                </PointEditTable.RowElement>
                <PointEditTable.RowElement className="px-3 py-1">
                  <div className="flex items-center justify-center">
                    <CustomTemperatureInput
                      value={p.temperature ?? 0}
                      onChange={(val) => {
                        setSelectedRow(p.idx);
                        dispatch(setTargetTempPoint({ point: { ...p, temperature: val }, index: p.idx }));
                      }}
                    />
                  </div>
                </PointEditTable.RowElement>
                <PointEditTable.RowElement className="px-3 py-1">
                  <div className="flex items-center justify-center">
                    <CustomCheckbox
                      checked={(p.oxygen ?? 0) > 0.5}
                      onChange={(val) => {
                        setSelectedRow(p.idx);
                        dispatch(setTargetTempPoint({ point: { ...p, oxygen: val ? 1 : 0 }, index: p.idx }));
                      }}
                    />
                  </div>
                </PointEditTable.RowElement>
                <PointEditTable.RowElement className="px-2 py-1 flex justify-end">
                  <CancelIcon
                    onClick={() => {
                      setSelectedRow(null);
                      dispatch(removeTargetTempPoint(p.idx));
                    }}
                  />
                </PointEditTable.RowElement>
              </PointEditTable.Row>
            ))}
        </tbody>
      </PointEditTable.Table>
      <div className="flex px-2 pt-2 pb-1 gap-6 justify-center">
        <BasicButton
          color="red"
          onClick={() => {
            setSelectedRow(null);
            dispatch(resetTargetTempPoints());
          }}
        >
          Annuler
        </BasicButton>
        <BasicButton
          color="teal"
          onClick={() => {
            setSelectedRow(null);
            updateTargetPoints({
              variables: {
                targetId: target.id ?? 0,
                points: points.map((p) => ({ time: p.time, temperature: p.temperature, oxygen: p.oxygen })),
              },
            });
          }}
        >
          Enregistrer
        </BasicButton>
      </div>
    </BasicMainCard>
  );
};

export default TargetPointEdit;
