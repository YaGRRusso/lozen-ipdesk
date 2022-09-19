import { CaretLeft, CaretRight } from "phosphor-react";
import { useMemo } from "react";

type PaginationCounterButton = {
  currentPage: number;
  maxPages: number;
  prevPage: () => void;
  nextPage: () => void;
  loading: boolean;
};

export const PaginationCounterButton = ({
  currentPage,
  maxPages,
  prevPage,
  nextPage,
  loading,
}: PaginationCounterButton) => {
  const morePages = useMemo(() => {
    let pages = { prev: false, next: false };
    if (!loading) {
      if (maxPages > 1 && currentPage < maxPages) {
        pages.next = true;
      }
      if (currentPage > 1) {
        pages.prev = true;
      }
    }
    return pages;
  }, [currentPage, maxPages]);

  return (
    <strong className="flex items-center gap-1 justify-center">
      <span
        onClick={() => prevPage()}
        className={`${
          morePages.prev ? "" : "pointer-events-none opacity-60"
        } flex items-center justify-center p-1 rounded hover:bg-sky-700 transition-all cursor-pointer`}
      >
        <CaretLeft weight="bold" />
      </span>
      {currentPage}/{maxPages}
      <span
        onClick={() => nextPage()}
        className={`${
          morePages.next ? "" : "pointer-events-none opacity-60"
        } flex items-center justify-center p-1 rounded hover:bg-sky-700 transition-all cursor-pointer`}
      >
        <CaretRight weight="bold" />
      </span>
    </strong>
  );
};
