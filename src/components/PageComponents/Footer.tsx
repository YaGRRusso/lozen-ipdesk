import { EasyDelete } from '..'

export interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const Footer = ({ ...rest }: FooterProps) => {
  return (
    <div
      className="p-8 text-white gap-4 text-center flex flex-col items-center justify-center"
      {...rest}
    >
      <EasyDelete />
      <div className="mb-4">
        Desenvolvido de
        <span className="animate-pulse text-red-500"> ❤ </span>
        para uso interno da Aktie Now
      </div>
    </div>
  )
}

export default Footer
