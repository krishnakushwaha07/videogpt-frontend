"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/axios/api";
import { useAuth } from "@/context/Authcontext";

export default function ProfilePage() {
  const { logoutUser } = useAuth();

  const {
    data: profile,
    isLoading: profileLoading,
    isError: profileError,
  } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await api.get("/me");
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  if (profileLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12">
        <section className="h-95 w-full max-w-md animate-pulse rounded-3xl border border-white/10 bg-white/6 p-6 shadow-2xl sm:p-8">
          <div className="h-24 w-24 rounded-3xl bg-slate-700" />
          <div className="mt-6 h-7 w-2/3 rounded bg-slate-700" />
          <div className="mt-3 h-4 w-1/2 rounded bg-slate-800" />
          <div className="mt-8 h-12 rounded-xl bg-slate-800" />
        </section>
      </main>
    );
  }

  if (profileError || !profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12 text-white">
        <p className="text-sm text-red-300">Unable to load your profile.</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12 text-white">
      <section className="w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-white/6 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <div className="h-28 bg-linear-to-r from-rose-600 via-red-500 to-orange-400" />

        <div className="px-6 pb-6 sm:px-8 sm:pb-8">
          <div className="-mt-12 flex items-end justify-between">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-slate-950 overflow-hidden shadow-lg">
              <img
                src={profile.profile_link}
                alt="profile"
                width={96}
                height={96}
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="mb-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
              Active
            </span>
          </div>

          <div className="mt-5">
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">
              {profile.name}
            </h1>
            <p className="mt-2 text-sm text-slate-400">{profile.email}</p>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6">
            <button
              type="button"
              onClick={logoutUser}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm font-semibold text-red-300 transition hover:border-red-400/40 hover:bg-red-400/20 focus:outline-none focus:ring-2 focus:ring-red-400/50"
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6A2.25 2.25 0 0 0 5.25 5.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 12h9m0 0-3-3m3 3-3 3"
                />
              </svg>
              Log out
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
