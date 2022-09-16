import { CaretLeft, CaretRight, Trash } from "phosphor-react";
import ReactPaginate from "react-paginate";

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
      {totalPages && totalPages > 1 && currentPage && (
        <ReactPaginate
          className="flex gap-1 items-center justify-evenly mt-8 max-w-lg mx-auto"
          activeClassName="pointer-events-none px-1 rounded bg-sky-800 text-white"
          pageClassName="px-1 rounded transition-all hover:bg-gray-200"
          nextClassName="hidden"
          previousClassName="hidden"
          pageCount={totalPages}
          forcePage={currentPage.value - 1}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          previousLabel={<CaretLeft />}
          nextLabel={<CaretRight />}
          onPageChange={(ev) => currentPage.setValue(ev.selected + 1)}
        />
      )}
    </>
  );
};
