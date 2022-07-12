interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
}

export const FormButton = ({ ...rest }: Props) => {
   return (
      <input
         className="bg-transparent border rounded px-2 py-1 cursor-pointer transition-all w-1/3 mt-8 border-sky-800
         text-sky-800 hover:bg-sky-800 hover:text-white disabled:opacity-75 disabled:cursor-default"
         type='submit' value='Criar' {...rest}
      />
   )
}