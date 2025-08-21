'use client';

import { SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

// Also export as NextAuthProvider for compatibility
export const NextAuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};
