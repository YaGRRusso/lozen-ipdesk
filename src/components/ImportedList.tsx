import { CaretRight, CopySimple } from "phosphor-react";
import { DownloadButton } from "./DownloadButton";

type ImportedListProps = {
  importedList: {
    title: string;
    old: number;
    new: number;
  }[];
};

export const ImportedList = ({ importedList }: ImportedListProps) => {
  return (
    <div className="relative">
      <ul className="flex max-h-72 overflow-auto flex-col text-xs sm:text-sm items-center">
        {importedList?.map((item) => (
          <li
            key={item.new}
            className="flex flex-col w-full border-b border-gray-200 py-2 last:border-none"
          >
            <div className="text-xs whitespace-nowrap overflow-hidden overflow-ellipsis max-w-xs">
              {item.title}
            </div>
            <div className="font-mono flex gap-1 items-center justify-start">
              <span
                className="text-red-700 hover:bg-red-100 rounded cursor-pointer gap-1 flex items-center"
                onClick={() =>
                  navigator.clipboard.writeText(item.old.toString())
                }
              >
                <CopySimple />
                {item.old}
              </span>
              <CaretRight size={10} weight="bold" />
              <span
                className="text-green-700 hover:bg-green-100 rounded cursor-pointer gap-1 flex items-center"
                onClick={() =>
                  navigator.clipboard.writeText(item.new.toString())
                }
              >
                <CopySimple />
                {item.new}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <span className="w-24 bottom-1 right-5 absolute">
        <DownloadButton title="ids" object={importedList} />
      </span>
    </div>
  );
};
