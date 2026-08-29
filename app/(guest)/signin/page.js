"use client";

import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/3 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-12">
          <button
            type="button"
            onClick={() => router.back()}
            className="mb-8 text-sm text-slate-400 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            ← Go back
          </button>
          <h1 className="mb-3 text-3xl font-bold tracking-tight">
            Welcome to VideoChat
          </h1>
          <p className="mb-8 text-slate-400">
            Sign in or create an account with Google.
          </p>

          <a
            href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-white px-5 py-3 font-medium text-slate-900 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              role="img"
            >
              <path
                fill="#4285F4"
                d="M21.35 12.23c0-.71-.06-1.4-.18-2.05H12v3.88h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.7 2.91-4.2 2.91-7.22Z"
              />
              <path
                fill="#34A853"
                d="M12 21.75c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.28v2.53A9.75 9.75 0 0 0 12 21.75Z"
              />
              <path
                fill="#FBBC05"
                d="M6.53 13.84A5.86 5.86 0 0 1 6.22 12c0-.64.11-1.27.31-1.84V7.63H3.28A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.03 4.37l3.25-2.53Z"
              />
              <path
                fill="#EA4335"
                d="M12 6.13c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.23 14.63 2.25 12 2.25a9.75 9.75 0 0 0-8.72 5.38l3.25 2.53c.77-2.31 2.93-4.03 5.47-4.03Z"
              />
            </svg>
            <span>Continue with Google</span>
          </a>
        </div>
      </div>
    </main>
  );
}
