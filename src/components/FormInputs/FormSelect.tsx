import React from "react"
import { PermissionListTS } from "../../helpers/filter"
import { CategoryTS } from "../../types/categoriesType"
import { SectionTS } from "../../types/sectionsType"

interface PropsTS extends React.SelectHTMLAttributes<HTMLSelectElement> {
   options?: CategoryTS[] | SectionTS[] | PermissionListTS[]
}

export const FormSelect = ({ options, ...rest }: PropsTS) => {
   return (
      <select
         className="bg-transparent border border-sky-800 rounded px-2 py-1 invalid:border-red-600
         invalid:text-gray-400 block w-full max-w-screen-md text-ellipsis hover:cursor-pointer"
         defaultValue='' {...rest}
      >
         <option className="text-gray-400" disabled value=''>Selecione uma opção (deve estar conectado)...</option>
         {options?.map(item => (
            <option className="text-black" key={item.id} value={item.id}>{item.name ?? item.id}</option>
         ))}
      </select>
   )
}