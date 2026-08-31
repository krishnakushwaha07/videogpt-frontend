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

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-5xl items-center justify-center">
        <div className="w-full max-w-md overflow-hidden rounded-[28px] border border-rose-400/20 bg-slate-900/85 shadow-[0_25px_80px_rgba(244,63,94,0.25)] ring-1 ring-white/5 backdrop-blur-sm sm:max-w-lg">
          <div className="bg-gradient-to-r from-red-600 via-rose-500 to-orange-400 p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.35em] text-red-50/80">
                  VideoGPT
                </p>
                <h1 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                  Profile
                </h1>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20 hover:shadow-lg hover:shadow-red-500/20 sm:px-4 sm:text-sm"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            {profileLoading ? (
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 animate-pulse rounded-full bg-slate-700 sm:h-20 sm:w-20" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-24 animate-pulse rounded bg-slate-700 sm:h-4" />
                    <div className="h-5 w-32 animate-pulse rounded bg-slate-700 sm:h-6" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="h-20 animate-pulse rounded-2xl bg-slate-800" />
                  <div className="h-20 animate-pulse rounded-2xl bg-slate-800" />
                 
                </div>
              </div>
            ) : profileError ? (
              <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
                Unable to load your profile right now. Please try again.
              </div>
            ) : profile ? (
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full border border-rose-300/30 bg-gradient-to-br from-red-400 via-rose-400 to-orange-400 shadow-lg shadow-red-500/25 sm:h-20 sm:w-20">
                  <img
                    src={profile.profile_link}
                    alt={profile?.name || "User profile"}
                    className="h-full w-full object-cover"
                  />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400">
                      Welcome back
                    </p>
                    <h2 className="mt-1 truncate text-lg font-semibold text-white sm:text-xl">
                      {profile?.name || "User"}
                    </h2>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="rounded-2xl border border-slate-800 bg-slate-800/60 p-4">
                    <p className="text-[9px] font-medium uppercase tracking-[0.24em] text-slate-400">
                      Full Name
                    </p>
                    <p className="mt-2 break-words text-sm font-medium text-white sm:text-base">
                      {profile?.name || "Not available"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-800 bg-slate-800/60 p-4">
                    <p className="text-[9px] font-medium uppercase tracking-[0.24em] text-slate-400">
                      Email
                    </p>
                    <p className="mt-2 break-all text-sm font-medium text-white sm:text-base">
                      {profile?.email || "Not available"}
                    </p>
                  </div>

                 
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
