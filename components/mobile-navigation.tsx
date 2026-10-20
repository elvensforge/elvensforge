"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function MobileNavigation({
  shopPage = false,
}: {
  shopPage?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);
  const home = shopPage ? "/" : "";
  const links = [
    { label: "Home", href: shopPage ? "/" : "#home" },
    { label: "LED Bases", href: `${home}#led-bases` },
    { label: "How It Works", href: `${home}#how-it-works` },
    { label: "Gallery", href: `${home}#gallery` },
    { label: "About", href: `${home}#about` },
    { label: "Shop", href: "/shop/" },
  ];
  return (
    <div className="navigationControls">
      <button
        ref={toggle}
        type="button"
        className="menuToggle"
        aria-expanded={open}
        aria-controls="primary-links"
        onClick={() => setOpen(!open)}
      >
        <span>{open ? "Close" : "Menu"}</span>
        <span aria-hidden="true">{open ? "×" : "☰"}</span>
      </button>
      <div id="primary-links" className="navigationLinks" data-open={open}>
        {links.map((link) => (
          <Link
            key={link.label}
            className={
              link.label === "Shop" ? "navigationButton navShop" : undefined
            }
            href={link.href}
            aria-current={
              shopPage && link.label === "Shop" ? "page" : undefined
            }
            onClick={() => setOpen(false)}
          >
            {link.label}
            {link.label === "Shop" && <span aria-hidden="true">↗</span>}
          </Link>
        ))}
      </div>
    </div>
  );
}
