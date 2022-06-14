import { CategoryTS } from '../types/types';

type Props = {
   data: CategoryTS,
   deleteFunction: (id: number) => void
}

export const Category = ({ data, deleteFunction }: Props) => {

   return (
      <h2>
         {data.name} - {data.description}
         <button onClick={() => { deleteFunction(data.id as number) }}>Delete</button>
      </h2>
   )
}