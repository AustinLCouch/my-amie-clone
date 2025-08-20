import Image from "next/image";
import AuthButton from "./components/AuthButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">My Amie Clone</h1>
      <AuthButton />
    </main>
  );
}
