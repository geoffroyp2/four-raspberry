import { FC } from "react";
import { PaginationIconLeft, PaginationIconRight } from "@components/svg/PaginationIcons";

type Props = {
  currentPage: number;
  pageAmount: number;
  handleSetPage: (page: number) => void;
  small?: boolean;
};

const Pagination: FC<Props> = ({ currentPage, pageAmount, handleSetPage, small }) => {
  /**
   * if small, only show left/right icons + current page
   */
  if (small)
    return (
      <div className="px-5 py-3 flex flex-col xs:flex-row items-center xs:justify-between">
        <div className="flex items-center">
          <PaginationItem
            className="p-4 rounded-l-xl"
            disabled={currentPage <= 0}
            onClick={() => {
              handleSetPage(currentPage - 1);
            }}
          >
            <PaginationIconLeft />
          </PaginationItem>
          <PaginationItem className="px-4 py-2" onClick={() => {}} disabled>
            {`${currentPage + 1}/${pageAmount + 1}`}
          </PaginationItem>

          <PaginationItem
            className="p-4 rounded-r-xl"
            disabled={currentPage >= pageAmount}
            onClick={() => {
              handleSetPage(currentPage + 1);
            }}
          >
            <PaginationIconRight />
          </PaginationItem>
        </div>
      </div>
    );

  return (
    <div className="px-5 py-3 flex flex-col xs:flex-row items-center xs:justify-between">
      <div className="flex items-center">
        <PaginationItem
          className="p-4 rounded-l-xl"
          disabled={currentPage <= 0}
          onClick={() => {
            handleSetPage(currentPage - 1);
          }}
        >
          <PaginationIconLeft />
        </PaginationItem>

        <PaginationItem
          className="px-4 py-2"
          onClick={() => {
            handleSetPage(0);
          }}
          selected={currentPage === 0}
        >
          1
        </PaginationItem>

        <PaginationItem
          className="px-4 py-2"
          onClick={() => {
            handleSetPage(1);
          }}
          selected={currentPage === 1}
          disabled={currentPage > 2}
        >
          {currentPage <= 2 ? "2" : "..."}
        </PaginationItem>

        <PaginationItem
          className="px-4 py-2"
          onClick={() => {
            handleSetPage(currentPage <= 2 ? 2 : currentPage >= pageAmount - 1 ? pageAmount - 2 : currentPage);
          }}
          selected={currentPage > 1 && currentPage < pageAmount - 1}
        >
          {currentPage <= 2 ? "3" : currentPage >= pageAmount - 1 ? pageAmount - 1 : currentPage + 1}
        </PaginationItem>

        <PaginationItem
          className="px-4 py-2"
          onClick={() => {
            handleSetPage(pageAmount - 1);
          }}
          selected={currentPage === pageAmount - 1}
          disabled={currentPage < pageAmount - 2}
        >
          {currentPage >= pageAmount - 1 ? pageAmount : "..."}
        </PaginationItem>

        <PaginationItem
          className="px-4 py-2"
          selected={currentPage === pageAmount}
          onClick={() => {
            handleSetPage(pageAmount);
          }}
        >
          {pageAmount + 1}
        </PaginationItem>

        <PaginationItem
          className="p-4 rounded-r-xl"
          disabled={currentPage >= pageAmount}
          onClick={() => {
            handleSetPage(currentPage + 1);
          }}
        >
          <PaginationIconRight />
        </PaginationItem>
      </div>
    </div>
  );
};

export default Pagination;

type PaginationItemProps = {
  disabled?: boolean;
  selected?: boolean;
  className?: string;
  onClick: () => void;
};

const PaginationItem: FC<PaginationItemProps> = ({ className, disabled, selected, onClick, children }) => {
  const textColor = disabled ? "text-gray-600" : selected ? "text-gray-200" : "text-blue-800";
  const bgColor = selected ? "bg-blue-500" : "bg-gray-300";
  const bgHover = disabled || selected ? "" : "hover:bg-gray-400";
  const cursor = disabled || selected ? "cursor-default" : "";
  const buttonClassName = `w-full text-base ${textColor} ${bgColor} ${bgHover} ${cursor} ${className ?? ""}`;

  return (
    <button
      className={buttonClassName}
      onClick={() => {
        if (!disabled && !selected) onClick();
      }}
    >
      {children}
    </button>
  );
};
