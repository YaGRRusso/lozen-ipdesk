export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const FormInput = ({ ...rest }: FormInputProps) => {
  const handleBlur = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (rest.type === 'number') {
      if (rest.onChange) {
        if (!ev.target.value || parseInt(ev.target.value) <= 0)
          ev.target.value = ''
        if (parseInt(ev.target.value) > parseInt(ev.target.max))
          ev.target.value = ev.target.max
        rest.onChange(ev)
      }
    }
  }

  return (
    <input
      className="bg-transparent border border-sky-800 rounded px-2 py-1 invalid:border-red-600
         block w-full max-w-screen-md text-ellipsis"
      type="text"
      onBlur={handleBlur}
      {...rest}
    />
  )
}

export default FormInput
