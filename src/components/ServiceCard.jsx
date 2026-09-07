import { useTranslation } from "react-i18next";
import { telHref, whatsappHref, whatsappServiceMessage } from "../data/business";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

export default function ServiceCard({ service }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === "kn" ? "kn" : "en";

  const name = service.name[lang] || service.name.en;
  // Kannada copy for description/benefits isn't finalised yet for every
  // service, so we fall back to English rather than show a blank card.
  const description = service.description[lang] || service.description.en;
  const benefits = service.benefits[lang]?.length ? service.benefits[lang] : service.benefits.en;

  return (
    <article className="flex h-full flex-col rounded-2xl border border-emerald-900/8 bg-white/70 p-6 shadow-[0_10px_30px_rgba(11,61,46,0.06)] transition-shadow hover:shadow-[0_16px_40px_rgba(11,61,46,0.12)]">
      <h3 lang={lang} className="font-display text-lg leading-snug text-emerald-900">
        {name}
      </h3>

      {description && (
        <p lang={lang} className="mt-2.5 flex-1 font-body text-sm leading-relaxed text-emerald-900/65">
          {description}
        </p>
      )}

      {!description && benefits?.length > 0 && (
        <ul lang={lang} className="mt-2.5 flex-1 space-y-1 font-body text-sm text-emerald-900/65">
          {benefits.slice(0, 4).map((b) => (
            <li key={b} className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold-500" />
              {b}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 flex items-center gap-2 border-t border-emerald-900/8 pt-4">
        <a
          href={telHref()}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-emerald-900/15 py-2 text-xs font-medium text-emerald-900 transition-colors hover:border-gold-500 hover:text-gold-700"
        >
          <PhoneIcon className="h-3.5 w-3.5" />
          {t("contact.callLabel")}
        </a>
        <a
          href={whatsappHref(whatsappServiceMessage(service.name.en))}
          target="_blank"
          rel="noreferrer"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-emerald-900 py-2 text-xs font-medium text-gold-200 transition-colors hover:bg-emerald-800"
        >
          <WhatsAppIcon className="h-3.5 w-3.5" />
          {t("common.whatsapp")}
        </a>
      </div>
    </article>
  );
}
