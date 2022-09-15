import { Dispatch, SetStateAction } from "react";

type HeaderSelectInputProps = {
  value: string;
  onChange: Dispatch<SetStateAction<"pt-br" | "en-us">>;
  options: {
    value: string;
    name: string;
  }[];
};

export const HeaderSelectInput = ({
  value,
  onChange,
  options,
}: HeaderSelectInputProps) => {
  return (
    <select
      className="flex-1 min-w-sm p-1 rounded"
      value={value}
      onChange={(ev) => {
        if (ev.target.value === "pt-br" || ev.target.value === "en-us")
          onChange(ev.target.value);
      }}
    >
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.name}
        </option>
      ))}
    </select>
  );
};
