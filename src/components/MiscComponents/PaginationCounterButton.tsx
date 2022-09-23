import { CaretLeft, CaretRight } from 'phosphor-react'
import { useMemo } from 'react'

export interface PaginationCounterButtonProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  currentPage: number
  maxPages: number
  prevPage: () => void
  nextPage: () => void
  loading: boolean
}

const PaginationCounterButton = ({
  currentPage,
  maxPages,
  prevPage,
  nextPage,
  loading,
  ...rest
}: PaginationCounterButtonProps) => {
  const morePages = useMemo(() => {
    let pages = { prev: false, next: false }
    if (!loading) {
      if (maxPages > 1 && currentPage < maxPages) {
        pages.next = true
      }
      if (currentPage > 1) {
        pages.prev = true
      }
    }
    return pages
  }, [currentPage, maxPages])

  return (
    <strong className="flex items-center gap-1 justify-center" {...rest}>
      <span
        title="Anterior"
        onClick={() => prevPage()}
        className={`${
          morePages.prev ? '' : 'pointer-events-none opacity-60'
        } flex items-center justify-center p-1 rounded hover:bg-sky-700 transition-all cursor-pointer`}
      >
        <CaretLeft weight="bold" />
      </span>
      {currentPage}/{maxPages}
      <span
        title="Próximo"
        onClick={() => nextPage()}
        className={`${
          morePages.next ? '' : 'pointer-events-none opacity-60'
        } flex items-center justify-center p-1 rounded hover:bg-sky-700 transition-all cursor-pointer`}
      >
        <CaretRight weight="bold" />
      </span>
    </strong>
  )
}

export default PaginationCounterButton
