import { Eye, EyeSlash } from "phosphor-react";
import { Dispatch, SetStateAction, useState } from "react";

export interface HeaderPasswordInputProps {
  placeholder: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
}

export const HeaderPasswordInput = ({
  placeholder,
  value,
  onChange,
}: HeaderPasswordInputProps) => {
  const [showingPass, setShowingPass] = useState(false);

  return (
    <div className="flex-1 flex items-center relative min-w-sm">
      <input
        type={showingPass ? "text" : "password"}
        className="w-full p-1 rounded pr-8"
        placeholder={placeholder}
        value={value}
        onChange={(ev) => onChange(ev.target.value)}
      />
      <button
        className="hover:bg-gray-200 transition-all px-0.5 rounded absolute right-1"
        onClick={() => setShowingPass(!showingPass)}
      >
        {showingPass ? <Eye size={20} /> : <EyeSlash size={20} />}
      </button>
    </div>
  );
};
