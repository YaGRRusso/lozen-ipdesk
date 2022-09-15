import { Trash } from "phosphor-react";

type Props = {
  titles: string[];
  count: number;
  currentPage?: {
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
  };
  totalPages?: number;
  data: {
    id: number;
    name: string;
    parentId?: number;
  }[];
  deleteFunction: (id: number) => void;
};

export const InfoTable = ({
  titles,
  data,
  count,
  currentPage,
  totalPages,
  deleteFunction,
}: Props) => {
  return (
    <>
      <table className="w-full border-separate border-spacing-0 shadow rounded overflow-hidden">
        <thead className="bg-sky-800 text-white text-left">
          <tr>
            {titles.map((item, index) => (
              <th
                key={index}
                className={`py-4 px-2 ${
                  index > 0 ? "hidden sm:table-cell" : ""
                }`}
              >
                {item}
              </th>
            ))}
            <th className="py-4 px-2 w-14">
              <span className="flex items-center justify-center border w-12 rounded">
                {count}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr className="hover:bg-slate-100 transition-all" key={item.id}>
              <td className="p-2 flex flex-col">
                <span className="sm:hidden text-xs text-gray-500">
                  {item.parentId}
                </span>
                <span className="sm:hidden">{item.name}</span>
                {item.id}
              </td>
              <td className="p-2 hidden sm:table-cell">{item.name}</td>
              {item.parentId && (
                <td className="p-2 hidden sm:table-cell">{item.parentId}</td>
              )}
              <td className="p-2 text-center">
                <button
                  className="hover:bg-red-300 p-1 rounded transition-all"
                  onClick={() => {
                    deleteFunction(item.id as number);
                  }}
                >
                  <Trash size={24} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {totalPages && totalPages > 1 && (
        <ul className="flex gap-4 my-6 justify-evenly items-center">
          {new Array(totalPages).fill(null).map((item, index) => (
            <li
              className={`py-1 px-2 rounded ${
                index + 1 === currentPage?.value
                  ? "bg-sky-800 text-white"
                  : "cursor-pointer hover:bg-gray-200"
              }`}
              key={index + 1}
              onClick={() => currentPage?.setValue(index + 1)}
            >
              {index + 1}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
