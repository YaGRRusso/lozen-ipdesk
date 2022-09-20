import { Info } from 'phosphor-react'
import ReactTooltip from 'react-tooltip'

export interface InfoTooltipProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  title: string
}

const InfoTooltip = ({ title, ...rest }: InfoTooltipProps) => {
  return (
    <span data-tip={title} {...rest}>
      <Info size={20} weight={'bold'} />
      <ReactTooltip effect="solid" />
    </span>
  )
}
export default InfoTooltip
