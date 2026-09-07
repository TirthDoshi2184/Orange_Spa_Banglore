import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { telHref, whatsappHref, business } from "../data/business";
import {
  PhoneIcon,
  WhatsAppIcon,
  MenuIcon,
  CloseIcon,
  GlobeIcon,
} from "./Icons";

const NAV_LINKS = [
  { key: "home", href: "#home" },
  { key: "about", href: "#about" },
  { key: "services", href: "#services" },
  { key: "contact", href: "#contact" },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLang = () => i18n.changeLanguage(i18n.language === "kn" ? "en" : "kn");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "bg-emerald-900/95 backdrop-blur shadow-[0_2px_24px_rgba(6,26,21,0.35)]"
          : "bg-gradient-to-b from-emerald-950/70 to-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <a href="#home" className="flex items-center gap-3">
          <img
            src="/images/logo.webp"
            alt={business.name}
            className="h-10 w-10 object-contain sm:h-11 sm:w-11"
          />
          <span className="font-display text-sm tracking-wide text-gold-200 sm:text-base">
            Orange International Spa
            <span className="block text-[0.65rem] font-body font-normal tracking-[0.15em] text-cream-100/70">
              {business.branchLabel.toUpperCase()}
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="font-body text-sm text-cream-100/90 transition-colors hover:text-gold-300"
            >
              {t(`nav.${link.key}`)}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={toggleLang}
            className="flex items-center gap-1.5 rounded-full border border-gold-500/40 px-3 py-1.5 text-xs text-gold-200 transition-colors hover:border-gold-400 hover:bg-gold-500/10"
            aria-label="Toggle language"
          >
            <GlobeIcon className="h-3.5 w-3.5" />
            {i18n.language === "kn" ? "EN" : "ಕನ್ನಡ"}
          </button>
          <a
            href={telHref()}
            className="flex items-center gap-1.5 rounded-full border border-gold-500/50 px-4 py-1.5 text-sm text-gold-200 transition-colors hover:bg-gold-500/10"
          >
            <PhoneIcon className="h-4 w-4" />
            {t("common.call")}
          </a>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-gold-500 px-4 py-1.5 text-sm font-medium text-emerald-950 transition-colors hover:bg-gold-400"
          >
            <WhatsAppIcon className="h-4 w-4" />
            {t("common.whatsapp")}
          </a>
        </div>

        <button
          type="button"
          className="text-gold-200 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-gold-500/15 bg-emerald-900/98 px-5 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 font-body text-cream-100/90 hover:bg-gold-500/10 hover:text-gold-300"
              >
                {t(`nav.${link.key}`)}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex items-center gap-2">
            <a
              href={telHref()}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-gold-500/50 py-2.5 text-sm text-gold-200"
            >
              <PhoneIcon className="h-4 w-4" />
              {t("common.call")}
            </a>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gold-500 py-2.5 text-sm font-medium text-emerald-950"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {t("common.whatsapp")}
            </a>
          </div>
          <button
            type="button"
            onClick={toggleLang}
            className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full border border-gold-500/30 py-2 text-xs text-gold-200"
          >
            <GlobeIcon className="h-3.5 w-3.5" />
            {i18n.language === "kn" ? "Switch to English" : "ಕನ್ನಡಕ್ಕೆ ಬದಲಿಸಿ"}
          </button>
        </div>
      )}
    </header>
  );
}
