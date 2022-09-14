import { Inspector } from "react-inspector";

type Props = {
  title: string;
  object: {
    value: any;
    setValue: React.Dispatch<React.SetStateAction<any>>;
  };
};

export const JsonImporter = ({ title, object }: Props) => {
  const importCategories = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (ev.target.files) {
      const fileReader = new FileReader();
      fileReader.readAsText(ev.target.files[0], "UTF-8");
      fileReader.onload = (e) => {
        object.setValue(JSON.parse(e.target?.result as string));
      };
    }
  };

  return (
    <div className="w-full border-separate border-spacing-0 shadow rounded overflow-hidden">
      <div className="bg-sky-800 text-white text-left font-semibold p-2 flex items-center justify-between">
        <span>Importar {title}</span>
      </div>
      <div className="p-4 flex flex-col gap-4">
        <input type="file" onChange={(ev) => importCategories(ev)} />
        {object.value && <Inspector table={false} data={object.value} />}
      </div>
      {/* {object.value?.count && (
        <div className="flex items-center justify-center">
          <strong>0/{object?.value?.count}</strong>
        </div>
      )} */}
    </div>
  );
};
