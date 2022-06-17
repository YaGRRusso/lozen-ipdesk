type PropsTS = {
   placeholder: string,
   onChange: (value: string) => void
}

export const FormInput = ({ placeholder, onChange }: PropsTS) => {
   return (
      <input
         className="bg-transparent border border-sky-800 rounded px-2 py-1 block w-full max-w-screen-md"
         type="text" placeholder={placeholder} onChange={ev => { onChange(ev.target.value) }}
      />
   )
}