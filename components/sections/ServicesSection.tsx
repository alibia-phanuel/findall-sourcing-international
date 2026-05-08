"use client";

import { useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useTheme } from "next-themes";
import { FaShip, FaIndustry, FaWarehouse, FaRecycle } from "react-icons/fa";
import {
  HiOutlineGlobeAlt,
  HiOutlineTruck,
  HiOutlineShieldCheck,
  HiOutlineOfficeBuilding,
} from "react-icons/hi";

const FadeIn = ({
  children,
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: direction === "up" ? 40 : 0,
        x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
      }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
};

const serviceIcons: Record<string, React.ReactNode> = {
  trading: <HiOutlineGlobeAlt size={28} />,
  import_export: <FaShip size={26} />,
  logistics: <HiOutlineTruck size={28} />,
  services: <HiOutlineOfficeBuilding size={28} />,
  insurance: <HiOutlineShieldCheck size={28} />,
  mining: <FaIndustry size={26} />,
  construction: <FaWarehouse size={26} />,
  waste: <FaRecycle size={26} />,
};

const serviceColors = [
  { bg: "#E02020", accent: "#ff6b6b" },
  { bg: "#1A3A8F", accent: "#4a7fff" },
  { bg: "#E02020", accent: "#ff6b6b" },
  { bg: "#1A3A8F", accent: "#4a7fff" },
  { bg: "#1A3A8F", accent: "#4a7fff" },
  { bg: "#E02020", accent: "#ff6b6b" },
  { bg: "#1A3A8F", accent: "#4a7fff" },
  { bg: "#E02020", accent: "#ff6b6b" },
];

const serviceKeys = [
  "trading",
  "import_export",
  "logistics",
  "services",
  "insurance",
  "mining",
  "construction",
  "waste",
] as const;

export default function ServicesSection() {
  const t = useTranslations("services");
  const locale = useLocale();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const decorY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section
      ref={sectionRef}
      className={`relative py-28 overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-neutral-950" : "bg-white"
      }`}
    >
      {/* ── DÉCOR PARALLAXE ── */}
      <motion.div
        style={{ y: decorY }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div
          className={`absolute top-1/2 -translate-y-1/2 -left-48 w-[500px] h-[500px] rounded-full blur-[120px] transition-opacity duration-500 ${
            isDark
              ? "bg-[#E02020] opacity-[0.06]"
              : "bg-[#E02020] opacity-[0.04]"
          }`}
        />
        <div
          className={`absolute top-1/4 -right-48 w-[400px] h-[400px] rounded-full blur-[100px] transition-opacity duration-500 ${
            isDark
              ? "bg-[#1A3A8F] opacity-[0.08]"
              : "bg-[#1A3A8F] opacity-[0.04]"
          }`}
        />
        {/* Grille de points */}
        <div className="absolute bottom-16 right-[10%] grid grid-cols-5 gap-4">
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className={`w-1 h-1 rounded-full transition-colors duration-500 ${
                isDark ? "bg-neutral-800" : "bg-neutral-200"
              }`}
            />
          ))}
        </div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── HEADER ── */}
        <div className="text-center mb-16">
          <FadeIn delay={0}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#E02020]" />
              <span
                className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${
                  isDark ? "text-neutral-500" : "text-neutral-400"
                }`}
              >
                {locale === "fr" ? "Ce que nous faisons" : "What we do"}
              </span>
              <div className="w-8 h-px bg-[#E02020]" />
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2
              className={`text-4xl sm:text-5xl font-black mb-4 transition-colors duration-500 ${
                isDark ? "text-white" : "text-neutral-900"
              }`}
            >
              {t("title")}
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p
              className={`text-lg max-w-2xl mx-auto transition-colors duration-500 ${
                isDark ? "text-neutral-400" : "text-neutral-500"
              }`}
            >
              {t("subtitle")}
            </p>
          </FadeIn>
        </div>

        {/* ── GRILLE SERVICES ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {serviceKeys.map((key, i) => {
            const color = serviceColors[i];
            return (
              <FadeIn key={key} delay={0.1 + i * 0.07}>
                <motion.div
                  whileHover={{
                    y: -6,
                    rotateY: 3,
                    rotateX: -2,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{ transformPerspective: 800 }}
                  className={`group relative p-6 rounded-3xl border h-full flex flex-col cursor-default overflow-hidden transition-all duration-300 ${
                    isDark
                      ? "bg-neutral-900 border-neutral-800 hover:border-neutral-600"
                      : "bg-neutral-50 border-neutral-200 hover:border-neutral-300 hover:shadow-xl"
                  }`}
                >
                  {/* Glow hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${color.bg}10, transparent 70%)`,
                    }}
                  />

                  {/* Accent barre top */}
                  <div
                    className="absolute top-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(90deg, ${color.bg}, ${color.accent})`,
                    }}
                  />

                  {/* Numéro */}
                  <span
                    className={`absolute top-4 right-5 text-5xl font-black leading-none select-none transition-colors duration-500 ${
                      isDark ? "text-neutral-800" : "text-neutral-100"
                    } group-hover:opacity-0`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Icône */}
                  <div
                    className="relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${color.bg}15`,
                      color: color.bg,
                    }}
                  >
                    {serviceIcons[key]}
                  </div>

                  {/* Titre */}
                  <h3
                    className={`relative z-10 text-base font-bold mb-3 transition-colors duration-300 ${
                      isDark
                        ? "text-white group-hover:text-white"
                        : "text-neutral-900"
                    }`}
                  >
                    {t(`items.${key}.title`)}
                  </h3>

                  {/* Description */}
                  <p
                    className={`relative z-10 text-sm leading-relaxed flex-1 transition-colors duration-500 ${
                      isDark ? "text-neutral-500" : "text-neutral-500"
                    }`}
                  >
                    {t(`items.${key}.desc`)}
                  </p>

                  {/* Flèche hover */}
                  <div
                    className="relative z-10 mt-5 flex items-center gap-1.5 text-xs font-bold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                    style={{ color: color.bg }}
                  >
                    <span>
                      {locale === "fr" ? "En savoir plus" : "Learn more"}
                    </span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>

        {/* ── BANDEAU BAS ── */}
        <FadeIn delay={0.3}>
          <div
            className={`mt-16 p-8 rounded-3xl border flex flex-col sm:flex-row items-center justify-between gap-6 transition-colors duration-500 ${
              isDark
                ? "bg-neutral-900 border-neutral-800"
                : "bg-neutral-50 border-neutral-200"
            }`}
          >
            <div>
              <h4
                className={`text-xl font-black mb-1 transition-colors duration-500 ${
                  isDark ? "text-white" : "text-neutral-900"
                }`}
              >
                {locale === "fr"
                  ? "Un besoin spécifique ?"
                  : "A specific need?"}
              </h4>
              <p
                className={`text-sm transition-colors duration-500 ${
                  isDark ? "text-neutral-400" : "text-neutral-500"
                }`}
              >
                {locale === "fr"
                  ? "Contactez-nous pour une solution sur mesure."
                  : "Contact us for a tailor-made solution."}
              </p>
            </div>
            <a
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#E02020] hover:bg-[#c41a1a] text-white font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_25px_rgba(224,32,32,0.35)] hover:scale-105 whitespace-nowrap"
            >
              {locale === "fr" ? "Nous contacter" : "Contact us"}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
