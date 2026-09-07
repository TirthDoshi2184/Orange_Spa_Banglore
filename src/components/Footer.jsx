import { useTranslation } from "react-i18next";
import { business, telHref, whatsappHref } from "../data/business";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-emerald-950 pb-8 pt-16">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <img src="/images/logo.webp" alt={business.name} className="h-9 w-9 object-contain" />
              <span className="font-display text-sm text-gold-200">
                Orange International Spa
              </span>
            </div>
            <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-cream-100/50">
              {t("footer.tagline")}
            </p>
            <p className="mt-3 font-body text-xs text-cream-100/35">{t("footer.sister")}</p>
          </div>

          <div>
            <p className="font-display text-sm text-gold-200">{t("nav.contact")}</p>
            <div className="mt-4 space-y-2.5 font-body text-sm text-cream-100/60">
              <p>{business.address.line2}</p>
              <p>{business.address.city}</p>
              <p>
                {business.hours.open} – {business.hours.close}
              </p>
            </div>
          </div>

          <div>
            <p className="font-display text-sm text-gold-200">{t("common.branch")}</p>
            <div className="mt-4 flex flex-col gap-2.5">
              <a
                href={telHref()}
                className="flex items-center gap-2 font-body text-sm text-cream-100/70 hover:text-gold-300"
              >
                <PhoneIcon className="h-4 w-4" />
                {business.phoneDisplay}
              </a>
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 font-body text-sm text-cream-100/70 hover:text-gold-300"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {t("common.whatsapp")}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-cream-100/10 pt-6">
          <p className="font-body text-xs text-cream-100/35">
            © {year} {business.name}, {business.branchLabel}. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
