import { Dispatch, SetStateAction } from "react";

export interface HeaderTextInputProps {
  placeholder: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
}

export const HeaderTextInput = ({
  placeholder,
  value,
  onChange,
}: HeaderTextInputProps) => {
  return (
    <input
      type="text"
      className="flex-1 min-w-sm p-1 rounded"
      placeholder={placeholder}
      value={value}
      onChange={(ev) => onChange(ev.target.value)}
    />
  );
};
