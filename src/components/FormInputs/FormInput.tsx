export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  sm?: boolean
}

const FormInput = ({ sm, ...rest }: FormInputProps) => {
  return (
    <input
      className="bg-transparent border border-sky-800 rounded px-2 py-1 invalid:border-red-600
         block w-full max-w-screen-md text-ellipsis"
      type="text"
      {...rest}
    />
  )
}

export default FormInput
