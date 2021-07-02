import { FC } from "react";

import { useSelector } from "react-redux";
import { selectPieceData } from "./_state/pieceDataSlice";
import { dateToDisplayString } from "@app/_utils/dateFormat";

import ElementListTable from "@components/tables/ElementListTable";
import TableHeader from "@components/tables/TableHeader";
import TableRow from "@components/tables/TableRow";
import GotoIcon from "@components/svg/GotoIcon";
import { useNavigate } from "react-router-dom";

const PieceRecords: FC = () => {
  const navigate = useNavigate();
  const piece = useSelector(selectPieceData);

  return (
    <ElementListTable>
      <TableHeader columnNames={["Nom", "Four", "Courbe de référence", "Date de Cuisson", ""]} />
      {piece.records &&
        piece.records.map((r, idx) => (
          <TableRow
            key={`load-table-row-${idx}`}
            rowContent={[
              r.name ?? "-",
              r.oven ?? "-",
              r.target?.name ?? "-",
              dateToDisplayString(r.target?.createdAt, true),
              <GotoIcon onClick={() => navigate(`../../graphs/records/${r.id}`)} color={"green"} />,
            ]}
            id={piece.id ?? 0}
          />
        ))}
    </ElementListTable>
  );
};

export default PieceRecords;
