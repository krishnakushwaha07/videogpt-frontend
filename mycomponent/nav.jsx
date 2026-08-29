import { useAuth } from "@/context/Authcontext";
import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { user } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex items-center gap-3 text-xl font-bold tracking-tight text-white"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-red-500 to-rose-600 text-sm shadow-lg shadow-red-500/30 transition duration-300 group-hover:scale-105 group-hover:shadow-red-500/50">
            <span className="translate-x-px">▶</span>
          </span>
          <span>
            video<span className="text-red-400">gpt</span>
          </span>
        </Link>
        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/4 p-1 text-sm text-slate-300 md:flex">
          <Link
            href="/dashboard"
            className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
          >
            Dashboard
          </Link>
          <Link
            href="/#features"
            className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
          >
            Features
          </Link>
          <Link
            href="/#about"
            className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
          >
            About
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={user ? "/profile" : "/signin"}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-white/5 transition hover:-translate-y-0.5 hover:bg-slate-100 sm:px-4 sm:py-2.5"
          >
            {user ? (
              <span>View profile</span>
            ) : (
              <>
                <span className="text-base font-bold text-blue-500">G</span>
                <span>Sign in</span>
              </>
            )}
          </Link>
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded-lg p-2 text-slate-300 transition hover:bg-white/10 hover:text-white md:hidden"
          >
            <span
              className={`block h-0.5 w-5 bg-current transition ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`my-1.5 block h-0.5 w-5 bg-current transition ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-current transition ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="mx-auto mt-3 flex max-w-7xl flex-col gap-1 rounded-xl border border-white/10 bg-white/4 p-2 text-sm text-slate-300 md:hidden">
          <Link
            href="/dashboard"
            onClick={() => setMenuOpen(false)}
            className="rounded-lg px-4 py-3 hover:bg-white/10 hover:text-white"
          >
            Dashboard
          </Link>
          <Link
            href="/#features"
            onClick={() => setMenuOpen(false)}
            className="rounded-lg px-4 py-3 hover:bg-white/10 hover:text-white"
          >
            Features
          </Link>
          <Link
            href="/#about"
            onClick={() => setMenuOpen(false)}
            className="rounded-lg px-4 py-3 hover:bg-white/10 hover:text-white"
          >
            About
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
