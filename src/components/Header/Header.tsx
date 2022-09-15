import { HeaderList } from "./HeaderList";
import { HeaderTextInput } from "./HeaderInputs/HeaderTextInput";
import { HeaderPasswordInput } from "./HeaderInputs/HeaderPasswordInput";
import { HeaderSelectInput } from "./HeaderInputs/HeaderSelectInput";
import { SignIn } from "phosphor-react";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";

export const Header = () => {
  const { loggedAccount, setLoggedAccount } = useAuthContext();
  const [email_address, setEmail] = useState(
    loggedAccount?.email_address ?? "" ?? ""
  );
  const [password, setPassword] = useState(loggedAccount?.password ?? "");
  const [subdomain, setSubdomain] = useState(loggedAccount?.subdomain ?? "");
  const [locale, setLocale] = useState(loggedAccount?.locale ?? "pt-br");

  const handleLogin = () => {
    setLoggedAccount({
      email_address,
      password,
      subdomain,
      locale,
    });
  };

  return (
    <header className="bg-sky-800">
      <div className="max-w-screen-xl flex-wrap w-11/12 mx-auto py-4 flex items-center justify-center gap-6 text-white">
        <h1 className="text-4xl font-bold flex-1 text-center">
          Lozen Ipdesk 2.0
        </h1>
        <div className="flex flex-2 gap-3 text-black flex-col">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <HeaderTextInput
              placeholder="digite seu email..."
              value={email_address}
              onChange={setEmail}
            />
            <HeaderPasswordInput
              placeholder="digite sua senha..."
              value={password}
              onChange={setPassword}
            />
          </div>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <HeaderTextInput
              placeholder="digite seu subdomínio..."
              value={subdomain}
              onChange={setSubdomain}
            />
            <HeaderSelectInput
              value={locale}
              onChange={setLocale}
              options={[
                { value: "pt-br", name: "Português" },
                { value: "en-us", name: "Inglês" },
              ]}
            />
          </div>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={() => handleLogin()}
              className="p-1 rounded bg-white w-full flex items-center justify-center gap-2 transition-all hover:bg-sky-100"
            >
              Entrar
              <SignIn size={20} />
            </button>
          </div>
        </div>
      </div>
      <nav className="bg-sky-900">
        <HeaderList
          data={[
            { name: "Categorias", local: "/" },
            { name: "Sections", local: "/sections" },
            { name: "Artigos", local: "/articles" },
            { name: "Exportar", local: "/export" },
            { name: "Importar", local: "/import" },
          ]}
        />
      </nav>
    </header>
  );
};
