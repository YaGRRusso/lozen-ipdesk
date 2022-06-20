type PropsTS = {
   placeholder: string,
   onChange: (value: string) => void
}

export const FormInput = ({ placeholder, onChange }: PropsTS) => {
   return (
      <textarea
         className="bg-transparent border border-sky-800 rounded px-2 py-1 invalid:border-red-800 invalid:border-2
         block w-full max-w-screen-md text-ellipsis"
         placeholder={placeholder} onChange={ev => { onChange(ev.target.value) }}
      />
   )
}