/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "next-themes";
import ReactCountryFlag from "react-country-flag";

const navLinks = ["home", "about", "services", "sourcing", "contact"] as const;

const navHrefs: Record<string, string> = {
  home: "/",
  about: "/about",
  services: "/services",
  sourcing: "/sourcing",
  contact: "/contact",
};

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDark = theme === "dark";

  const switchLocale = () => {
    const next = locale === "fr" ? "en" : "fr";
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/"));
  };

  const isActive = (key: string) => {
    const href = `/${locale}${navHrefs[key] === "/" ? "" : navHrefs[key]}`;
    return pathname === href;
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? isDark
            ? "bg-neutral-950/90 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.06)]"
            : "bg-white/95 backdrop-blur-md shadow-[0_1px_20px_rgba(0,0,0,0.08)]"
          : isDark
            ? "bg-neutral-950/60 backdrop-blur-sm"
            : "bg-white/80 backdrop-blur-sm border-b border-neutral-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* LOGO */}
          <Link href={`/${locale}`} className="flex items-center gap-3 group">
            {mounted && (
              <Image
                src={
                  isDark
                    ? "/images/logo-dark.png.jpg"
                    : "/images/logo-light.png.jpg"
                }
                alt="FINDALL Logo"
                width={48}
                height={48}
                className="rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
            )}
            <div className="leading-tight">
              <p className="font-bold text-sm text-[#E02020]">FINDALL</p>
              <p
                className={`text-[10px] font-medium uppercase tracking-widest transition-colors duration-300 ${
                  isDark ? "text-neutral-400" : "text-neutral-400"
                }`}
              >
                International Trading Groupe SARL
              </p>
            </div>
          </Link>

          {/* NAV DESKTOP */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((key) => (
              <Link
                key={key}
                href={`/${locale}${navHrefs[key] === "/" ? "" : navHrefs[key]}`}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                  isActive(key)
                    ? "text-[#E02020]"
                    : isDark
                      ? "text-neutral-300 hover:text-[#E02020]"
                      : "text-neutral-600 hover:text-[#E02020]"
                }`}
              >
                {t(key)}
                {isActive(key) && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#E02020]"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* ACTIONS DROITE */}
          <div className="flex items-center gap-2">
            {/* LANGUE */}
            {/* LANGUE DESKTOP */}
            <button
              onClick={switchLocale}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full border transition-all duration-200 hover:border-[#E02020] hover:text-[#E02020] ${
                isDark
                  ? "border-neutral-700 text-neutral-300"
                  : "border-neutral-200 text-neutral-600"
              }`}
            >
              <ReactCountryFlag
                countryCode={locale === "fr" ? "FR" : "GB"}
                svg
                style={{ fontSize: "1.2em" }}
              />
              <span>{locale === "fr" ? "EN" : "FR"}</span>
            </button>

            {/* THEME TOGGLE */}
            {mounted && (
              <button
                onClick={() => setTheme(isDark ? "light" : "dark")}
                aria-label="Toggle theme"
                className={`p-2 rounded-full border transition-all duration-200 ${
                  isDark
                    ? "border-neutral-700 text-neutral-300 hover:border-[#E02020] hover:text-[#E02020]"
                    : "border-neutral-200 text-neutral-600 hover:border-[#1A3A8F] hover:text-[#1A3A8F]"
                }`}
              >
                {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
              </button>
            )}

            {/* BURGER MOBILE */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 rounded-full border transition-colors duration-200 ${
                isDark
                  ? "border-neutral-700 text-neutral-300"
                  : "border-neutral-200 text-neutral-600"
              }`}
            >
              {isOpen ? <HiX size={20} /> : <HiMenuAlt3 size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* MENU MOBILE */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`lg:hidden overflow-hidden border-t ${
              isDark
                ? "bg-neutral-950/98 border-neutral-800"
                : "bg-white/98 border-neutral-100"
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((key, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={`/${locale}${navHrefs[key] === "/" ? "" : navHrefs[key]}`}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive(key)
                        ? "bg-[#E02020]/10 text-[#E02020]"
                        : isDark
                          ? "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                          : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                    }`}
                  >
                    {t(key)}
                  </Link>
                </motion.div>
              ))}

              {/* Langue mobile */}
              <div
                className={`pt-2 border-t ${
                  isDark ? "border-neutral-800" : "border-neutral-100"
                }`}
              >
                <button
                  onClick={() => {
                    switchLocale();
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium w-full rounded-xl transition-colors ${
                    isDark
                      ? "text-neutral-300 hover:bg-neutral-800"
                      : "text-neutral-600 hover:bg-neutral-50"
                  }`}
                >
                  <span>{locale === "fr" ? "🇬🇧" : "🇫🇷"}</span>
                  <span>
                    {locale === "fr"
                      ? "Switch to English"
                      : "Passer en Français"}
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}