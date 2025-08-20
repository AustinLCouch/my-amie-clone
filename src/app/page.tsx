// app/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import AuthButton from "./components/AuthButton";
import { AppLayout } from "./components/AppLayout";

// Make the component async to use await for the session
export default async function Home() {
  // Fetch the user's session on the server
  const session = await getServerSession(authOptions);

  return (
    <main>
      {/* If the user is logged in, show the app layout */}
      {session ? (
        <AppLayout />
      ) : (
        // Otherwise, show a welcome/login screen
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
          <h1 className="text-4xl font-bold mb-4">Welcome to Your Calendar</h1>
          <p className="mb-6">Please sign in to continue</p>
          <AuthButton />
        </div>
      )}
    </main>
  );
}
