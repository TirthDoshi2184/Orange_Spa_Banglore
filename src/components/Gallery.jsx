import { useState } from "react";
import { useTranslation } from "react-i18next";

// Paste your Cloudinary URLs here (copy from Media Library → "Copy URL")
const GALLERY_IMAGES = [
  "https://res.cloudinary.com/drl7llkoc/image/upload/v1791885653/WhatsApp_Image_2026-10-10_at_6.25.31_PM_tjfqk7.jpg",
  "https://res.cloudinary.com/drl7llkoc/image/upload/v1791885654/WhatsApp_Image_2026-10-10_at_6.25.35_PM_sknwvw.jpg",
  "https://res.cloudinary.com/drl7llkoc/image/upload/v1791885659/WhatsApp_Image_2026-10-10_at_6.25.37_PM_eaqesg.jpg",
  "https://res.cloudinary.com/drl7llkoc/image/upload/v1791885651/WhatsApp_Image_2026-10-10_at_6.25.30_PM_hp4sre.jpg",
  "https://res.cloudinary.com/drl7llkoc/image/upload/v1791885654/WhatsApp_Image_2026-10-10_at_6.25.34_PM_cyjmnm.jpg",
  "https://res.cloudinary.com/drl7llkoc/image/upload/v1791885657/WhatsApp_Image_2026-10-10_at_6.25.38_PM_1_zywlcv.jpg"
];

// Adds auto format/quality + square crop so images load fast and fit the cards
const optimize = (url) =>
  url.replace("/upload/", "/upload/f_auto,q_auto,c_fill,ar_1:1,w_800/");

function Placeholder() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 text-gold-500/40 sm:h-8 sm:w-8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
    >
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <circle cx="9" cy="10" r="1.7" />
      <path d="M21 16.5 15.5 12 6 20" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GalleryItem({ src, alt }) {
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;

  return (
    <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-gold-500/20 bg-gold-500/[0.04]">
      {showImage ? (
        <img
          src={optimize(src)}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      ) : (
        <Placeholder />
      )}
    </div>
  );
}

export default function Gallery() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-emerald-900 py-24 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(201,164,92,0.06) 0px, rgba(201,164,92,0.06) 1px, transparent 1px, transparent 26px)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center sm:px-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/35 px-4 py-1.5 text-xs text-gold-300">
          {t("gallery.badge")}
        </span>
        <h2 className="mt-6 font-display text-3xl text-cream-50 sm:text-4xl">
          {t("gallery.heading")}
        </h2>
        <p className="mx-auto mt-4 max-w-xl font-body text-[15px] leading-relaxed text-cream-100/70 sm:text-base">
          {t("gallery.body")}
        </p>

        <div className="mt-12 grid grid-cols-3 gap-3 sm:gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <GalleryItem
              key={i}
              src={GALLERY_IMAGES[i]}
              alt={`Orange International Spa Bengaluru interior ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}