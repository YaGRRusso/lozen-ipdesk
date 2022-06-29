type PropsTS = {
   placeholder: string,
   onChange: (value: number) => void,
   value: number
}

export const FormNumber = ({ placeholder, onChange, value }: PropsTS) => {
   return (
      <input
         className="bg-transparent border border-sky-800 rounded px-2 py-1 invalid:border-red-600
         block w-full max-w-screen-md text-ellipsis" value={value}
         type="number" placeholder={placeholder} onChange={ev => { onChange(parseInt(ev.target.value)) }}
      />
   )
}