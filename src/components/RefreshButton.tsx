import { Plugs } from "phosphor-react";

type PropsTS = {
  loading: boolean;
};

export const RefreshButton = ({ loading }: PropsTS) => {
  return (
    <button
      className={`${
        loading ? "animate-spin" : ""
      } hover:bg-sky-100 transition-all border border-sky-800 rounded-full p-2 mx-auto block`}
    >
      <Plugs size={26} color="#075985" />
    </button>
  );
};
