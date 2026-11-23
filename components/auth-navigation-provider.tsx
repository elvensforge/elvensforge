"use client";

import { useAuth } from "@clerk/nextjs";
import type { ReactNode } from "react";
import { NavigationSignedIn } from "./auth-navigation-context";

export default function AuthNavigationProvider({ children }: { children: ReactNode }) {
  const { isSignedIn } = useAuth();

  return <NavigationSignedIn value={isSignedIn}>{children}</NavigationSignedIn>;
}
