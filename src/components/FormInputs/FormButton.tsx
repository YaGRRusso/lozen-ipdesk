export interface FormButtonProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const FormButton = ({ ...rest }: FormButtonProps) => {
  return (
    <input
      className="bg-transparent border rounded px-2 py-1 cursor-pointer transition-all w-full max-w-xs border-sky-800
         text-sky-800 hover:bg-sky-800 hover:text-white disabled:opacity-75 disabled:cursor-default"
      type="submit"
      value="Criar"
      {...rest}
    />
  )
}

export default FormButton
