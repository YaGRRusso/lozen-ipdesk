import React from 'react'
import { PermissionListProps } from '@helpers/filter'
import { CategoryProps } from '@customTypes/CategoriesType'
import { SectionProps } from '@customTypes/SectionsType'

export interface FormSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: CategoryProps[] | SectionProps[] | PermissionListProps[]
  manually?: boolean
}

const FormSelect = ({
  options,
  placeholder,
  manually,
  ...rest
}: FormSelectProps) => {
  return (
    <select
      className="bg-transparent border border-sky-800 rounded px-2 py-1 invalid:border-red-600
         invalid:text-gray-400 dark:text-slate-200 block w-full max-w-screen-md text-ellipsis hover:cursor-pointer"
      {...rest}
    >
      <option
        className="text-gray-400 dark:text-gray-600 dark:bg-slate-800"
        disabled
        value=""
      >
        {placeholder || 'Selecione uma opção...'}
      </option>
      {options?.map((item) => (
        <option
          className="text-black dark:bg-slate-800 dark:text-slate-200"
          key={item.id}
          value={item.id}
        >
          {item.name ?? item.id}
        </option>
      ))}
      {manually && (
        <option
          className="text-black bg-slate-200 dark:bg-slate-900 dark:text-slate-200"
          value="manually"
        >
          Digitar manualmente...
        </option>
      )}
    </select>
  )
}

export default FormSelect
