import { Info } from 'phosphor-react'
import { usePopperTooltip } from 'react-popper-tooltip'
import 'react-popper-tooltip/dist/styles.css'

export interface InfoTooltipProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  title: string
}

const InfoTooltip = ({ title, ...rest }: InfoTooltipProps) => {
  const { getTooltipProps, setTooltipRef, setTriggerRef, visible } =
    usePopperTooltip()

  return (
    <>
      <span ref={setTriggerRef}>
        <Info size={20} weight="bold" />
      </span>
      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({ className: 'tooltip-container' })}
          className="flex text-center rounded bg-slate-900 py-2 px-4 text-white z-50"
        >
          <span className="text-xs">{title}</span>
        </div>
      )}
    </>
  )
}
export default InfoTooltip
