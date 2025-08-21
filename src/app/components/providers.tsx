'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

/**
 * NextAuth Session Provider Wrapper
 * 
 * Provides authentication context to the entire application.
 * This component wraps the app to make session data available
 * throughout the component tree.
 */
export function Providers({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
