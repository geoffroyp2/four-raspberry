import { FC, useMemo } from "react";

type MainProps = {
  className?: string;
  cols?: string;
  rows?: string;
  xlCols?: string;
  xlRows?: string;
};

const MainGrid: FC<MainProps> = ({ className, cols, rows, xlCols, xlRows, children }) => {
  const classNameString = useMemo(() => {
    const xlColsString = xlCols ? `xl:grid-cols-${xlCols}` : "";
    const xlRowssString = xlRows ? `xl:grid-rows-${xlRows}` : "";
    const colsString = cols ? `grid-cols-${cols}` : "";
    const rowsString = rows ? `grid-rows-${rows}` : "";

    return `grid pt-8 ${className} ${xlColsString} ${xlRowssString} ${colsString} ${rowsString}`;
  }, [className, cols, rows, xlCols, xlRows]);

  return <div className={classNameString}>{children}</div>;
};

type ItemProps = {
  className?: string;
  col?: string;
  row?: string;
  xlCol?: string;
  xlRow?: string;
};

export const MainGridItem: FC<ItemProps> = ({ className, col, row, xlCol, xlRow, children }) => {
  const classNameString = useMemo(() => {
    const xlColsString = xlCol ? `xl:col-start-${xlCol}` : "";
    const xlRowssString = xlRow ? `xl:row-start-${xlRow}` : "";
    const colsString = col ? `col-start-${col}` : "";
    const rowsString = row ? `row-start-${row}` : "";

    return `container pt-6 mx-auto px-4 sm:px-8 ${className} ${xlColsString} ${xlRowssString} ${colsString} ${rowsString}`;
  }, [className, col, row, xlCol, xlRow]);

  return <div className={classNameString}>{children}</div>;
};

export default MainGrid;
