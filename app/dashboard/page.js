"use client";
import { useAuth } from "@/context/Authcontext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../loading";

const videos = [
  {
    title: "The Future of Artificial Intelligence",
    channel: "TechVision",
    time: "2 hours ago",
    duration: "18:42",
    gradient: "from-violet-500 to-indigo-600",
  },
  {
    title: "How Great Founders Think",
    channel: "Startup School",
    time: "Yesterday",
    duration: "42:15",
    gradient: "from-orange-400 to-rose-600",
  },
  {
    title: "React Server Components Explained",
    channel: "Code with Alex",
    time: "3 days ago",
    duration: "27:08",
    gradient: "from-cyan-400 to-blue-600",
  },
];

export default function DashboardPage() {
  const [url, setUrl] = useState("");
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/signin");
    }
  }, [loading, user, router]);

  // Still checking localStorage
  if (loading) {
    return <Loading />;
  }

  // Not authenticated
  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#08090d] text-slate-100">
      <div className="mx-auto flex max-w-[1440px]">
        <section className="w-full px-5 py-6 sm:px-8 lg:px-12 lg:py-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <p className="mb-3 text-sm font-medium text-red-400">
                Your AI video companion
              </p>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Understand any video.
                <br />
                <span className="bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent">
                  Just ask.
                </span>
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-400">
                Paste a YouTube link and have a conversation with its content.
                Get answers, summaries, and insights in seconds.
              </p>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="rounded-2xl border border-white/[.1] bg-[#11131a] p-2 shadow-2xl shadow-black/30 focus-within:border-red-500/50"
            >
              <div className="flex items-center gap-3">
                <span className="pl-3 text-xl text-slate-500">⌕</span>
                <input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste a YouTube video URL..."
                  className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-slate-600"
                />
                <button className="rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold hover:bg-red-400">
                  Start chatting →
                </button>
              </div>
            </form>
            <div className="mt-4 flex justify-center gap-4 text-xs text-slate-500">
              <span>✦ AI-powered answers</span>
              <span>•</span>
              <span>Instant summaries</span>
              <span>•</span>
              <span>Secure & private</span>
            </div>
            <div id="recent" className="mt-20 flex items-end justify-between">
              <div>
                <h2 className="text-lg font-semibold">Recent videos</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Pick up where you left off
                </p>
              </div>
              <button className="text-sm text-slate-400 hover:text-white">
                View all →
              </button>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {videos.map((video) => (
                <article
                  key={video.title}
                  className="group cursor-pointer rounded-2xl border border-white/[.07] bg-[#101117] p-3 hover:-translate-y-1 hover:border-white/20"
                >
                  <div
                    className={`relative flex h-32 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br ${video.gradient}`}
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40">
                      ▶
                    </span>
                    <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px]">
                      {video.duration}
                    </span>
                  </div>
                  <div className="px-1 pt-3">
                    <h3 className="truncate text-sm font-semibold">
                      {video.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      {video.channel} · {video.time}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <footer className="mx-auto mt-20 max-w-4xl border-t border-white/[.06] pt-5 text-center text-xs text-slate-600">
            videogpt uses AI to help you learn faster. Always verify important
            information.
          </footer>
        </section>
      </div>
    </main>
  );
}
