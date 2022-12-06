import { Info } from 'phosphor-react'
import { usePopperTooltip } from 'react-popper-tooltip'
import 'react-popper-tooltip/dist/styles.css'

export interface InfoTooltipProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  title: string
  icon?: JSX.Element
}

const InfoTooltip = ({ title, icon, ...rest }: InfoTooltipProps) => {
  const { getTooltipProps, setTooltipRef, setTriggerRef, visible } =
    usePopperTooltip()

  return (
    <>
      <span ref={setTriggerRef}>
        {icon ? icon : <Info size={20} weight="bold" />}
      </span>
      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({ className: 'tooltip-container' })}
          className="flex text-center rounded bg-slate-900 shadow shadow-slate-600 py-2 px-4 text-slate-200 z-50 max-w-xs"
          {...rest}
        >
          <span className="text-xs">{title}</span>
        </div>
      )}
    </>
  )
}
export default InfoTooltip
