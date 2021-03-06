interface PropsTS extends React.InputHTMLAttributes<HTMLInputElement>{
}

export const FormInput = ({ ...rest }: PropsTS) => {
   return (
      <input
         className="bg-transparent border border-sky-800 rounded px-2 py-1 invalid:border-red-600
         block w-full max-w-screen-md text-ellipsis"
         type={rest.type ?? 'text'} {...rest}
      />
   )
}