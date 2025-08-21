<<<<<<< HEAD
'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

/**
 * Enhanced Authentication Button Component
 * 
 * Features:
 * - Beautiful loading states with animated spinner
 * - Smooth hover and focus interactions
 * - Modern design with glass morphism effects
 * - Accessible with proper ARIA labels
 * - Responsive design for all screen sizes
 */
export default function AuthButton() {
  const { data: session, status } = useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  /**
   * Handle sign out with loading state
   */
  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setIsSigningOut(false);
    }
  };

  /**
   * Handle sign in with loading state
   */
  const handleSignIn = async () => {
    setIsSigningIn(true);
    try {
      await signIn('google');
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsSigningIn(false);
    }
  };

  // Loading state with elegant spinner
  if (status === 'loading') {
    return (
      <div className="flex items-center gap-3 text-foreground-secondary animate-fade-in">
        <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full" />
        <span className="text-sm font-medium">Loading...</span>
      </div>
    );
  }

  // Authenticated state with user welcome and sign out
  if (session) {
    return (
      <div className="flex flex-col items-center gap-6 animate-fade-in">
        {/* User Welcome */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-accent-purple rounded-full mb-3">
            <span className="text-white font-semibold text-lg">
              {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || 'U'}
            </span>
          </div>
          <h2 className="text-xl font-semibold text-foreground">
            Welcome back!
          </h2>
          <p className="text-foreground-secondary text-sm">
            {session.user?.name || session.user?.email}
          </p>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          disabled={isSigningOut}
          className={`
            relative px-8 py-3 min-w-[140px]
            bg-surface border border-border
            text-foreground text-sm font-medium
            rounded-xl shadow-sm
            transition-all duration-200 ease-out
            hover:shadow-md hover:border-accent-red/30 hover:bg-surface-hover
            focus-ring focus:border-accent-red
            disabled:opacity-50 disabled:cursor-not-allowed
            group
          `}
          aria-label={isSigningOut ? 'Signing out...' : 'Sign out of your account'}
        >
          {isSigningOut ? (
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin h-4 w-4 border-2 border-accent-red border-t-transparent rounded-full" />
              <span>Signing out...</span>
            </div>
          ) : (
            <span className="group-hover:text-accent-red transition-colors">
              Sign out
            </span>
          )}
        </button>
      </div>
    );
  }

  // Unauthenticated state with sign in button
  return (
    <div className="flex flex-col items-center gap-6 animate-fade-in">
      {/* Sign In Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary via-accent-blue to-accent-purple rounded-2xl mb-4 shadow-lg">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Welcome to Amie Clone
        </h2>
        <p className="text-foreground-secondary text-sm max-w-sm mx-auto leading-relaxed">
          Sign in with your Google account to access your calendar, tasks, and productivity features.
        </p>
      </div>

      {/* Sign In Button */}
      <button
        onClick={handleSignIn}
        disabled={isSigningIn}
        className={`
          relative px-8 py-4 min-w-[200px]
          bg-gradient-to-r from-primary to-primary-hover
          text-white text-sm font-semibold
          rounded-xl shadow-lg
          transition-all duration-300 ease-out
          hover:shadow-xl hover:scale-105
          focus-ring focus:scale-105
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
          group
        `}
        aria-label={isSigningIn ? 'Signing in...' : 'Sign in with Google'}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-hover to-accent-purple rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative flex items-center justify-center gap-3">
          {isSigningIn ? (
            <>
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continue with Google</span>
            </>
          )}
        </div>
      </button>
      
      {/* Privacy Note */}
      <p className="text-xs text-foreground-tertiary text-center max-w-xs mx-auto leading-relaxed">
        By signing in, you agree to our terms of service and privacy policy. Your data is secure and encrypted.
      </p>
    </div>
=======

// app/components/AuthButton.tsx
'use client'; // This must be a client component

import { signIn, signOut, useSession } from 'next-auth/react';

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        {session.user?.email} <br />
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn('google')}>Sign In with Google</button>
    </>
>>>>>>> main
  );
}
