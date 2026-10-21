import Image from "next/image";
import type { ShowcaseImage } from "@/lib/content";
export default function ProjectImage({
  image,
  mobileImage,
  label,
  hero = false,
}: {
  image?: ShowcaseImage;
  mobileImage?: ShowcaseImage;
  label: string;
  hero?: boolean;
}) {
  const main = image || mobileImage;
  return (
    <div className={`projectImage${hero ? " projectImageHero" : ""}`}>
      {main ? (
        <>
          <picture>
            {mobileImage && image && (
              <source media="(max-width: 760px)" srcSet={mobileImage.src} />
            )}
            <Image
              src={main.src}
              alt={
                main.placeholder
                  ? `Replaceable image placeholder: ${label}. Original photograph pending.`
                  : mobileImage && image
                    ? "ElvensForge illuminated miniature: Void Dragon on desktop, Nightbringer on mobile."
                    : main.alt
              }
              width={main.width}
              height={main.height}
              sizes={
                hero
                  ? "(max-width: 760px) 100vw, 55vw"
                  : "(max-width: 620px) 100vw, (max-width: 1000px) 50vw, 33vw"
              }
              preload={hero && !mobileImage}
              fetchPriority={hero ? "high" : undefined}
              loading={hero ? "eager" : "lazy"}
              style={{ objectPosition: main.position || "center" }}
            />
          </picture>
          {main.placeholder && (
            <span className="imagePlaceholderTag">Replaceable JPG</span>
          )}
        </>
      ) : (
        <div
          className="photoPlaceholder"
          role="img"
          aria-label={`Original photograph pending: ${label}.`}
        >
          <svg
            className="photoPlaceholderIcon"
            viewBox="0 0 64 64"
            fill="none"
            aria-hidden="true"
          >
            <path d="M18 8H8v10m38-10h10v10M8 46v10h10m28 0h10V46M20 25h7l3-5h7l3 5h5v22H20z" />
            <circle cx="33" cy="35" r="6" />
          </svg>
          <span className="photoPlaceholderLabel">{label}</span>
          <span className="photoPlaceholderNote">
            Original photograph pending
          </span>
        </div>
      )}
    </div>
  );
}
