import { useTranslation } from "react-i18next";
import { business } from "../data/business";
import { PinIcon, ClockIcon, GlobeIcon } from "./Icons";

export default function About() {
  const { t } = useTranslation();

  const facts = [
    {
      icon: PinIcon,
      label: t("about.factLocation"),
      value: business.branchLabel + ", Kammanahalli",
    },
    {
      icon: ClockIcon,
      label: t("about.factHours"),
      value: `${business.hours.open} – ${business.hours.close}`,
    },
    {
      icon: GlobeIcon,
      label: t("about.factLanguages"),
      value: t("about.languages"),
    },
  ];

  return (
    <section id="about" className="bg-cream-50 py-24 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <h2 className="max-w-md font-display text-3xl leading-tight text-emerald-900 sm:text-4xl">
            {t("about.heading")}
          </h2>
          <div className="mt-6 max-w-md space-y-4 font-body text-[15px] leading-relaxed text-emerald-900/75 sm:text-base">
            <p>{t("about.body1")}</p>
            <p>{t("about.body2")}</p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-3 -z-10 rounded-[28px] border border-gold-400/30" />
          <div className="rounded-[24px] bg-emerald-900 p-8 shadow-[0_20px_60px_rgba(11,61,46,0.18)] sm:p-10">
            <p className="font-display text-sm tracking-wide text-gold-300">
              {t("about.factsHeading")}
            </p>
            <dl className="mt-6 space-y-6">
              {facts.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold-500/40 text-gold-300">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <dt className="text-xs text-cream-100/50">{label}</dt>
                    <dd className="mt-0.5 font-body text-[15px] text-cream-50">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
