"use client";

import { PropsWithChildren } from "react";

import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }: PropsWithChildren): JSX.Element => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
