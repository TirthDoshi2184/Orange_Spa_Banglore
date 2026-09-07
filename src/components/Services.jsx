import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { categoryOrder, services } from "../data/services";
import ServiceCard from "./ServiceCard";
import { SearchIcon } from "./Icons";

export default function Services() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return services.filter((s) => {
      const matchesCategory = activeCategory === "all" || s.category === activeCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        s.name.en.toLowerCase().includes(q) ||
        s.name.kn.includes(query.trim()) ||
        s.category.toLowerCase().includes(q)
      );
    });
  }, [activeCategory, query]);

  return (
    <section id="services" className="bg-cream-100 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl text-emerald-900 sm:text-4xl">
            {t("services.heading")}
          </h2>
          <p className="mt-4 font-body text-[15px] leading-relaxed text-emerald-900/70 sm:text-base">
            {t("services.sub")}
          </p>
        </div>

        <div className="relative mx-auto mt-10 max-w-md">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-900/40" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("services.searchPlaceholder")}
            className="w-full rounded-full border border-emerald-900/12 bg-white/80 py-3 pl-11 pr-4 font-body text-sm text-emerald-900 placeholder:text-emerald-900/40 focus:border-gold-500"
          />
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-2.5">
          <CategoryChip
            active={activeCategory === "all"}
            onClick={() => setActiveCategory("all")}
            label={t("common.allCategories")}
          />
          {categoryOrder.map((cat) => (
            <CategoryChip
              key={cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              label={cat}
            />
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <p className="mt-16 text-center font-body text-sm text-emerald-900/50">
            {t("services.noResults")}
          </p>
        )}
      </div>
    </section>
  );
}

function CategoryChip({ active, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 font-body text-xs transition-colors sm:text-sm ${
        active
          ? "border-emerald-900 bg-emerald-900 text-gold-200"
          : "border-emerald-900/15 bg-transparent text-emerald-900/70 hover:border-emerald-900/40"
      }`}
    >
      {label}
    </button>
  );
}
