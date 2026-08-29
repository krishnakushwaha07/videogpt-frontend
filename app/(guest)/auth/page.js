"use client";

import { useEffect, useState } from "react";
import api from "@/axios/api";
import { useAuth } from "@/context/Authcontext";

export default function AuthPage() {
	const [error, setError] = useState("");
	const { setToken } = useAuth()

	useEffect(() => {
		const signIn = async () => {
			const token = new URLSearchParams(window.location.search).get("token");

			if (!token) {
				setError("Authentication token is missing.");
				return;
			}

			try {
				const res = await api.post(
					"/verify-auth",
					{ token },
				);
				
				setToken(res.data)
				window.location.replace("/");
			} catch (err) {
				setError(
					"Authentication failed.",
				);
			}
		};

		signIn();
	}, []);

	return (
		<main className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
			<div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center shadow-2xl">
				{error ? (
					<>
						<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-2xl text-red-400">
							!
						</div>
						<h1 className="text-xl font-semibold text-white">Authentication failed</h1>
						<p className="mt-2 text-sm text-slate-400">{error}</p>
						<button
							type="button"
							onClick={() => window.location.replace("/")}
							className="mt-6 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600"
						>
							Go home
						</button>
					</>
				) : (
					<>
						<div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-blue-500" />
						<h1 className="text-xl font-semibold text-white">Signing in...</h1>
						<p className="mt-2 text-sm text-slate-400">Please wait while we authenticate your account.</p>
					</>
				)}
			</div>
		</main>
	);
}
