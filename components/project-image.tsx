import Image from "next/image";
import type { ShowcaseImage } from "@/lib/content";

export default function ProjectImage({
  image,
  label,
  hero = false,
}: {
  image?: ShowcaseImage;
  label: string;
  hero?: boolean;
}) {
  return (
    <div className={`projectImage${hero ? " projectImageHero" : ""}`}>
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={
            hero
              ? "(max-width: 760px) 100vw, 50vw"
              : "(max-width: 620px) 100vw, (max-width: 1000px) 50vw, 33vw"
          }
          preload={hero}
          loading={hero ? undefined : "lazy"}
          style={{ objectPosition: image.position || "center" }}
        />
      ) : (
        <div
          className="photoPlaceholder"
          role="img"
          aria-label={`Photo placeholder: ${label}. Original ElvensForge photograph not yet supplied.`}
        >
          <svg
            className="photoPlaceholderIcon"
            viewBox="0 0 64 64"
            fill="none"
            aria-hidden="true"
          >
            <path d="M18 8H8v10m38-10h10v10M8 46v10h10m28 0h10V46" />
            <path d="M20 25h7l3-5h7l3 5h5v22H20z" />
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
