interface PropsTS extends React.InputHTMLAttributes<HTMLInputElement> {
}

export const FormCheck = ({ ...rest }: PropsTS) => {
   return (
      <label className="flex gap-2">
         <span>Promoted: </span>
         <input type="checkbox" {...rest}/>
      </label>
   )
}