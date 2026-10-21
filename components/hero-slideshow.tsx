"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const slides = [
  { name: "Void Dragon", src: "/images/home/hero-void-dragon-orbit.webp" },
  { name: "Nekrosor", src: "/images/home/hero-nekrosor-ruins.webp" },
  { name: "Nightbringer", src: "/images/home/hero-blue-ruins.webp" },
];

export default function HeroSlideshow() {
  const background = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = background.current;
    if (!element) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let ready = false;
    let disposed = false;
    const updatePlayback = () => {
      element.dataset.running = String(ready && !document.hidden && !reducedMotion.matches);
    };
    document.addEventListener("visibilitychange", updatePlayback);
    reducedMotion.addEventListener("change", updatePlayback);
    // Decode before starting so a slow or failed request never reveals an empty slide.
    Promise.all(Array.from(element.querySelectorAll("img"), (image) => image.decode()))
      .then(() => {
        if (!disposed) {
          ready = true;
          updatePlayback();
        }
      })
      .catch(() => { /* Keep the preloaded first image if another asset fails. */ });
    return () => {
      disposed = true;
      document.removeEventListener("visibilitychange", updatePlayback);
      reducedMotion.removeEventListener("change", updatePlayback);
    };
  }, []);

  return (
    <div className="heroBackground" aria-hidden="true" ref={background}>
      {slides.map((slide, index) => (
        <Image
          key={slide.src}
          className={`heroSlide heroSlide${index + 1}`}
          data-slide={slide.name}
          src={slide.src}
          alt=""
          fill
          sizes="100vw"
          preload={index === 0}
          loading={index === 0 ? undefined : "eager"}
          fetchPriority={index === 0 ? undefined : "low"}
        />
      ))}
    </div>
  );
}
