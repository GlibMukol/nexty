import Link from "next/link";
// import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";

export default async function Home() {

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-zinc-100 mb-6">
            PET Inventory Management
          </h1>
          <p className="text-xl text-gray-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto">
            PET Project auth
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="auth/sign-in"
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="#"
              className="bg-white dark:bg-zinc-800 text-purple-600 px-8 py-3 rounded-lg font-semibold border-2 border-purple-600 hover:bg-purple-50 dark:hover:bg-zinc-700 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}