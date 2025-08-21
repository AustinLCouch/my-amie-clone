import { auth } from "../../auth";
import AuthButton from "./components/AuthButton";
import { AppLayout } from "./components/AppLayout";

/**
 * Home Page Component
 * 
 * The main entry point of the application. Shows either the authentication
 * screen for new users or the full app layout for authenticated users.
 * 
 * Features:
 * - Server-side session handling for optimal performance
 * - Beautiful welcome screen with smooth animations
 * - Seamless transition to the main application
 */
export default async function Home() {
  // Fetch the user's session on the server for optimal performance
  const session = await auth();

  return (
    <main className="min-h-screen bg-background">
      {session ? (
        // Authenticated users see the full application
        <AppLayout />
      ) : (
        // New users see a beautiful welcome screen
        <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 -z-10">
            {/* Gradient Orbs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-primary/20 to-accent-purple/20 rounded-full blur-3xl animate-pulse" 
                 style={{ animationDuration: '4s' }} />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-accent-blue/20 to-accent-green/20 rounded-full blur-3xl animate-pulse" 
                 style={{ animationDuration: '6s', animationDelay: '2s' }} />
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.02]" 
                 style={{
                   backgroundImage: `
                     linear-gradient(to right, currentColor 1px, transparent 1px),
                     linear-gradient(to bottom, currentColor 1px, transparent 1px)
                   `,
                   backgroundSize: '40px 40px'
                 }} />
          </div>

          {/* Main Content */}
          <div className="max-w-md w-full space-y-8 text-center animate-fade-in">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary via-accent-blue to-accent-purple rounded-3xl shadow-xl flex items-center justify-center animate-scale-in">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
                Welcome to
                <span className="block bg-gradient-to-r from-primary via-accent-blue to-accent-purple bg-clip-text text-transparent">
                  Amie Clone
                </span>
              </h1>
              
              <p className="text-lg text-foreground-secondary leading-relaxed max-w-sm mx-auto">
                Your beautiful, modern calendar and productivity companion. 
                Organize your life with elegant simplicity.
              </p>
            </div>

            {/* Features Preview */}
            <div className="grid grid-cols-3 gap-4 my-12 animate-slide-in-right" style={{ animationDelay: '200ms' }}>
              <div className="flex flex-col items-center space-y-2 p-4 rounded-xl bg-surface/50 border border-border/50 backdrop-blur-sm hover:bg-surface/70 transition-all duration-200">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-hover rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-foreground-secondary">Calendar</span>
              </div>
              
              <div className="flex flex-col items-center space-y-2 p-4 rounded-xl bg-surface/50 border border-border/50 backdrop-blur-sm hover:bg-surface/70 transition-all duration-200">
                <div className="w-10 h-10 bg-gradient-to-br from-accent-green to-emerald-600 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-foreground-secondary">Tasks</span>
              </div>
              
              <div className="flex flex-col items-center space-y-2 p-4 rounded-xl bg-surface/50 border border-border/50 backdrop-blur-sm hover:bg-surface/70 transition-all duration-200">
                <div className="w-10 h-10 bg-gradient-to-br from-accent-orange to-yellow-600 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-foreground-secondary">Notes</span>
              </div>
            </div>

            {/* Authentication Component */}
            <div className="animate-slide-in-left" style={{ animationDelay: '400ms' }}>
              <AuthButton />
            </div>
          </div>

          {/* Footer */}
          <div className="absolute bottom-8 text-center animate-fade-in" style={{ animationDelay: '600ms' }}>
            <p className="text-xs text-foreground-tertiary">
              Built with Next.js, TypeScript, and Tailwind CSS
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
