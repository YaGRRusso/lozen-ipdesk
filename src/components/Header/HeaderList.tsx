import { Link, useLocation } from "react-router-dom";

type PropsTS = {
  data: {
    name: string;
    local: string;
  }[];
};

export const HeaderList = ({ data }: PropsTS) => {
  const { pathname } = useLocation();

  return (
    <ul className="flex flex-wrap py-2 px-4 gap-2 justify-center uppercase font-semibold text-sm text-slate-50">
      {data.map((item) => (
        <li key={item.name}>
          <Link
            to={item.local}
            className={`${pathname === item.local ? "bg-sky-700" : ""}
                  px-2 py-1 rounded-sm hover:bg-sky-700 transition-all cursor-pointer`}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};
