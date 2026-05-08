"use client";

import { useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useTheme } from "next-themes";
import { FiGlobe, FiCalendar, FiTrendingUp } from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import ReactCountryFlag from "react-country-flag";

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
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : 0,
      x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default function AboutSection() {
  const t = useTranslations("about");
  const locale = useLocale();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallaxe subtil sur le décor de fond
  const decorY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const decorX = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const pillars = [
    {
      icon: <FiGlobe size={22} />,
      label: locale === "fr" ? "Commerce International" : "International Trade",
      color: "#E02020",
    },
    {
      icon: <FiTrendingUp size={22} />,
      label: locale === "fr" ? "Logistique Globale" : "Global Logistics",
      color: "#1A3A8F",
    },
    {
      icon: <HiOutlineOfficeBuilding size={22} />,
      label: locale === "fr" ? "Solutions Multi-secteurs" : "Multi-sector Solutions",
      color: "#E02020",
    },
    {
      icon: <FiCalendar size={22} />,
      label: t("founded"),
      color: "#1A3A8F",
    },
  ];

  const markets = [
    { code: "CM", name: locale === "fr" ? "Afrique" : "Africa" },
    { code: "CN", name: locale === "fr" ? "Asie" : "Asia" },
    { code: "FR", name: locale === "fr" ? "Europe" : "Europe" },
  ];

  return (
    <section
      ref={sectionRef}
      className={`relative py-28 overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-neutral-900" : "bg-neutral-50"
      }`}
    >
      {/* ── DÉCOR PARALLAXE FOND ── */}
      <motion.div
        style={{ y: decorY, x: decorX }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        {/* Grand cercle décoratif */}
        <div
          className={`absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full border-2 transition-colors duration-500 ${
            isDark ? "border-[#E02020]/8" : "border-[#E02020]/6"
          }`}
        />
        <div
          className={`absolute -top-16 -right-16 w-[400px] h-[400px] rounded-full border transition-colors duration-500 ${
            isDark ? "border-[#1A3A8F]/10" : "border-[#1A3A8F]/8"
          }`}
        />
        {/* Glow gauche */}
        <div
          className={`absolute bottom-0 -left-40 w-[500px] h-[400px] rounded-full blur-[100px] transition-opacity duration-500 ${
            isDark ? "bg-[#1A3A8F] opacity-10" : "bg-[#1A3A8F] opacity-[0.05]"
          }`}
        />
        {/* Points décoratifs */}
        <div className="absolute top-20 left-[15%] grid grid-cols-4 gap-3">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className={`w-1 h-1 rounded-full transition-colors duration-500 ${
                isDark ? "bg-neutral-700" : "bg-neutral-300"
              }`}
            />
          ))}
        </div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── COLONNE GAUCHE — Texte ── */}
          <div>
            {/* Tag section */}
            <FadeIn delay={0}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-[#E02020]" />
                <span
                  className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${
                    isDark ? "text-neutral-500" : "text-neutral-400"
                  }`}
                >
                  {locale === "fr" ? "À Propos" : "About Us"}
                </span>
              </div>
            </FadeIn>

            {/* Titre */}
            <FadeIn delay={0.1}>
              <h2
                className={`text-4xl sm:text-5xl font-black leading-tight mb-6 transition-colors duration-500 ${
                  isDark ? "text-white" : "text-neutral-900"
                }`}
              >
                {t("title")}
                <span className="block w-12 h-1.5 bg-gradient-to-r from-[#E02020] to-[#1A3A8F] rounded-full mt-4" />
              </h2>
            </FadeIn>

            {/* Description */}
            <FadeIn delay={0.2}>
              <p
                className={`text-base sm:text-lg leading-relaxed mb-8 transition-colors duration-500 ${
                  isDark ? "text-neutral-400" : "text-neutral-500"
                }`}
              >
                {t("description")}
              </p>
            </FadeIn>

            {/* Marchés avec drapeaux */}
            <FadeIn delay={0.3}>
              <div
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl border w-fit mb-8 transition-colors duration-500 ${
                  isDark
                    ? "bg-white/5 border-white/10"
                    : "bg-white border-neutral-200 shadow-sm"
                }`}
              >
                {markets.map((market, i) => (
                  <span key={market.code} className="flex items-center gap-2">
                    <ReactCountryFlag
                      countryCode={market.code}
                      svg
                      style={{ fontSize: "1.3em" }}
                    />
                    <span
                      className={`text-sm font-medium transition-colors duration-500 ${
                        isDark ? "text-neutral-300" : "text-neutral-600"
                      }`}
                    >
                      {market.name}
                    </span>
                    {i < markets.length - 1 && (
                      <span
                        className={`w-px h-4 mx-1 transition-colors duration-500 ${
                          isDark ? "bg-neutral-700" : "bg-neutral-200"
                        }`}
                      />
                    )}
                  </span>
                ))}
              </div>
            </FadeIn>

            {/* Pilliers */}
            <div className="grid grid-cols-2 gap-3">
              {pillars.map((p, i) => (
                <FadeIn key={p.label} delay={0.35 + i * 0.08}>
                  <div
                    className={`flex items-center gap-3 p-4 rounded-2xl border transition-all duration-300 group cursor-default ${
                      isDark
                        ? "bg-white/5 border-white/8 hover:border-white/15"
                        : "bg-white border-neutral-200 hover:border-neutral-300 shadow-sm hover:shadow-md"
                    }`}
                  >
                    <div
                      className="p-2 rounded-xl transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${p.color}15`,
                        color: p.color,
                      }}
                    >
                      {p.icon}
                    </div>
                    <span
                      className={`text-xs font-semibold leading-tight transition-colors duration-500 ${
                        isDark ? "text-neutral-300" : "text-neutral-700"
                      }`}
                    >
                      {p.label}
                    </span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* ── COLONNE DROITE — Visuel ── */}
          <FadeIn delay={0.2} direction="right">
            <div className="relative">

              {/* Carte principale */}
              <div
                className={`relative rounded-3xl p-8 border overflow-hidden transition-colors duration-500 ${
                  isDark
                    ? "bg-neutral-800 border-neutral-700"
                    : "bg-white border-neutral-200 shadow-xl"
                }`}
              >
                {/* Accent top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E02020] via-[#E02020]/50 to-[#1A3A8F]" />

                {/* Nom société */}
                <div className="mb-8">
                  <p
                    className={`text-xs font-bold uppercase tracking-[0.2em] mb-2 transition-colors duration-500 ${
                      isDark ? "text-neutral-500" : "text-neutral-400"
                    }`}
                  >
                    {locale === "fr" ? "Société" : "Company"}
                  </p>
                  <h3
                    className={`text-xl font-black leading-tight transition-colors duration-500 ${
                      isDark ? "text-white" : "text-neutral-900"
                    }`}
                  >
                    FINDALL INTERNATIONAL
                    <span className="block text-[#E02020]">TRADING GROUPE SARL</span>
                  </h3>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { value: "2026", label: locale === "fr" ? "Fondée" : "Founded" },
                    { value: "8+", label: locale === "fr" ? "Secteurs" : "Sectors" },
                    { value: "3", label: locale === "fr" ? "Continents" : "Continents" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-2xl font-black text-[#E02020]">{stat.value}</p>
                      <p
                        className={`text-xs mt-1 transition-colors duration-500 ${
                          isDark ? "text-neutral-500" : "text-neutral-400"
                        }`}
                      >
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Séparateur */}
                <div
                  className={`h-px mb-6 transition-colors duration-500 ${
                    isDark ? "bg-neutral-700" : "bg-neutral-100"
                  }`}
                />

                {/* Tagline */}
                <div className="flex items-start gap-3">
                  <div className="w-1 h-12 bg-gradient-to-b from-[#E02020] to-[#1A3A8F] rounded-full flex-shrink-0 mt-1" />
                  <p
                    className={`text-sm leading-relaxed italic transition-colors duration-500 ${
                      isDark ? "text-neutral-400" : "text-neutral-500"
                    }`}
                  >
                    {locale === "fr"
                      ? "Nous connectons les fournisseurs mondiaux aux marchés émergents avec expertise et engagement."
                      : "We connect global suppliers to emerging markets with expertise and commitment."}
                  </p>
                </div>

                {/* Décor interne */}
                <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br from-[#E02020]/10 to-[#1A3A8F]/10 blur-2xl" />
              </div>

              {/* Badge flottant */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute -top-5 -left-5 px-4 py-2.5 rounded-2xl border text-xs font-bold shadow-lg transition-colors duration-500 ${
                  isDark
                    ? "bg-neutral-800 border-neutral-700 text-white"
                    : "bg-white border-neutral-200 text-neutral-800"
                }`}
              >
                🌍 {locale === "fr" ? "Présence Mondiale" : "Global Presence"}
              </motion.div>

              {/* Badge flottant bas */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-5 -right-5 px-4 py-2.5 rounded-2xl border text-xs font-bold shadow-lg bg-[#E02020] border-[#E02020] text-white"
              >
                💎 When you want it, we find it!
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}