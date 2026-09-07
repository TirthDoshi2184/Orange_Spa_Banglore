import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { telHref, whatsappHref, whatsappServiceMessage } from "../data/business";
import { PhoneIcon, WhatsAppIcon, PinIcon } from "./Icons";

// Three.js is the heaviest dependency on the page; splitting it into its own
// chunk keeps the initial bundle lean while the emblem loads in parallel.
const HeroEmblem = lazy(() => import("../three/HeroEmblem"));

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-emerald-900 pt-24"
    >
      {/* Subtle radial glow behind the emblem */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 42%, rgba(201,164,92,0.16) 0%, rgba(11,61,46,0) 70%)",
        }}
      />

      <Suspense fallback={<HeroEmblemFallback />}>
        <HeroEmblem className="pointer-events-none absolute inset-0 h-full w-full opacity-90" />
      </Suspense>

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 py-20 text-center">
        <span className="flex items-center gap-2 rounded-full border border-gold-500/30 px-4 py-1.5 text-xs tracking-wide text-gold-200/90">
          <PinIcon className="h-3.5 w-3.5" />
          {t("hero.kicker")}
        </span>

        <h1 className="mt-7 max-w-3xl font-display text-4xl leading-[1.15] text-cream-50 sm:text-5xl md:text-6xl">
          {t("hero.headline")}
        </h1>

        <p className="mt-6 max-w-xl text-balance font-body text-base leading-relaxed text-cream-100/80 sm:text-lg">
          {t("hero.sub")}
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappHref(whatsappServiceMessage("a treatment"))}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 text-sm font-medium text-emerald-950 shadow-[0_8px_30px_rgba(201,164,92,0.25)] transition-transform hover:scale-[1.02] hover:bg-gold-400"
          >
            <WhatsAppIcon className="h-4.5 w-4.5" />
            {t("hero.ctaWhatsapp")}
          </a>
          <a
            href={telHref()}
            className="flex items-center justify-center gap-2 rounded-full border border-gold-400/50 px-7 py-3.5 text-sm font-medium text-gold-200 transition-colors hover:bg-gold-500/10"
          >
            <PhoneIcon className="h-4.5 w-4.5" />
            {t("hero.ctaCall")}
          </a>
        </div>
      </div>

      {/* Wave motif echoing the logo's base, as a section-ending flourish */}
      <svg
        className="absolute inset-x-0 bottom-0 h-16 w-full text-cream-50 sm:h-20"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M0 60 C 240 100 480 20 720 45 C 960 70 1200 100 1440 55 L1440 100 L0 100 Z"
        />
      </svg>
    </section>
  );
}

// A static echo of the emblem (ring + a soft glow) shown for the brief moment
// while the Three.js chunk loads, so there's no blank flash on first paint.
function HeroEmblemFallback() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <svg viewBox="0 0 200 200" className="h-56 w-56 opacity-50 sm:h-72 sm:w-72">
        <circle
          cx="100"
          cy="100"
          r="72"
          fill="none"
          stroke="#C9A45C"
          strokeWidth="2.5"
        />
      </svg>
    </div>
  );
}
