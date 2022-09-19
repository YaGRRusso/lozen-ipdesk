import { UploadSimple } from "phosphor-react";

type UploadButtonProps = {
  onClick: () => void;
  active: boolean;
};

export const UploadButton = ({ onClick, active }: UploadButtonProps) => {
  return (
    <button
      onClick={() => onClick()}
      className={`${
        active ? "" : "text-sky-900 pointer-events-none"
      } flex text-sm items-center gap-1 justify-center px-2 py-1 rounded hover:bg-sky-700 transition-all cursor-pointer`}
    >
      <UploadSimple weight="bold" size={22} />
      Importar
    </button>
  );
};
