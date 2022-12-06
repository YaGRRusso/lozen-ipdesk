import { GithubLogo } from 'phosphor-react'
import { EasyDelete, DarkMode } from '..'

export interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const Footer = ({ ...rest }: FooterProps) => {
  return (
    <div
      className="p-8 text-white gap-4 text-center flex flex-col items-center justify-center"
      {...rest}
    >
      <div className="flex gap-2">
        <a
          target="_blank"
          className="cursor-pointer p-1 rounded transition-all hover:bg-sky-700"
          href="https://github.com/YaGRRusso/lozen-ipdesk"
        >
          <GithubLogo weight="bold" size={20} />
        </a>
        <EasyDelete />
        <DarkMode />
      </div>
      <div className="mb-4">
        Desenvolvido de
        <span className="animate-pulse text-red-500"> ❤ </span>
        para uso interno da Aktie Now
      </div>
    </div>
  )
}

export default Footer
