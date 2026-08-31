"use client";

import { useState } from "react";
import api from "@/axios/api";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function DashboardPage() {
  const [url, setUrl] = useState("");
  const [deletingVideoIds, setDeletingVideoIds] = useState(new Set());
  const queryClient = useQueryClient();

  // get all videos from server.
  const {
    data: videos = [],
    isLoading: videosLoading,
    error: videosQueryError,
  } = useQuery({
    queryKey: ["videos"],
    queryFn: async () => {
      const res = await api.get("/video/videos");

      if (!res?.data || !Array.isArray(res.data)) {
        throw new Error("Invalid videos response");
      }

      return res.data;
    },
  });

  const videosError = videosQueryError
    ? videosQueryError?.response?.data?.message ||
      videosQueryError.message ||
      "Unable to load your videos. Please try again."
    : "";

  // save video url
  const saveVideoMutation = useMutation({
    mutationFn: async (videoUrl) => {
      const res = await api.post("/video/url", { url: videoUrl });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
      setUrl("");
    },
  });

  const deleteVideoMutation = useMutation({
    mutationFn: async (videoId) => {
      await api.delete(`/video/${videoId}`);
    },
    onSuccess: (_, videoId) => {
      setDeletingVideoIds((prev) => {
        const next = new Set(prev);
        next.delete(videoId);
        return next;
      });
      queryClient.invalidateQueries({ queryKey: ["videos"] });
    },
    onError: (_, videoId) => {
      setDeletingVideoIds((prev) => {
        const next = new Set(prev);
        next.delete(videoId);
        return next;
      });
    },
  });

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    saveVideoMutation.mutate(url);
  };

  return (
    <main className="min-h-screen bg-[#08090d] text-slate-100">
      <div className="mx-auto flex max-w-360">
        <section className="w-full px-5 py-6 sm:px-8 lg:px-12 lg:py-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <p className="mb-3 text-sm font-medium text-red-400">
                Your AI video companion
              </p>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Understand any video.
                <br />
                <span className="bg-linear-to-r from-white to-slate-500 bg-clip-text text-transparent">
                  Just ask.
                </span>
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-400">
                Paste a YouTube link and have a conversation with its content.
                Get answers, summaries, and insights in seconds.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-white/10 bg-[#11131a] p-2 shadow-2xl shadow-black/30 focus-within:border-red-500/50"
            >
              <div className="flex items-center gap-3">
                <span className="pl-3 text-xl text-slate-500">⌕</span>
                <input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  placeholder="Paste a YouTube video URL..."
                  className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-slate-600"
                />
                <button
                  type="submit"
                  disabled={saveVideoMutation.isPending}
                  className="rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold hover:bg-red-400"
                >
                  {saveVideoMutation.isPending
                    ? "Saving..."
                    : "Start chatting →"}
                </button>
              </div>
            </form>

            {saveVideoMutation.isError && (
              <p className="mt-3 text-center text-sm text-red-400">
                {saveVideoMutation.error?.response?.data?.message ||
                  "Unable to save this video. Please try again."}
              </p>
            )}

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

            <div className="mt-6">
              {videosLoading ? (
                <p className="text-sm text-slate-500">Loading videos...</p>
              ) : videosError ? (
                <p className="text-sm text-red-400">{videosError}</p>
              ) : videos.length === 0 ? (
                <p className="text-sm text-slate-500">No videos yet.</p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {videos.map((video) => {
                    const thumbnailUrl = `https://img.youtube.com/vi/${video.video_link}/maxresdefault.jpg`;
                    const videoID = `/chat/${video.id}`;
                    const videoTitle = video.title || "Untitled video";

                    return (
                      <div
                        key={video.id}
                        className="group overflow-hidden rounded-xl border border-white/8 bg-[#11131a] transition hover:border-red-500/50"
                      >
                        <Link href={videoID} className="block">
                          <div className="relative min-h-30 overflow-hidden rounded-t-xl border-b border-white/8 bg-[#0d0f14]">
                            <img
                              src={thumbnailUrl}
                              alt={videoTitle}
                              className="h-40 w-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src =
                                  "https://placehold.co/600x340/11131a/94a3b8?text=Video";
                              }}
                            />
                          </div>
                        </Link>
                        <div className="p-4">
                          <h3 className="truncate text-sm font-semibold text-slate-100">
                            {videoTitle}
                          </h3>
                          <button
                            type="button"
                            disabled={deletingVideoIds.has(video.id)}
                            onClick={() => {
                              setDeletingVideoIds((prev) => {
                                const next = new Set(prev);
                                next.add(video.id);
                                return next;
                              });
                              deleteVideoMutation.mutate(video.id);
                            }}
                            className="mt-3 rounded-lg border border-red-500/30 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10 disabled:opacity-50"
                          >
                            {deletingVideoIds.has(video.id)
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <footer className="mx-auto mt-20 max-w-4xl border-t border-white/6 pt-5 text-center text-xs text-slate-600">
            videogpt uses AI to help you learn faster. Always verify important
            information.
          </footer>
        </section>
      </div>
    </main>
  );
}
