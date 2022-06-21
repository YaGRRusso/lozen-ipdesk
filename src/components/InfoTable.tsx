import { CategoriesTS } from '../types/categoriesType';
import { Trash } from 'phosphor-react'
import { ArticlesTS } from '../types/articleType';
import { SectionsTS } from '../types/sectionsType';
import { ApiTS } from '../types/apiType';

type Props = {
   titles: string[],
   infoList: {
      data: ApiTS[],
      count: number
   }
   deleteFunction: (id: number) => void
}

export const InfoTable = ({ titles, infoList, deleteFunction }: Props) => {
   const { data, count } = infoList

   return (
      <table className='w-full border-separate border-spacing-0 shadow rounded overflow-hidden'>
         <thead className='bg-sky-800 text-white text-left'>
            <tr>
               {titles.map((item, index) => (
                  <th key={index} className={`py-4 px-2 ${index > 0 ? 'hidden sm:table-cell' : ''}`}>{item}</th>
               ))}
               <th className='py-4 px-2 w-14'><span className='flex items-center justify-center border w-12 rounded'>{count}</span></th>
            </tr>
         </thead>
         <tbody>
            {data.map(item => (
               <tr className='hover:bg-slate-100 transition-all' key={item.id}>
                  <td className='p-2'>
                     {item.category_id && <span className='block sm:hidden text-xs text-gray-500'>{item.category_id}</span>}
                     {item.section_id && <span className='block sm:hidden text-xs text-gray-500'>{item.section_id}</span>}
                     <span className='block sm:hidden'>{item.name ?? item.title}</span>
                     {item.id}
                  </td>
                  <td className='p-2 hidden sm:table-cell'>{item.name}</td>
                  {item.category_id && <td className='p-2 hidden sm:table-cell'>{item.category_id}</td>}
                  {item.section_id && <td className='p-2 hidden sm:table-cell text-sm'>{item.section_id}</td>}
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