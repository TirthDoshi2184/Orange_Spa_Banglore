import { useTranslation } from "react-i18next";
import { business, telHref, whatsappHref } from "../data/business";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

export default function StickyContactBar() {
  const { t } = useTranslation();

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-gold-500/25 bg-emerald-950/95 backdrop-blur shadow-[0_-4px_24px_rgba(6,26,21,0.35)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 sm:px-8">
        {/* Phone number (tap to call) */}
        <a
          href={telHref()}
          className="flex min-w-0 items-center gap-2 text-gold-200 transition-colors hover:text-gold-300"
          aria-label={t("common.call")}
        >
          <PhoneIcon className="h-5 w-5 shrink-0" />
          <span className="truncate font-body text-sm font-medium sm:text-base">
            {business.phoneDisplay}
          </span>
        </a>

        {/* WhatsApp button */}
        <a
          href={whatsappHref()}
          target="_blank"
          rel="noreferrer"
          className="flex shrink-0 items-center gap-2 rounded-full bg-gold-500 px-4 py-2 text-sm font-medium text-emerald-950 transition-colors hover:bg-gold-400 sm:px-6"
        >
          <WhatsAppIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          <span>{t("common.whatsapp")}</span>
        </a>
      </div>
    </div>
  );
}