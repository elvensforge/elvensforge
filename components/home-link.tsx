"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";

export default function HomeLink({ children }: { children: ReactNode }) {
  function goHome(event: MouseEvent<HTMLAnchorElement>) {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      window.location.pathname !== "/"
    )
      return;
    event.preventDefault();
    window.history.replaceState(null, "", "/#home");
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }
  return (
    <Link
      className="brand"
      href="/#home"
      scroll={true}
      aria-label="ElvensForge home"
      onClick={goHome}
    >
      {children}
    </Link>
  );
}
