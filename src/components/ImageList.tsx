import { Image } from "phosphor-react";
import { DownloadButton } from "./DownloadButton";

type ImagesListProps = {
  imagesList: {
    title: string;
    id: number;
  }[];
};

export const ImagesList = ({ imagesList }: ImagesListProps) => {
  return (
    <div className="relative bg-slate-50 rounded border">
      <div className="p-1 text-xs uppercase font-semibold bg-gray-100 border-b">
        Artigos com Imagens
      </div>
      <ul className="flex p-1 max-h-72 overflow-auto flex-col text-xs sm:text-sm items-center">
        {imagesList?.map((item) => (
          <li
            key={item.id}
            className="flex flex-col w-full border-b border-gray-200 py-2 last:border-none"
          >
            <div className="text-xs whitespace-nowrap overflow-hidden overflow-ellipsis max-w-xs">
              {item.title}
            </div>
            <div className="font-mono flex gap-1 items-center justify-start">
              <span
                className="text-sky-700 hover:bg-sky-100 rounded cursor-pointer gap-1 flex items-center"
                onClick={() =>
                  navigator.clipboard.writeText(item.id.toString())
                }
              >
                <Image />
                {item.id}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <span className="w-24 bottom-1 right-5 absolute">
        <DownloadButton title="ids" object={imagesList} />
      </span>
    </div>
  );
};
