import { CategoriesTS } from '../types/types';

type Props = {
   data: CategoriesTS,
   deleteFunction: (id: number) => void
}

export const InfoTable = ({ data, deleteFunction }: Props) => {
   const { categories, count } = data

   return (
      <ul>
         {categories.map(item => (
            <li key={item.id}>
               {item.id} - {item.name} <button onClick={() => { deleteFunction(item.id as number) }}>DEL</button>
            </li>
         ))}
      </ul>
   )
}