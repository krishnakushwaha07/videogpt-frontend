"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/Authcontext";
import Loading from "../loading";

export default function ProtectedLayout({ children }) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/signin");
    }
  }, [loading, user, router]);

  if (loading) {
    return <Loading></Loading>;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
