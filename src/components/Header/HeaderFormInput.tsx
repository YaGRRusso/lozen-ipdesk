import { useState } from "react";
import { Eye, EyeSlash } from "phosphor-react";
import { DomainAction, useDomainContext } from "../../context/DomainContext";

type PropsTS = {
  data: {
    type: "text" | "email" | "password" | "select";
    placeholder?: string;
    value: string;
    dispatch: DomainAction;
    options?: {
      value: string;
      name: string;
    }[];
  };
};

export const HeaderFormInput = ({ data }: PropsTS) => {
  const [showingPass, setShowingPass] = useState(false);
  const { dispatch } = useDomainContext();

  switch (data.type) {
    case "password":
      return (
        <div className="flex-1 flex items-center relative min-w-max">
          <input
            className="px-2 py-1 w-full rounded-sm"
            type={showingPass ? "text" : "password"}
            placeholder="senha..."
            value={data.value}
            onChange={(ev) =>
              dispatch({ type: data.dispatch, payload: ev.target.value })
            }
          />
          <button
            className="hover:bg-gray-200 transition-all px-0.5 rounded absolute right-1"
            onClick={() => setShowingPass(!showingPass)}
          >
            {showingPass ? <Eye size={20} /> : <EyeSlash size={20} />}
          </button>
        </div>
      );
    case "select":
      return (
        <select
          className="rounded-sm px-2 py-1 flex-1 cursor-pointer min-w-max"
          onChange={(ev) =>
            dispatch({ type: data.dispatch, payload: ev.target.value })
          }
        >
          {data.options?.map((item) => (
            <option key={item.value} value={item.value}>
              {item.name}
            </option>
          ))}
        </select>
      );
    default:
      return (
        <input
          className="rounded-sm px-2 py-1 flex-1 min-w-max"
          type={data.type}
          placeholder={data.placeholder}
          value={data.value}
          onChange={(ev) =>
            dispatch({ type: data.dispatch, payload: ev.target.value })
          }
        />
      );
  }
};
