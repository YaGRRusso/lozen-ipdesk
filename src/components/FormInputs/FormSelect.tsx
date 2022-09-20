import React from 'react'
import { PermissionListTS } from '@helpers/filter'
import { CategoryTS } from '@customTypes/categoriesType'
import { SectionTS } from '@customTypes/sectionsType'

export interface FormSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: CategoryTS[] | SectionTS[] | PermissionListTS[]
}

const FormSelect = ({ options, placeholder, ...rest }: FormSelectProps) => {
  return (
    <select
      className="bg-transparent border border-sky-800 rounded px-2 py-1 invalid:border-red-600
         invalid:text-gray-400 block w-full max-w-screen-md text-ellipsis hover:cursor-pointer"
      {...rest}
    >
      <option className="text-gray-400" disabled value="">
        {placeholder || 'Selecione uma opção...'}
      </option>
      {options?.map((item) => (
        <option className="text-black" key={item.id} value={item.id}>
          {item.name ?? item.id}
        </option>
      ))}
    </select>
  )
}

export default FormSelect
