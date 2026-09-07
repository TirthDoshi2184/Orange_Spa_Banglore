import { useTranslation } from "react-i18next";
import {
  business,
  telHref,
  whatsappHref,
  mapsEmbedSrc,
  mapsDirectionsHref,
} from "../data/business";
import { PhoneIcon, WhatsAppIcon, PinIcon, ClockIcon } from "./Icons";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="bg-cream-50 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <h2 className="max-w-md font-display text-3xl text-emerald-900 sm:text-4xl">
          {t("contact.heading")}
        </h2>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="flex flex-col justify-between rounded-[24px] bg-emerald-900 p-8 sm:p-10">
            <div className="space-y-7">
              <InfoRow icon={PinIcon} label={t("contact.addressLabel")}>
                {business.address.line1}
                <br />
                {business.address.line2}
                <br />
                {business.address.city}
              </InfoRow>
              <InfoRow icon={ClockIcon} label={t("contact.hoursLabel")}>
                {business.hours.open} – {business.hours.close}
              </InfoRow>
              <InfoRow icon={PhoneIcon} label={t("contact.callLabel")}>
                {business.phoneDisplay}
              </InfoRow>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gold-500 py-3 text-sm font-medium text-emerald-950 transition-colors hover:bg-gold-400"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {t("common.whatsapp")}
              </a>
              <a
                href={telHref()}
                className="flex flex-1 items-center justify-center gap-2 rounded-full border border-gold-500/50 py-3 text-sm font-medium text-gold-200 transition-colors hover:bg-gold-500/10"
              >
                <PhoneIcon className="h-4 w-4" />
                {t("contact.callLabel")}
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-[24px] border border-emerald-900/10">
            <iframe
              title="Orange International Spa, Bengaluru — location map"
              src={mapsEmbedSrc()}
              className="h-72 w-full lg:h-full"
              style={{ minHeight: 280, border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <a
          href={mapsDirectionsHref()}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 font-body text-sm text-emerald-900/70 underline decoration-gold-500/50 underline-offset-4 hover:text-emerald-900"
        >
          {t("contact.directions")}
        </a>
      </div>
    </section>
  );
}

function InfoRow({ icon: Icon, label, children }) {
  return (
    <div className="flex items-start gap-4">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold-500/40 text-gold-300">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="text-xs text-cream-100/50">{label}</p>
        <p className="mt-0.5 font-body text-[15px] leading-relaxed text-cream-50">{children}</p>
      </div>
    </div>
  );
}
