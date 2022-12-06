export interface FormCheckProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const FormCheck = ({ ...rest }: FormCheckProps) => {
  return (
    <label className="flex dark:text-slate-200 gap-2">
      <span>Promoted: </span>
      <input type="checkbox" {...rest} />
    </label>
  )
}

export default FormCheck
