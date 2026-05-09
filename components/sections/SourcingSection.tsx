"use client";

import { useRef, type ReactNode } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useTheme } from "next-themes";
import ReactCountryFlag from "react-country-flag";
import { FaWhatsapp } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import { contacts } from "@/lib/data";

const FadeIn = ({
  children,
  delay = 0,
  direction = "up",
}: {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
}) => {
  const ref = useRef<HTMLDivElement>(null);
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

const stepKeys = [
  "suppliers",
  "production",
  "quality",
  "shipping",
  "custom",
  "network",
] as const;

const stepEmojis = ["🔍", "🏭", "✅", "🚢", "🎨", "🌐"];
const stepColors = [
  "#E02020",
  "#1A3A8F",
  "#E02020",
  "#1A3A8F",
  "#E02020",
  "#1A3A8F",
];

const cities = ["Guangzhou", "Shenzhen", "Yiwu"];

export default function SourcingSection() {
  const t = useTranslations("sourcing");
  const locale = useLocale();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={sectionRef}
      className={`relative py-28 overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-neutral-900" : "bg-neutral-50"
      }`}
    >
      {/* Fond Parallax */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isDark ? "opacity-[0.04]" : "opacity-[0.025]"
          }`}
          style={{
            backgroundImage: `
              linear-gradient(rgba(26,58,143,0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(26,58,143,0.8) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
        <div
          className={`absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full border-2 transition-colors duration-500 ${
            isDark ? "border-[#1A3A8F]/10" : "border-[#1A3A8F]/06"
          }`}
        />
        <div
          className={`absolute -bottom-16 -left-16 w-[400px] h-[400px] rounded-full border transition-colors duration-500 ${
            isDark ? "border-[#E02020]/08" : "border-[#E02020]/05"
          }`}
        />
      </motion.div>

      {/* Glow Parallax */}
      <motion.div
        style={{ y: glowY }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div
          className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[130px] transition-opacity duration-500 ${
            isDark ? "bg-[#1A3A8F] opacity-10" : "bg-[#1A3A8F] opacity-[0.05]"
          }`}
        />
        <div
          className={`absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full blur-[100px] transition-opacity duration-500 ${
            isDark
              ? "bg-[#E02020] opacity-[0.06]"
              : "bg-[#E02020] opacity-[0.03]"
          }`}
        />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Texte */}
          <div>
            <FadeIn delay={0}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-[#1A3A8F]" />
                <a
                  href="https://findallsourcing.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(26,58,143,0.3)] ${
                    isDark
                      ? "border-[#1A3A8F]/50 text-[#4a7fff] bg-[#1A3A8F]/10 hover:bg-[#1A3A8F]/20 hover:border-[#4a7fff]"
                      : "border-[#1A3A8F]/30 text-[#1A3A8F] bg-[#1A3A8F]/08 hover:bg-[#1A3A8F]/15 hover:border-[#1A3A8F]"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1A3A8F] animate-pulse" />
                  {locale === "fr"
                    ? "Branche Spécialisée"
                    : "Specialized Branch"}
                  <HiArrowRight
                    size={13}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2
                className={`text-4xl sm:text-5xl font-black leading-tight mb-2 transition-colors duration-500 ${
                  isDark ? "text-white" : "text-neutral-900"
                }`}
              >
                FINDALL
              </h2>
              <h2 className="text-4xl sm:text-5xl font-black leading-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#1A3A8F] to-[#4a7fff]">
                SOURCING
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p
                className={`text-base sm:text-lg leading-relaxed mb-6 transition-colors duration-500 ${
                  isDark ? "text-neutral-400" : "text-neutral-500"
                }`}
              >
                {t("description")}
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-wrap gap-2 mb-8">
                <ReactCountryFlag
                  countryCode="CN"
                  svg
                  style={{ fontSize: "1.4em" }}
                  className="mt-0.5"
                />
                {cities.map((city, i) => (
                  <span key={city} className="flex items-center gap-2">
                    <span
                      className={`text-sm font-semibold transition-colors duration-500 ${
                        isDark ? "text-neutral-300" : "text-neutral-600"
                      }`}
                    >
                      {city}
                    </span>
                    {i < cities.length - 1 && (
                      <span
                        className={`text-xs transition-colors duration-500 ${
                          isDark ? "text-neutral-600" : "text-neutral-300"
                        }`}
                      >
                        ·
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <a
                href={`https://wa.me/${contacts.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-[#1A3A8F] hover:bg-[#142d70] text-white font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_25px_rgba(26,58,143,0.4)] hover:scale-105"
              >
                <FaWhatsapp size={18} className="text-[#25D366]" />
                {locale === "fr" ? "Démarrer un sourcing" : "Start sourcing"}
                <HiArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </FadeIn>

            {/* ── SERVICES ADDITIONNELS ── */}
            <FadeIn delay={0.5}>
              <div className="flex flex-col gap-4 mt-8">
                {/* Visa & Admission */}
                <div
                  className={`rounded-2xl p-5 border transition-colors duration-500 ${
                    isDark
                      ? "bg-neutral-800/60 border-neutral-700"
                      : "bg-white border-neutral-200 shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#E0202015", color: "#E02020" }}
                    >
                      <span className="text-base">🛂</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-[#E02020]">
                        02
                      </p>
                      <h4
                        className={`text-sm font-bold leading-tight transition-colors duration-500 ${
                          isDark ? "text-white" : "text-neutral-900"
                        }`}
                      >
                        {locale === "fr"
                          ? "Visa & Admission Universitaire"
                          : "Visa Application & Study Admission"}
                      </h4>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      {
                        icon: "💼",
                        label:
                          locale === "fr"
                            ? "Visa Business / M"
                            : "Business / M Visa",
                      },
                      {
                        icon: "⚙️",
                        label:
                          locale === "fr"
                            ? "Visa Travail / Z"
                            : "Work / Z Visa",
                      },
                      {
                        icon: "🎓",
                        label:
                          locale === "fr"
                            ? "Visa Étudiant / X"
                            : "Student / X Visa",
                      },
                      {
                        icon: "🏫",
                        label:
                          locale === "fr"
                            ? "Admission Scolaire"
                            : "School Admission",
                      },
                      {
                        icon: "🏆",
                        label:
                          locale === "fr" ? "Bourse d'études" : "Scholarship",
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-colors duration-300 ${
                          isDark
                            ? "bg-neutral-900/80 text-neutral-300"
                            : "bg-neutral-50 text-neutral-600"
                        }`}
                      >
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quality Control */}
                <div
                  className={`rounded-2xl p-5 border transition-colors duration-500 ${
                    isDark
                      ? "bg-neutral-800/60 border-neutral-700"
                      : "bg-white border-neutral-200 shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#1A3A8F15", color: "#1A3A8F" }}
                    >
                      <span className="text-base">✅</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-[#1A3A8F]">
                        03
                      </p>
                      <h4
                        className={`text-sm font-bold leading-tight transition-colors duration-500 ${
                          isDark ? "text-white" : "text-neutral-900"
                        }`}
                      >
                        {locale === "fr"
                          ? "Contrôle Qualité & Inspection"
                          : "Quality Control & Inspection"}
                      </h4>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      {
                        icon: "🔍",
                        label:
                          locale === "fr"
                            ? "Inspection Produits"
                            : "Product Inspections",
                      },
                      {
                        icon: "🏭",
                        label:
                          locale === "fr" ? "Audit Usine" : "Factory Audits",
                      },
                      {
                        icon: "📋",
                        label:
                          locale === "fr"
                            ? "Vérification Qualité"
                            : "Quality Verification",
                      },
                      {
                        icon: "📦",
                        label:
                          locale === "fr"
                            ? "Contrôle Emballage"
                            : "Packaging Checks",
                      },
                      {
                        icon: "🚢",
                        label:
                          locale === "fr"
                            ? "Inspection Pré-expéd."
                            : "Pre-shipment Inspect.",
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-colors duration-300 ${
                          isDark
                            ? "bg-neutral-900/80 text-neutral-300"
                            : "bg-neutral-50 text-neutral-600"
                        }`}
                      >
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Card Tagline */}
          <FadeIn delay={0.2} direction="right">
            <div
              className={`relative rounded-3xl p-8 border overflow-hidden transition-colors duration-500 ${
                isDark
                  ? "bg-neutral-800 border-neutral-700"
                  : "bg-white border-neutral-200 shadow-xl"
              }`}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1A3A8F] via-[#4a7fff] to-[#E02020]" />

              <div className="text-5xl mb-4 opacity-20 font-serif">&quot;</div>
              <p
                className={`text-2xl font-black italic mb-6 leading-snug transition-colors duration-500 ${
                  isDark ? "text-white" : "text-neutral-900"
                }`}
              >
                0{t("tagline")}
              </p>

              <p
                className={`text-sm leading-relaxed mb-8 transition-colors duration-500 ${
                  isDark ? "text-neutral-400" : "text-neutral-500"
                }`}
              >
                {t("subtitle")}
              </p>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-dashed transition-colors duration-500 border-neutral-200 dark:border-neutral-700">
                {[
                  {
                    value: "6",
                    label:
                      locale === "fr" ? "Étapes Sourcing" : "Sourcing Steps",
                  },
                  {
                    value: "3+",
                    label: locale === "fr" ? "Services CN" : "CN Services",
                  },
                  {
                    value: "100%",
                    label: locale === "fr" ? "Dédié" : "Dedicated",
                  },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-xl font-black text-[#1A3A8F]">
                      {s.value}
                    </p>
                    <p
                      className={`text-xs mt-1 transition-colors duration-500 ${
                        isDark ? "text-neutral-500" : "text-neutral-400"
                      }`}
                    >
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-[#1A3A8F]/10 to-[#E02020]/10 blur-2xl" />
            </div>
          </FadeIn>
        </div>

        {/* Timeline Title */}
        <FadeIn delay={0}>
          <div className="text-center mb-12">
            <h3
              className={`text-2xl sm:text-3xl font-black mb-3 transition-colors duration-500 ${
                isDark ? "text-white" : "text-neutral-900"
              }`}
            >
              {locale === "fr" ? "Notre Processus" : "Our Process"}
            </h3>
            <p
              className={`text-sm transition-colors duration-500 ${
                isDark ? "text-neutral-500" : "text-neutral-400"
              }`}
            >
              {locale === "fr"
                ? "6 étapes pour un sourcing réussi"
                : "6 steps to successful sourcing"}
            </p>
          </div>
        </FadeIn>

        {/* Timeline Desktop */}
        <div className="hidden lg:block relative">
          <div className="absolute top-10 left-0 right-0 flex items-center px-8">
            <TimelineLine isDark={isDark} stepCount={stepKeys.length} />
          </div>

          <div className="grid grid-cols-6 gap-4">
            {stepKeys.map((key, i) => (
              <TimelineStepDesktop
                key={key}
                index={i}
                emoji={stepEmojis[i]}
                color={stepColors[i]}
                title={t(`steps.${key}.title`)}
                desc={t(`steps.${key}.desc`)}
                isDark={isDark}
                isEven={i % 2 === 0}
              />
            ))}
          </div>
        </div>

        {/* Timeline Mobile */}
        <div className="lg:hidden relative pl-8">
          <div
            className={`absolute left-4 top-0 bottom-0 w-px transition-colors duration-500 ${
              isDark ? "bg-neutral-800" : "bg-neutral-200"
            }`}
          />
          <div className="flex flex-col gap-8">
            {stepKeys.map((key, i) => (
              <TimelineStepMobile
                key={key}
                index={i}
                emoji={stepEmojis[i]}
                color={stepColors[i]}
                title={t(`steps.${key}.title`)}
                desc={t(`steps.${key}.desc`)}
                isDark={isDark}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==================== Sous-composants ==================== */

function TimelineLine({
  isDark,
  stepCount,
}: {
  isDark: boolean;
  stepCount: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="w-full relative h-px">
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          isDark ? "bg-neutral-800" : "bg-neutral-200"
        }`}
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
        style={{ originX: 0 }}
        className="absolute inset-0 bg-gradient-to-r from-[#E02020] via-[#1A3A8F] to-[#E02020]"
      />
    </div>
  );
}

function TimelineStepDesktop({
  index,
  emoji,
  color,
  title,
  desc,
  isDark,
  isEven,
}: {
  index: number;
  emoji: string;
  color: string;
  title: string;
  desc: string;
  isDark: boolean;
  isEven: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: isEven ? 30 : -30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={`flex flex-col ${isEven ? "pt-20" : "pb-20 justify-end"}`}
    >
      <div
        className={`flex justify-center ${isEven ? "mb-4 order-first" : "mt-4 order-last"}`}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
          className="w-5 h-5 rounded-full border-2 border-white dark:border-neutral-900 shadow-lg flex items-center justify-center"
          style={{ backgroundColor: color }}
        >
          <div className="w-2 h-2 rounded-full bg-white" />
        </motion.div>
      </div>

      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className={`rounded-2xl p-4 border transition-all duration-300 cursor-default ${
          isDark
            ? "bg-neutral-900 border-neutral-800 hover:border-neutral-600"
            : "bg-white border-neutral-200 hover:border-neutral-300 hover:shadow-lg"
        }`}
      >
        <div
          className="text-2xl mb-3 w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}15` }}
        >
          {emoji}
        </div>
        <div
          className="text-xs font-black mb-0.5 uppercase tracking-wider"
          style={{ color }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
        <h4
          className={`text-sm font-bold mb-2 leading-tight transition-colors duration-500 ${
            isDark ? "text-white" : "text-neutral-900"
          }`}
        >
          {title}
        </h4>
        <p
          className={`text-xs leading-relaxed transition-colors duration-500 ${
            isDark ? "text-neutral-500" : "text-neutral-500"
          }`}
        >
          {desc}
        </p>
      </motion.div>
    </motion.div>
  );
}

function TimelineStepMobile({
  index,
  emoji,
  color,
  title,
  desc,
  isDark,
}: {
  index: number;
  emoji: string;
  color: string;
  title: string;
  desc: string;
  isDark: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative"
    >
      <div
        className="absolute -left-[26px] top-3 w-4 h-4 rounded-full border-2 border-white dark:border-neutral-900 shadow-md"
        style={{ backgroundColor: color }}
      />

      <div
        className={`rounded-2xl p-5 border transition-colors duration-500 ${
          isDark
            ? "bg-neutral-900 border-neutral-800"
            : "bg-white border-neutral-200 shadow-sm"
        }`}
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xl">{emoji}</span>
          <span
            className="text-xs font-black uppercase tracking-wider"
            style={{ color }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <h4
            className={`text-sm font-bold transition-colors duration-500 ${
              isDark ? "text-white" : "text-neutral-900"
            }`}
          >
            {title}
          </h4>
        </div>
        <p
          className={`text-xs leading-relaxed transition-colors duration-500 ${
            isDark ? "text-neutral-500" : "text-neutral-500"
          }`}
        >
          {desc}
        </p>
      </div>
    </motion.div>
  );
}
