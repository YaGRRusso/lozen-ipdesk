type PropsTS = {
   placeholder: string,
   require?: boolean,
   onChange: (value: string) => void
}

export const FormInput = ({ placeholder, onChange, require }: PropsTS) => {
   return (
      <input
         className="bg-transparent border border-sky-800 rounded px-2 py-1 invalid:border-red-800 invalid:border-2
         block w-full max-w-screen-md text-ellipsis"
         type="text" placeholder={placeholder} onChange={ev => { onChange(ev.target.value) }} required={require}
      />
   )
}