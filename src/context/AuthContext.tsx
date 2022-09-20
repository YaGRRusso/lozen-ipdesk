import React, { createContext, useContext, useState } from "react";
import { AuthProps } from "../types/apiType";

interface AuthContextProps {
  loggedAccount: AuthProps | undefined;
  setLoggedAccount: (data: AuthProps) => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const initialData = (): AuthProps | undefined => {
  const envAccount = {
    email_address: import.meta.env.VITE_EMAIL,
    password: import.meta.env.VITE_PASSWORD,
    subdomain: import.meta.env.VITE_SUBDOMAIN,
    locale: import.meta.env.VITE_LOCALE,
  };
  const localAccount = localStorage.getItem("lozenUser");

  if (
    envAccount.email_address &&
    envAccount.password &&
    envAccount.subdomain &&
    envAccount.locale
  ) {
    return {
      email_address: envAccount.email_address,
      password: envAccount.password,
      subdomain: envAccount.subdomain,
      locale: envAccount.locale,
    };
  }

  if (localAccount) {
    const parsedLocalAccount: AuthProps = JSON.parse(localAccount);
    return {
      email_address: parsedLocalAccount.email_address,
      password: parsedLocalAccount.password,
      subdomain: parsedLocalAccount.subdomain,
      locale: parsedLocalAccount.locale,
    };
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [account, setAccount] = useState<AuthProps | undefined>(initialData());

  const setLoggedAccount = (data: AuthProps) => {
    localStorage.setItem("lozenUser", JSON.stringify(data));
    setAccount(data);
  };

  return (
    <AuthContext.Provider
      value={{
        loggedAccount: account,
        setLoggedAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error();
  }
  return context;
};
