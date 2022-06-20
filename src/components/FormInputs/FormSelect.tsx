import { CategoryTS } from "../../types/categoriesType"
import { SectionTS } from "../../types/sectionsType"

type PropsTS = {
   onChange: (value: string) => void,
   options?: CategoryTS[] | SectionTS[]
}

export const FormSelect = ({ onChange, options }: PropsTS) => {
   return (
      <select
         className="bg-transparent border border-sky-800 rounded px-2 py-1 invalid:border-red-800 invalid:border-2
         block w-full max-w-screen-md text-ellipsis hover:cursor-pointer"
         onChange={ev => { onChange(ev.target.value) }} required
      >
         {options?.map(item => (
            <option key={item.id} value={item.id}>{item.name}</option>
         ))}
      </select>
   )
}