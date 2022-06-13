import { categoriesApi } from '../api/categories';
import { CategoryTS } from '../types/types';

type Props = {
   data: CategoryTS
}

export const Category = ({ data }: Props) => {
   const delCategory = (id: number) => {
      categoriesApi.deleteCategories(id)
   }

   return (
      <h2>
         {data.name} - {data.description}
         <button onClick={() => { delCategory(data.id as number) }}>Delete</button>
      </h2>
   )
}