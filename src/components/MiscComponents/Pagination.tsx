import { useMemo } from 'react'
import ReactPaginate, { ReactPaginateProps } from 'react-paginate'

export interface PaginationProps
  extends Omit<ReactPaginateProps, 'pageCount' | 'forcePage' | 'onPageChange'> {
  currentPage?: number
  totalPages?: number
  pageChange: (page: number) => void
}

const Pagination = ({
  currentPage,
  totalPages,
  pageChange,
  ...rest
}: PaginationProps) => {
  const handlePageChange = (ev: { selected: number }) => {
    pageChange(ev.selected + 1)
  }

  const paginationNumbers = useMemo(() => {
    let current = 1
    let count = 1
    let show = false
    if (currentPage) current = currentPage - 1
    if (totalPages) count = totalPages
    if (count > 1) show = true
    return {
      current,
      count,
      show,
    }
  }, [totalPages, currentPage])

  return (
    <>
      {paginationNumbers?.show && (
        <ReactPaginate
          className="flex gap-1 items-center justify-evenly max-w-lg mx-auto"
          activeClassName="pointer-events-none rounded bg-sky-800 text-white"
          pageClassName="px-1 xs:px-2 rounded transition-all hover:bg-gray-200"
          nextClassName="hidden px-2 font-bold text-sky-800 rounded transition-all hover:bg-gray-200 xs:block"
          nextLabel="›"
          previousClassName="hidden px-2 font-bold text-sky-800 rounded transition-all hover:bg-gray-200 xs:block"
          previousLabel="‹"
          pageCount={paginationNumbers.count}
          forcePage={paginationNumbers.current}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={handlePageChange}
          {...rest}
        />
      )}
    </>
  )
}

export default Pagination
