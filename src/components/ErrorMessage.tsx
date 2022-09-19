import { Warning } from "phosphor-react";

type ErrorMessageProps = {
  message: string;
};

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <span className="text-xs font-bold uppercase text-red-600 flex items-center gap-2">
      <Warning size={18} weight="bold" />
      {message}
    </span>
  );
};
