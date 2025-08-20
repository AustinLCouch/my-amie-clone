'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div className="text-gray-500">Loading...</div>;
  }

  if (session) {
    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-lg">Welcome, {session.user?.name || session.user?.email}</p>
        <button
          onClick={() => signOut()}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn('google')}
      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      Sign in with Google
    </button>
  );
}
