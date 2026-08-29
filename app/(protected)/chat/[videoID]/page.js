"use client";

import { Suspense, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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
    <main className="h-dvh overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(127,29,29,0.2),_transparent_35%),#020617] font-sans text-slate-100">
      <div className="mx-auto flex h-full w-full max-w-5xl flex-col gap-4 px-3 py-3 pb-24 sm:gap-6 sm:px-5 sm:py-6 sm:pb-28 md:px-8 md:pb-28 lg:px-10">
        <section
          className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/90 shadow-2xl shadow-black/40 backdrop-blur-xl sm:rounded-3xl"
          aria-label="VideoGPT chat"
        >
          <div className="border-b border-white/10 bg-linear-to-r from-slate-900 via-slate-900 to-red-950/40 px-4 py-4 sm:px-5 sm:py-5 md:px-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-red-500 to-red-900 text-lg shadow-lg shadow-red-950/50 ring-1 ring-red-400/30 sm:h-12 sm:w-12 sm:text-xl">
                  ✨
                </div>
                <div>
                  <h1 className="text-base font-bold tracking-tight sm:text-lg">
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
                className="shrink-0 rounded-lg border border-slate-700 bg-slate-950/30 px-2.5 py-2 text-xs text-slate-300 transition hover:border-red-500 hover:bg-red-950/40 hover:text-white sm:px-3 sm:text-sm"
              >
                ← Go back
              </button>
            </div>
          </div>
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain bg-[radial-gradient(circle_at_top,_rgba(127,29,29,0.16),_transparent_42%),#020617] p-4 scrollbar-thin scrollbar-track-slate-950/40 scrollbar-thumb-red-900/80 hover:scrollbar-thumb-red-600 sm:space-y-5 sm:p-5 md:p-8 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-slate-950/40 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-solid [&::-webkit-scrollbar-thumb]:border-transparent [&::-webkit-scrollbar-thumb]:bg-red-900/80 [&::-webkit-scrollbar-thumb]:bg-clip-padding [&::-webkit-scrollbar-thumb:hover]:bg-red-600">
            <div className="flex items-start gap-3">
              <div className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-red-500/15 text-sm ring-1 ring-red-400/20">
                ✨
              </div>
              <div className="max-w-[calc(100%-2.75rem)] rounded-2xl rounded-tl-sm border border-red-400/15 bg-white/6 px-4 py-3 text-sm leading-6 text-slate-200 shadow-xl shadow-black/10 sm:max-w-xl">
                Hi! I’m VideoGPT. Ask me anything about the content, and I’ll
                help you find the answer.
              </div>
            </div>
            {messages.map((item, index) => (
              <div
                key={`${item.role}-${index}`}
                className={
                  item.role === "user"
                    ? "ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-linear-to-br from-red-500 to-red-700 px-4 py-3 text-sm leading-6 text-white shadow-xl shadow-red-950/30 ring-1 ring-red-300/20 sm:max-w-xl"
                    : "max-w-[85%] rounded-2xl rounded-tl-sm border border-red-400/15 bg-white/6 px-4 py-3 text-sm leading-6 text-slate-200 shadow-xl shadow-black/10 sm:max-w-xl"
                }
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                >
                  {item.content}
                </ReactMarkdown>
              </div>
            ))}
            <Suspense fallback={null}>
              {chatMutation.isPending && (
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-red-400/15 bg-white/6 px-4 py-3 text-sm text-slate-400 sm:max-w-xl">
                  VideoGPT is thinking…
                </div>
              )}
            </Suspense>
          </div>
        </section>
        <form
          onSubmit={handleAsk}
          className="fixed inset-x-0 bottom-0 z-10 sm:px-5 sm:pb-4 md:px-8"
        >
          <div className="mx-auto flex w-full max-w-4xl items-end gap-2 rounded-2xl border border-white/10 bg-slate-800/80 p-2 transition focus-within:border-red-500/70 focus-within:ring-4 focus-within:ring-red-950/60">
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
              className="min-h-11 max-h-32 min-w-0 flex-1 resize-none px-2 py-2.5 text-sm outline-none placeholder:text-slate-500 sm:px-3"
            />
            <button
              type="submit"
              className="shrink-0 rounded-xl bg-linear-to-r from-red-600 to-red-500 px-3 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-950/40 transition hover:-translate-y-0.5 hover:from-red-500 hover:to-red-400 hover:shadow-red-900/50 active:translate-y-0 sm:px-5"
            >
              Ask
            </button>
          </div>
          <p className="mt-3 text-center text-[11px] text-slate-500">
            VideoGPT can make mistakes. Check important information.
          </p>
        </form>
      </div>
    </main>
  );
}
