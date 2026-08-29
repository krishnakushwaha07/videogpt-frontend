export default function Loading() {
	return (
		<main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
			<div className="flex flex-col items-center gap-6 text-center">
				<div className="relative flex h-20 w-20 items-center justify-center">
					<div className="absolute inset-0 animate-spin rounded-full border-4 border-slate-800 border-t-red-400" />
					<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-red-400 to-rose-600 shadow-lg shadow-red-500/20">
						<svg
							aria-hidden="true"
							className="h-6 w-6 fill-current text-white"
							viewBox="0 0 24 24"
						>
							<path d="M8 5.14v13.72a1 1 0 0 0 1.52.86l10.3-6.86a1.03 1.03 0 0 0 0-1.72L9.52 4.28A1 1 0 0 0 8 5.14Z" />
						</svg>
					</div>
				</div>
				<div>
					<h1 className="text-2xl font-semibold tracking-tight">VideoGPT</h1>
					<p className="mt-2 text-sm text-slate-400">Preparing your experience...</p>
				</div>
				<div className="flex gap-1.5" aria-label="Loading">
					<span className="h-1.5 w-1.5 animate-bounce rounded-full bg-red-400 [animation-delay:-0.3s]" />
					<span className="h-1.5 w-1.5 animate-bounce rounded-full bg-red-400 [animation-delay:-0.15s]" />
					<span className="h-1.5 w-1.5 animate-bounce rounded-full bg-red-400" />
				</div>
			</div>
		</main>
	)
}


