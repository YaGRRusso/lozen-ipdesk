import { UploadSimple, Warning } from "phosphor-react";
import { useState } from "react";
import { Inspector } from "react-inspector";

type Props = {
  title: string;
  object: {
    value: any;
    setValue: React.Dispatch<React.SetStateAction<any>>;
    check: string;
  };
  uploadEvent: () => void;
};

export const JsonImporter = ({ title, object, uploadEvent }: Props) => {
  const importCategories = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (ev.target.files && ev.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.readAsText(ev.target.files[0], "UTF-8");
      fileReader.onload = (e) => {
        const parsedJson = JSON.parse(e.target?.result as string);
        if (object.check in parsedJson) {
          object.setValue(parsedJson);
        } else {
          object.setValue({ error: "arquivo inválido" });
        }
      };
    } else {
      object.setValue(undefined);
    }
  };

  return (
    <div className="w-full border-separate border-spacing-0 shadow rounded overflow-hidden">
      <div className="bg-sky-800 text-white text-left font-semibold p-2 flex items-center justify-between">
        <span>Importar {title}</span>
        <button
          onClick={() => uploadEvent()}
          className={`${
            object.value && !object.value.error
              ? ""
              : "text-sky-900 pointer-events-none"
          } flex text-sm items-center gap-1 justify-center px-2 py-1 rounded hover:bg-sky-700 transition-all cursor-pointer`}
        >
          <UploadSimple weight="bold" size={22} />
          Importar
        </button>
      </div>
      <div className="p-4 flex flex-col gap-4">
        <input type="file" onChange={(ev) => importCategories(ev)} />
        {object.value && !object.value.error && (
          <Inspector table={false} data={object.value} />
        )}
        {object.value && object.value.error && (
          <span className="text-xs font-bold uppercase text-red-600 flex items-center gap-2">
            <Warning size={18} weight="bold" />
            Arquivo inválido!
          </span>
        )}
      </div>
    </div>
  );
};
