import { CategoriesTS } from '../types/types';
import { Trash } from 'phosphor-react'

type Props = {
   data: CategoriesTS,
   deleteFunction: (id: number) => void
}

export const InfoTable = ({ data, deleteFunction }: Props) => {
   const { categories, count } = data

   return (
      <table className='w-full border-separate border-spacing-0 shadow rounded overflow-hidden'>
         <thead className='bg-sky-800 text-white text-left'>
            <tr>
               <th className='py-4 px-2'>Identificação</th>
               <th className='py-4 px-2 hidden sm:table-cell'>Nome</th>
               <th className='py-4 px-2 w-14'><span className='flex items-center justify-center border w-12 rounded'>{count}</span></th>
            </tr>
         </thead>
         <tbody>
            {categories.map(item => (
               <tr className='hover:bg-slate-100 transition-all' key={item.id}>
                  <td className='p-2'><span className='block sm:hidden'>{item.name}</span> {item.id}</td>
                  <td className='p-2 hidden sm:table-cell'>{item.name}</td>
                  <td className='p-2 text-center'>
                     <button className='hover:bg-red-300 p-1 rounded transition-all' onClick={() => { deleteFunction(item.id as number) }}>
                        <Trash size={24} />
                     </button>
                  </td>
               </tr>
            ))}
         </tbody>
      </table>
   )
}