import React, { useMemo } from 'react'

export interface FormCounterProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const FormCounter = ({ ...rest }: FormCounterProps) => {
  const counterSize = useMemo(() => {
    if (rest.value) {
      return 4 + rest.value.toString().length
    } else {
      return 4
    }
  }, [rest.value])

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (rest.onChange) {
      let newValue = ev
      if (!newValue.target.value) newValue.target.value = '1'
      newValue.target.value = newValue.target.value.slice(-2)
      rest.onChange(newValue)
    }
  }

  return (
    <input
      style={{ width: `${counterSize}ch` }}
      className="bg-transparent border border-sky-800 rounded px-2 py-1 invalid:border-red-600
         block max-w-screen-md text-ellipsis"
      type="number"
      min="1"
      max="99"
      {...rest}
      onChange={handleChange}
    />
  )
}

export default FormCounter
