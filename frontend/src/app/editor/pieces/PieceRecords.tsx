import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectPieceData } from "./_state/pieceDataSlice";
import { dateToDisplayString } from "@app/_utils/dateFormat";

import ElementListTable from "@components/tables/ElementListTable";
import TableHeader from "@components/tables/TableHeader";
import TableRow from "@components/tables/TableRow";
import GotoIcon from "@components/svg/GotoIcon";

const PieceRecords: FC = () => {
  const navigate = useNavigate();
  const piece = useSelector(selectPieceData);

  return (
    <div className="grid grid-cols-1 gap-2">
      <div className="px-6 body-font text-gray-100 text-center">
        <h2 className="text-3xl title-font font-medium uppercase">Cuissons</h2>
      </div>
      <ElementListTable>
        <TableHeader
          columns={[
            { name: "Nom" },
            { name: "Four" },
            { name: "Courbe de référence" },
            { name: "Date de Cuisson" },
            { name: "" },
          ]}
        />
        <tbody>
          {piece.records &&
            piece.records.map((r, idx) => (
              <TableRow
                key={`load-table-row-${idx}`}
                rowContent={[
                  r.name ?? "-",
                  r.oven ?? "-",
                  r.target?.name ?? "-",
                  dateToDisplayString(r.target?.createdAt, true),
                  <GotoIcon onClick={() => navigate(`/graphs/records/${r.id}`)} color={"records"} />,
                ]}
                id={piece.id ?? 0}
              />
            ))}
        </tbody>
      </ElementListTable>
    </div>
  );
};

export default PieceRecords;
