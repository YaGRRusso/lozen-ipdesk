import { CheckCircle } from 'phosphor-react'
import { useMemo } from 'react'

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  current?: number
  max?: number
}

const ProgressBar = ({ current, max, ...rest }: ProgressBarProps) => {
  const progressPercentage = useMemo(() => {
    if (current && max) {
      return (current * 100) / max
    } else {
      return 0
    }
  }, [current, max])

  return (
    <div
      className={`${max ? '' : 'hidden'}
      h-4 sm:mx-6 flex w-auto bg-sky-100 rounded`}
      {...rest}
    >
      <div
        style={{ width: progressPercentage + '%' }}
        className={`${progressPercentage ? 'px-2' : ''}
         bg-sky-800 transition-all duration-1000 flex rounded gap-1 justify-end items-center text-white text-xs font-bold`}
      >
        <CheckCircle weight="bold" />
        <span>
          {current}/{max}
        </span>
      </div>
    </div>
  )
}

export default ProgressBar
