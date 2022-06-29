type PropsTS = {
   onChange: (value: boolean) => void,
   value: boolean
}

export const FormCheck = ({ onChange, value }: PropsTS) => {
   return (
      <label className="flex gap-2">
         <span>Promoted: </span>
         <input type="checkbox" checked={value} onChange={(ev) => onChange(!value)}/>
      </label>
   )
}