"use client";

import { Suspense, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import api from "@/axios/api";

export default function ChatPage() {
  const { videoID } = useParams();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // chat with ai
  const chatMutation = useMutation({
    mutationFn: async (content) => {
      const response = await api.post(`/video/chat/${videoID}`, {
        query: content,
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          content: data,
        },
      ]);
    },
    onError: () => {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          content: "Sorry, I couldn't answer that right now.",
        },
      ]);
    },
  });

  // handle form
  const handleAsk = (e) => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    setMessages((currentMessages) => [
      ...currentMessages,
      { role: "user", content: trimmedMessage },
    ]);

    chatMutation.mutate(trimmedMessage);
    setMessage("");
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(127,29,29,0.2),_transparent_35%),#020617] font-sans text-slate-100">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-7 md:grid-cols-[280px_1fr] md:px-10">
        <aside className="rounded-2xl border border-white/10 bg-slate-900/90 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-red-400">
            Video source
          </p>
          <div className="aspect-video rounded-xl bg-linear-to-br from-red-950 via-red-800 to-red-500 p-4 text-white shadow-lg shadow-red-950/30">
            <div className="flex h-full items-center justify-center rounded-lg border border-white/20 bg-black/10">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-white/20 text-xl shadow-lg ring-1 ring-white/30">
                ▶
              </span>
            </div>
          </div>
          <p className="mt-4 truncate text-sm font-bold text-white">
            Video ID: {videoID}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Ready to answer your questions
          </p>
          <div className="mt-6 border-t border-slate-800 pt-4">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-red-400">
              Try asking
            </p>
            {[
              "Summarize this video",
              "What are the key takeaways?",
              "Explain the main concept",
            ].map((item, index) => (
              <p
                key={index}
                className="mb-2 w-full rounded-lg border border-transparent bg-slate-800/80 px-3 py-2 text-left text-xs text-slate-300 transition hover:border-red-800/60 hover:bg-gradient-to-r hover:from-red-950 hover:to-slate-800 hover:text-red-200"
              >
                {item}
              </p>
            ))}
          </div>
        </aside>
        <section
          className="flex min-h-[calc(100vh-145px)] flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900/90 shadow-2xl shadow-black/40 backdrop-blur-xl"
          aria-label="VideoGPT chat"
        >
          <div className="border-b border-white/10 bg-linear-to-r from-slate-900 via-slate-900 to-red-950/40 px-5 py-5 md:px-8">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-linear-to-br from-red-500 to-red-900 text-xl shadow-lg shadow-red-950/50 ring-1 ring-red-400/30">
                  ✨
                </div>
                <div>
                  <h1 className="text-lg font-bold tracking-tight">
                    Chat about your video
                  </h1>
                  <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>{" "}
                    VideoGPT is online
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => router.back()}
                className="rounded-lg border border-slate-700 bg-slate-950/30 px-3 py-2 text-sm text-slate-300 transition hover:border-red-500 hover:bg-red-950/40 hover:text-white"
              >
                ← Go back
              </button>
            </div>
          </div>
          <div className="flex-1 space-y-5 overflow-y-auto bg-[radial-gradient(circle_at_top,_rgba(127,29,29,0.16),_transparent_42%),#020617] p-5 md:p-8">
            <div className="flex items-start gap-3">
              <div className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-red-500/15 text-sm ring-1 ring-red-400/20">
                ✨
              </div>
              <div className="max-w-xl rounded-2xl rounded-tl-sm border border-red-400/15 bg-white/6 px-4 py-3 text-sm leading-6 text-slate-200 shadow-xl shadow-black/10">
                Hi! I’m VideoGPT. Ask me anything about the content, and I’ll
                help you find the answer.
              </div>
            </div>
            {messages.map((item, index) => (
              <div
                key={`${item.role}-${index}`}
                className={
                  item.role === "user"
                    ? "ml-auto max-w-xl rounded-2xl rounded-tr-sm bg-linear-to-br from-red-500 to-red-700 px-4 py-3 text-sm leading-6 text-white shadow-xl shadow-red-950/30 ring-1 ring-red-300/20"
                    : "max-w-xl rounded-2xl rounded-tl-sm border border-red-400/15 bg-white/6 px-4 py-3 text-sm leading-6 text-slate-200 shadow-xl shadow-black/10"
                }
              >
                {item.content}
              </div>
            ))}
            <Suspense fallback={null}>
              {chatMutation.isPending && (
                <div className="max-w-xl rounded-2xl rounded-tl-sm border border-red-400/15 bg-white/6 px-4 py-3 text-sm text-slate-400">
                  VideoGPT is thinking…
                </div>
              )}
            </Suspense>
          </div>
          <form
            onSubmit={handleAsk}
            className="border-t border-white/10 bg-slate-900/95 p-4 md:p-5"
          >
            <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-slate-800/80 p-2 shadow-2xl shadow-black/20 transition focus-within:border-red-500/70 focus-within:ring-4 focus-within:ring-red-950/60">
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    handleAsk(event);
                  }
                }}
                rows="1"
                placeholder="Ask anything about this video..."
                className="min-h-11 flex-1 resize-none bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-slate-500"
              />
              <button
                type="submit"
                className="rounded-xl bg-linear-to-r from-red-600 to-red-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-950/40 transition hover:-translate-y-0.5 hover:from-red-500 hover:to-red-400 hover:shadow-red-900/50 active:translate-y-0"
              >
                Ask
              </button>
            </div>
            <p className="mt-3 text-center text-[11px] text-slate-500">
              VideoGPT can make mistakes. Check important information.
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}
