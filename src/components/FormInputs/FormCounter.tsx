import { useMemo } from 'react'

export interface FormCounterProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const FormCounter = ({ ...rest }: FormCounterProps) => {
  const counterSize = useMemo(() => {
    if (rest.value) {
      return 3 + rest.value.toString().length
    } else {
      return 3
    }
  }, [rest.value])

  const handleBlur = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (rest.onChange) {
      if (!ev.target.value || parseInt(ev.target.value) <= 0)
        ev.target.value = '1'
      if (parseInt(ev.target.value) > parseInt(ev.target.max))
        ev.target.value = ev.target.max
      rest.onChange(ev)
    }
  }

  // const handleWheel = (ev: WheelEvent) => {
  //   ev.preventDefault()
  //   ev.stopPropagation()
  //   return false
  // }

  // const handleMouseIn = () => {
  //   document.body.addEventListener('wheel', handleWheel, { passive: false })
  // }

  // const handleMouseOut = () => {
  //   document.body.removeEventListener('wheel', handleWheel)
  // }

  return (
    <input
      style={{ width: `${counterSize}ch` }}
      className="no-spin dark:text-slate-200 bg-transparent text-center border border-sky-800 rounded px-2 py-1 invalid:border-red-600
         block max-w-screen-md text-ellipsis text-sky-800 disabled:opacity-75"
      type="number"
      min="1"
      max="100"
      onBlur={handleBlur}
      onFocus={(ev) => ev.target.select()}
      // onMouseEnter={handleMouseIn}
      // onMouseLeave={handleMouseOut}
      {...rest}
    />
  )
}

export default FormCounter
