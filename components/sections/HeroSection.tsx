"use client";

import { JSX, useRef } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import { FiGlobe } from "react-icons/fi";
import ReactCountryFlag from "react-country-flag";
import { useTheme } from "next-themes";
import { contacts } from "@/lib/data";

export default function HeroSection(): JSX.Element {
  const t = useTranslations("hero");
  const locale = useLocale();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const orbY1 = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const markets: string[] = ["Africa", "Asia", "Europe"];

  const stats = [
    { value: "3+", label: locale === "fr" ? "Continents" : "Continents" },
    { value: "8+", label: locale === "fr" ? "Secteurs" : "Sectors" },
    {
      value: <ReactCountryFlag countryCode="CN" svg style={{ fontSize: "1.65em" }} />,
      label: locale === "fr" ? "Réseau Chine" : "China Network",
    },
  ];

  return (
    <section
      ref={containerRef}
      className={`relative min-h-screen flex items-center overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-neutral-950" : "bg-white"
      }`}
    >
      {/* BACKGROUND PARALLAX */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isDark ? "opacity-[0.07]" : "opacity-[0.04]"
          }`}
          style={{
            backgroundImage: `
              linear-gradient(rgba(224,32,32,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(224,32,32,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full blur-[140px] transition-opacity duration-500 ${
            isDark ? "bg-[#E02020] opacity-10" : "bg-[#E02020] opacity-[0.07]"
          }`}
        />

        <div
          className={`absolute bottom-0 right-0 w-[600px] h-[500px] rounded-full blur-[120px] transition-opacity duration-500 ${
            isDark ? "bg-[#1A3A8F] opacity-15" : "bg-[#1A3A8F] opacity-[0.08]"
          }`}
        />

        {!isDark && (
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
              backgroundSize: "128px 128px",
            }}
          />
        )}
      </motion.div>

      {/* ORB 1 */}
      <motion.div
        style={{ y: orbY1 }}
        className="absolute top-20 right-[8%] w-64 h-64 z-0 pointer-events-none"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className={`w-full h-full rounded-full border transition-colors duration-500 ${
            isDark ? "border-[#E02020]/20" : "border-[#E02020]/15"
          }`}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className={`absolute inset-4 rounded-full border transition-colors duration-500 ${
            isDark ? "border-[#1A3A8F]/30" : "border-[#1A3A8F]/20"
          }`}
        />
        <div
          className={`absolute inset-8 rounded-full blur-sm transition-opacity duration-500 ${
            isDark
              ? "bg-gradient-to-br from-[#E02020]/10 to-[#1A3A8F]/10"
              : "bg-gradient-to-br from-[#E02020]/05 to-[#1A3A8F]/05"
          }`}
        />
      </motion.div>

      {/* ORB 2 */}
      <motion.div
        style={{ y: orbY2 }}
        className="absolute bottom-32 left-[5%] w-40 h-40 z-0 pointer-events-none"
      >
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className={`w-full h-full rounded-full blur-xl transition-opacity duration-500 ${
            isDark
              ? "bg-gradient-to-br from-[#1A3A8F]/20 to-[#E02020]/10"
              : "bg-gradient-to-br from-[#1A3A8F]/10 to-[#E02020]/05"
          }`}
        />
      </motion.div>

      {/* CONTENU PRINCIPAL */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full"
      >
        <div className="max-w-4xl">
          {/* Badge */}
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E02020]/40 bg-[#E02020]/10 text-[#E02020] text-sm font-medium mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#E02020] animate-pulse" />
            {t("badge")}
          </motion.div> */}

          {/* Titre */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6 transition-colors duration-500 ${
              isDark ? "text-white" : "text-neutral-900"
            }`}
          >
            {locale === "fr" ? (
              <>
                Connecter le{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E02020] to-[#ff6b6b]">
                  Monde
                </span>{" "}
                aux Marchés{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A3A8F] to-[#4a7fff]">
                  Émergents
                </span>
              </>
            ) : (
              <>
                Connecting the{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E02020] to-[#ff6b6b]">
                  World
                </span>{" "}
                to Emerging{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A3A8F] to-[#4a7fff]">
                  Markets
                </span>
              </>
            )}
          </motion.h1>

          {/* Sous-titre */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className={`text-lg sm:text-xl max-w-2xl mb-8 leading-relaxed transition-colors duration-500 ${
              isDark ? "text-neutral-400" : "text-neutral-500"
            }`}
          >
            {t("subtitle")}
          </motion.p>

          {/* Marchés */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-3 mb-10"
          >
            <FiGlobe
              className={`transition-colors duration-500 ${
                isDark ? "text-neutral-500" : "text-neutral-400"
              }`}
              size={16}
            />
            {markets.map((market, i) => (
              <span key={market} className="flex items-center gap-3">
                <span
                  className={`text-sm font-medium transition-colors duration-200 cursor-default hover:text-[#E02020] ${
                    isDark ? "text-neutral-400" : "text-neutral-500"
                  }`}
                >
                  {market}
                </span>
                {i < markets.length - 1 && (
                  <span
                    className={`w-1 h-1 rounded-full ${
                      isDark ? "bg-neutral-600" : "bg-neutral-300"
                    }`}
                  />
                )}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href={`/${locale}/services`}
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#E02020] hover:bg-[#c41a1a] text-white font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(224,32,32,0.4)] hover:scale-105"
            >
              {t("cta_primary")}
              <HiArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            {/* Bouton WhatsApp - CORRIGÉ */}
            <a
              href={`https://wa.me/${contacts.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`group inline-flex items-center gap-2 px-7 py-3.5 font-semibold rounded-full transition-all duration-300 hover:scale-105 border ${
                isDark
                  ? "bg-white/5 hover:bg-[#25D366]/10 border-white/10 hover:border-[#25D366]/50 text-white"
                  : "bg-neutral-100 hover:bg-[#25D366]/10 border-neutral-200 hover:border-[#25D366]/50 text-neutral-800"
              }`}
            >
              <FaWhatsapp
                size={20}
                className="text-[#25D366] transition-transform duration-300 group-hover:scale-110"
              />
              {t("cta_whatsapp")}
            </a>
          </motion.div>
        </div>

        {/* Stats flottantes */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + i * 0.1 }}
              className={`flex flex-col items-center p-4 rounded-2xl backdrop-blur-sm min-w-[90px] border transition-colors duration-500 ${
                isDark
                  ? "bg-white/5 border-white/10"
                  : "bg-white/80 border-neutral-200 shadow-sm"
              }`}
            >
              <span
                className={`text-2xl font-black transition-colors duration-500 ${
                  isDark ? "text-white" : "text-neutral-900"
                }`}
              >
                {stat.value}
              </span>
              <span
                className={`text-xs text-center mt-1 transition-colors duration-500 ${
                  isDark ? "text-neutral-500" : "text-neutral-400"
                }`}
              >
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span
          className={`text-xs uppercase tracking-widest transition-colors duration-500 ${
            isDark ? "text-neutral-600" : "text-neutral-400"
          }`}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className={`w-5 h-8 rounded-full border flex items-start justify-center pt-1.5 transition-colors duration-500 ${
            isDark ? "border-neutral-700" : "border-neutral-300"
          }`}
        >
          <div className="w-1 h-2 rounded-full bg-[#E02020]" />
        </motion.div>
      </motion.div>

      {/* Ligne du bas */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent to-transparent transition-opacity duration-500 ${
          isDark ? "via-[#E02020]/30" : "via-[#E02020]/20"
        }`}
      />
    </section>
  );
}