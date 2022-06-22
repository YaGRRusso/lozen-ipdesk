import { PermissionListTS } from "../../helpers/gambiarra"
import { CategoryTS } from "../../types/categoriesType"
import { SectionTS } from "../../types/sectionsType"

type PropsTS = {
   onChange: (value: string) => void,
   options?: CategoryTS[] | SectionTS[] | PermissionListTS[]
}

export const FormSelect = ({ onChange, options }: PropsTS) => {
   return (
      <select
         className="bg-transparent border border-sky-800 rounded px-2 py-1 invalid:border-red-600
         invalid:text-gray-400 block w-full max-w-screen-md text-ellipsis hover:cursor-pointer"
         defaultValue='' placeholder="Selecione uma opção..." onChange={ev => { onChange(ev.target.value) }} required
      >
         <option className="text-gray-400" disabled value=''>Selecione uma opção</option>
         {options?.map(item => (
            <option className="text-black" key={item.id} value={item.id}>{item.name ?? item.id}</option>
         ))}
      </select>
   )
}