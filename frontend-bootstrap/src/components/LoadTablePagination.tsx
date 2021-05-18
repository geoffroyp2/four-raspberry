import React, { useCallback, FC } from "react";
import { Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@app/store";

const buildPageItem = (number: number, active: boolean, setCurrentPage: (page: number) => void): JSX.Element => {
  return (
    <Pagination.Item key={`pik${number}`} active={active} onClick={() => setCurrentPage(number)}>
      {number + 1}
    </Pagination.Item>
  );
};

const buildPagination = (
  currentPage: number,
  pageAmount: number,
  setCurrentPage: (page: number) => void
): JSX.Element[] => {
  const pages: JSX.Element[] = [];

  if (pageAmount === 0) return [buildPageItem(0, false, setCurrentPage)]; // if no page

  if (pageAmount <= 4) {
    for (let i = 0; i < pageAmount; i++) pages.push(buildPageItem(i, currentPage === i, setCurrentPage)); // no ellipsis needed
  } else {
    pages.push(buildPageItem(0, currentPage === 0, setCurrentPage));
    if (currentPage <= 1) pages.push(buildPageItem(1, currentPage === 1, setCurrentPage));
    if (currentPage === 1) pages.push(buildPageItem(2, false, setCurrentPage));
    if (currentPage > 2) pages.push(<Pagination.Ellipsis key={"pe1"} />);
    if (currentPage > 1 && currentPage < pageAmount - 1) {
      for (let i = -1; i < 2; i++) pages.push(buildPageItem(currentPage + i, i === 0, setCurrentPage));
    }
    if (currentPage < pageAmount - 2) pages.push(<Pagination.Ellipsis key={"pe2"} />);
    if (currentPage === pageAmount - 1) pages.push(buildPageItem(pageAmount - 2, false, setCurrentPage));
    if (currentPage >= pageAmount - 1)
      pages.push(buildPageItem(pageAmount - 1, currentPage === pageAmount - 1, setCurrentPage));

    pages.push(buildPageItem(pageAmount, currentPage === pageAmount, setCurrentPage));
  }
  return pages;
};

type Props = {
  pageAmount: (state: RootState) => number;
  page: (state: RootState) => number;
  setPage: (payload: number) => void;
};

const LoadTablePagination: FC<Props> = ({ pageAmount, page, setPage }) => {
  const dispatch = useDispatch();
  const currentPage = useSelector(page);
  const currentPageAmount = useSelector(pageAmount);

  const setCurrentPage = useCallback(
    (page: number) => {
      dispatch(setPage(page));
    },
    [dispatch, setPage]
  );

  return (
    <Pagination>
      <Pagination.Prev
        disabled={currentPage === 0}
        onClick={() => {
          currentPage > 0 && dispatch(setPage(currentPage - 1));
        }}
      />
      {buildPagination(currentPage, currentPageAmount, setCurrentPage)}
      <Pagination.Next
        disabled={currentPage === currentPageAmount}
        onClick={() => {
          currentPage < currentPageAmount && dispatch(setPage(currentPage + 1));
        }}
      />
    </Pagination>
  );
};

export default LoadTablePagination;
