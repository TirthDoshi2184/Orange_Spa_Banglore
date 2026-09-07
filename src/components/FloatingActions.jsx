import { useEffect, useState } from "react";
import { telHref, whatsappHref } from "../data/business";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

export default function FloatingActions() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-5 right-5 z-40 flex flex-col gap-3 transition-all duration-300 sm:bottom-7 sm:right-7 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <a
        href={whatsappHref()}
        target="_blank"
        rel="noreferrer"
        aria-label="Message on WhatsApp"
        className="flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_rgba(6,26,21,0.35)] transition-transform hover:scale-105"
        style={{ height: "3.15rem", width: "3.15rem" }}
      >
        <WhatsAppIcon className="h-6 w-6" />
      </a>
      <a
        href={telHref()}
        aria-label="Call now"
        className="flex items-center justify-center rounded-full bg-gold-500 text-emerald-950 shadow-[0_10px_28px_rgba(6,26,21,0.3)] transition-transform hover:scale-105"
        style={{ height: "3.15rem", width: "3.15rem" }}
      >
        <PhoneIcon className="h-5 w-5" />
      </a>
    </div>
  );
}
