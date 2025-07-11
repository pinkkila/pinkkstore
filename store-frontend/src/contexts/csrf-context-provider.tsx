"use client";

import React, { createContext, useEffect, useState } from "react";

type CsrfContextProvider = {
  csrfToken: string;
};

export const CsrfContext = createContext<CsrfContextProvider | null>(null);

export default function CsrfContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    if (typeof document !== "undefined") {
      const token = document.cookie.replace(
        /(?:^|.*;\s*)XSRF-TOKEN\s*=\s*([^;]*).*$|^.*$/,
        "$1",
      );
      setCsrfToken(token);
    }
  }, []);

  return (
    <CsrfContext.Provider value={{ csrfToken }}>
      {children}
    </CsrfContext.Provider>
  );
}
