import { CaretLeft, CaretRight, DownloadSimple } from "phosphor-react";
import { useMemo } from "react";
import { Inspector } from "react-inspector";
import { RefreshButton } from "./RefreshButton";

type Props = {
  title: string;
  object: any;
  nextPage: () => void;
  prevPage: () => void;
  loading: boolean;
};

export const JsonViewer = ({
  title,
  object,
  nextPage,
  prevPage,
  loading,
}: Props) => {
  const jsonFile = useMemo(() => {
    if (object) {
      const json = JSON.stringify(object);
      const blob = new Blob([json], { type: "text/json" });
      const url = URL.createObjectURL(blob);
      return {
        url,
        blob,
      };
    }
    return {
      url: "",
      blob: new Blob(),
    };
  }, [object]);

  const morePages = useMemo(() => {
    let pages = { prev: false, next: false };
    if (!loading) {
      if (object?.page_count > 1 && object?.page < object?.page_count) {
        pages.next = true;
      }
      if (object?.page > 1) {
        pages.prev = true;
      }
    }
    return pages;
  }, [object]);

  return (
    <div className="w-full border-separate border-spacing-0 shadow rounded overflow-hidden">
      <div className="bg-sky-800 text-white text-left font-semibold p-2 flex items-center justify-between">
        <span className="flex gap-x-1 flex-col items-center md:flex-row">
          {title}
        </span>
        <strong className="flex items-center gap-1 justify-center">
          <span
            onClick={() => prevPage()}
            className={`${
              morePages.prev ? "" : "pointer-events-none opacity-60"
            } flex items-center justify-center p-1 rounded hover:bg-sky-700 transition-all cursor-pointer`}
          >
            <CaretLeft weight="bold" />
          </span>
          {object?.page}/{object?.page_count}
          <span
            onClick={() => nextPage()}
            className={`${
              morePages.next ? "" : "pointer-events-none opacity-60"
            } flex items-center justify-center p-1 rounded hover:bg-sky-700 transition-all cursor-pointer`}
          >
            <CaretRight weight="bold" />
          </span>
        </strong>
        <a
          onClick={() => console.log(object)}
          download={title.toLowerCase() + ".json"}
          href={jsonFile?.url}
          className="flex text-sm items-center gap-1 justify-center px-2 py-1 rounded hover:bg-sky-700 transition-all cursor-pointer"
        >
          <DownloadSimple weight="bold" size={22} />
          {(jsonFile.blob.size / 1000).toFixed(1) + " kB"}
        </a>
      </div>
      <div className="p-4 max-h-screen-40 overflow-auto">
        {(loading || !object) && <RefreshButton loading={loading} />}
        {!loading && <Inspector table={false} data={object} expandLevel={3} />}
      </div>
    </div>
  );
};
