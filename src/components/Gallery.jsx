import { useTranslation } from "react-i18next";

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
            <div
              key={i}
              className="flex aspect-square items-center justify-center rounded-2xl border border-gold-500/20 bg-gold-500/[0.04]"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-gold-500/40 sm:h-8 sm:w-8" fill="none" stroke="currentColor" strokeWidth="1.3">
                <rect x="3" y="4" width="18" height="16" rx="2.5" />
                <circle cx="9" cy="10" r="1.7" />
                <path d="M21 16.5 15.5 12 6 20" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
