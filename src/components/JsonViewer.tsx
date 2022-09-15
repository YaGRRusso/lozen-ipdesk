import { DownloadSimple } from "phosphor-react";
import { useMemo } from "react";
import { Inspector } from "react-inspector";

type Props = {
  title: string;
  object: any;
};

export const JsonViewer = ({ title, object }: Props) => {
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

  return (
    <div className="w-full border-separate border-spacing-0 shadow rounded overflow-hidden">
      <div className="bg-sky-800 text-white text-left font-semibold p-2 flex items-center justify-between">
        <span>
          {title} ({(jsonFile.blob.size / 1000).toFixed(1) + " kB"})
        </span>
        <a
          onClick={() => console.log(object)}
          download={title.toLowerCase() + ".json"}
          href={jsonFile?.url}
          className={`${
            jsonFile?.url ? "" : "pointer-events-none text-sky-900"
          } flex items-center gap-2 justify-center px-2 py-1 rounded hover:bg-sky-700 transition-all cursor-pointer`}
        >
          Baixar
          <DownloadSimple size={24} />
        </a>
      </div>
      <div className="p-4">
        <Inspector table={false} data={object} expandLevel={1} />
      </div>
    </div>
  );
};
