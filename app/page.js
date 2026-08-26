'use client';

export default function Home() {


  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <section className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 pb-24 pt-16 lg:grid-cols-2 lg:px-8 lg:pb-32 lg:pt-24">
        <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-red-500/20 blur-3xl" />
        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-400/10 px-4 py-2 text-sm text-red-300"><span className="h-2 w-2 rounded-full bg-red-400" /> Ask anything about any video</div>
          <h1 className="max-w-2xl text-5xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">Your YouTube videos, <span className="text-red-400">understood.</span></h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">Chat with your video content. videogpt retrieves the most relevant moments and gives you clear, grounded answers.</p>
          <p className="mt-4 text-sm text-slate-500">Summarize, search, and ask follow-up questions in seconds.</p>
        </div>

        <div className="relative z-10 rounded-3xl border border-slate-800 bg-slate-900/80 p-3 shadow-2xl shadow-red-950/30">
          <div className="overflow-hidden rounded-2xl bg-slate-950">
            <div className="flex items-center gap-2 border-b border-slate-800 px-5 py-4"><span className="h-3 w-3 rounded-full bg-red-500" /><span className="h-3 w-3 rounded-full bg-yellow-500" /><span className="h-3 w-3 rounded-full bg-green-500" /><span className="ml-auto text-xs text-slate-500">videogpt / video chat</span></div>
            <div className="space-y-4 p-5"><div className="rounded-2xl bg-slate-800/80 p-4"><p className="text-xs text-red-300">You</p><p className="mt-2 text-sm">What are the three main ideas in this video?</p></div><div className="rounded-2xl border border-red-400/20 bg-red-400/10 p-4"><p className="text-xs text-red-300">videogpt</p><p className="mt-2 text-sm leading-6 text-slate-200">The video explains three key ideas, based on the transcript: building a strong foundation, learning through practice, and measuring progress.</p></div></div>
            <div className="flex items-center justify-between border-t border-slate-800 px-5 py-4"><p className="text-xs text-slate-500">Answers grounded in the video transcript</p><span className="rounded-full bg-green-400/10 px-3 py-1 text-xs text-green-400">● Ready</span></div>
          </div>
        </div>
      </section>

      <section id="features" className="border-t border-slate-800/70 bg-slate-900/40 px-6 py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          {[['💬', 'Chat with your video', 'Ask questions naturally and get helpful answers with relevant context.'], ['✨', 'Grounded answers', 'Find summaries, key takeaways, and specific details without rewatching.'], ['⚡', 'Instant summaries', 'Turn long videos into concise chapter summaries and actionable takeaways in seconds.']].map(([icon, title, text]) => <div key={title} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6"><span className="text-2xl">{icon}</span><h2 className="mt-4 font-bold">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-400">{text}</p></div>)}
        </div>
      </section>

      <section id="about" className="border-t border-slate-800/70 px-6 py-16 text-center lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold">Learn more from every video.</h2>
          <p className="mt-4 leading-7 text-slate-400">videogpt uses retrieval-augmented generation to connect your questions with the right moments in a YouTube video.</p>
        </div>
      </section>
    </main>
  );
}
