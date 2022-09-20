export interface FormCheckProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const FormCheck = ({ ...rest }: FormCheckProps) => {
  return (
    <label className="flex gap-2">
      <span>Promoted: </span>
      <input type="checkbox" {...rest} />
    </label>
  )
}

export default FormCheck
