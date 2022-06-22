type PropsTS = {
   placeholder: string,
   onChange: (value: string) => void,
   require?: boolean
}

export const FormInput = ({ placeholder, onChange, require }: PropsTS) => {
   return (
      <input
         className="bg-transparent border border-sky-800 rounded px-2 py-1 invalid:border-red-600
         block w-full max-w-screen-md text-ellipsis" required={require}
         type="text" placeholder={placeholder} onChange={ev => { onChange(ev.target.value) }}
      />
   )
}