"use client";

import { useRef, useState, type ReactNode } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useTheme } from "next-themes";
import { FaWhatsapp, FaWeixin } from "react-icons/fa";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";
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

export default function ContactSection() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const sectionRef = useRef<HTMLDivElement>(null);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const decorY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  return (
    <section
      ref={sectionRef}
      className={`relative py-28 overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-neutral-950" : "bg-white"
      }`}
    >
      {/* DÉCOR PARALLAXE */}
      <motion.div
        style={{ y: decorY }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div
          className={`absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[140px] transition-opacity duration-500 ${
            isDark
              ? "bg-[#E02020] opacity-[0.05]"
              : "bg-[#E02020] opacity-[0.03]"
          }`}
        />
        <div
          className={`absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] transition-opacity duration-500 ${
            isDark
              ? "bg-[#1A3A8F] opacity-[0.07]"
              : "bg-[#1A3A8F] opacity-[0.03]"
          }`}
        />

        <div className="absolute top-20 left-[10%] grid grid-cols-5 gap-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className={`w-1 h-1 rounded-full transition-colors duration-500 ${
                isDark ? "bg-neutral-800" : "bg-neutral-200"
              }`}
            />
          ))}
        </div>

        <div
          className={`absolute -bottom-20 -right-20 w-80 h-80 rounded-full border-2 transition-colors duration-500 ${
            isDark ? "border-[#E02020]/08" : "border-[#E02020]/05"
          }`}
        />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="text-center mb-16">
          <FadeIn delay={0}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#E02020]" />
              <span
                className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${
                  isDark ? "text-neutral-500" : "text-neutral-400"
                }`}
              >
                {locale === "fr" ? "Parlons-nous" : "Let's talk"}
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
              className={`text-lg max-w-xl mx-auto transition-colors duration-500 ${
                isDark ? "text-neutral-400" : "text-neutral-500"
              }`}
            >
              {t("subtitle")}
            </p>
          </FadeIn>
        </div>

        {/* GRILLE CONTACT */}
        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          {/* Téléphones */}
          <FadeIn delay={0.1} direction="left">
            <div
              className={`h-full rounded-3xl p-7 border transition-colors duration-500 ${
                isDark
                  ? "bg-neutral-900 border-neutral-800"
                  : "bg-neutral-50 border-neutral-200"
              }`}
            >
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5"
                style={{ backgroundColor: "#E0202015", color: "#E02020" }}
              >
                <HiOutlinePhone size={22} />
              </div>
              <h3
                className={`text-base font-bold mb-4 transition-colors duration-500 ${
                  isDark ? "text-white" : "text-neutral-900"
                }`}
              >
                {t("phones")}
              </h3>
              <div className="flex flex-col gap-3">
                {contacts.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className={`group flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                      isDark
                        ? "border-neutral-800 hover:border-[#E02020]/40 hover:bg-[#E02020]/05 text-neutral-300"
                        : "border-neutral-200 hover:border-[#E02020]/40 hover:bg-[#E02020]/05 text-neutral-700"
                    }`}
                  >
                    <span>{phone}</span>
                    <HiOutlinePhone
                      size={14}
                      className="opacity-0 group-hover:opacity-100 text-[#E02020] transition-opacity duration-200"
                    />
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Emails + Adresse */}
          <FadeIn delay={0.2}>
            <div
              className={`h-full rounded-3xl p-7 border transition-colors duration-500 ${
                isDark
                  ? "bg-neutral-900 border-neutral-800"
                  : "bg-neutral-50 border-neutral-200"
              }`}
            >
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5"
                style={{ backgroundColor: "#1A3A8F15", color: "#1A3A8F" }}
              >
                <HiOutlineMail size={22} />
              </div>
              <h3
                className={`text-base font-bold mb-4 transition-colors duration-500 ${
                  isDark ? "text-white" : "text-neutral-900"
                }`}
              >
                {t("email")}
              </h3>
              <div className="flex flex-col gap-3">
                {contacts.emails.map((email) => (
                  <button
                    key={email}
                    onClick={() => copyEmail(email)}
                    className={`group flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium text-left transition-all duration-200 w-full ${
                      copiedEmail === email
                        ? "border-green-500/40 bg-green-500/05 text-green-500"
                        : isDark
                          ? "border-neutral-800 hover:border-[#1A3A8F]/40 hover:bg-[#1A3A8F]/05 text-neutral-300"
                          : "border-neutral-200 hover:border-[#1A3A8F]/40 hover:bg-[#1A3A8F]/05 text-neutral-700"
                    }`}
                  >
                    <span className="truncate">{email}</span>
                    <span className="text-xs ml-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {copiedEmail === email ? "✓" : "copy"}
                    </span>
                  </button>
                ))}
              </div>

              {/* Adresse */}
              <div
                className={`mt-5 flex items-start gap-3 pt-5 border-t transition-colors duration-500 ${
                  isDark ? "border-neutral-800" : "border-neutral-200"
                }`}
              >
                <HiOutlineLocationMarker
                  size={18}
                  className="flex-shrink-0 mt-0.5 text-[#E02020]"
                />
                <p
                  className={`text-sm transition-colors duration-500 ${
                    isDark ? "text-neutral-400" : "text-neutral-500"
                  }`}
                >
                  {t("address")}
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Messageries */}
          <FadeIn delay={0.3} direction="right">
            <div
              className={`h-full rounded-3xl p-7 border transition-colors duration-500 ${
                isDark
                  ? "bg-neutral-900 border-neutral-800"
                  : "bg-neutral-50 border-neutral-200"
              }`}
            >
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5"
                style={{ backgroundColor: "#25D36615", color: "#25D366" }}
              >
                <FaWhatsapp size={22} />
              </div>
              <h3
                className={`text-base font-bold mb-4 transition-colors duration-500 ${
                  isDark ? "text-white" : "text-neutral-900"
                }`}
              >
                {locale === "fr" ? "Messageries" : "Messaging"}
              </h3>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${contacts.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-4 py-4 rounded-2xl bg-[#25D366] hover:bg-[#1fb855] text-white font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(37,211,102,0.35)] mb-3"
              >
                <FaWhatsapp size={20} />
                <div className="flex-1">
                  <p className="text-sm font-bold">{t("whatsapp")}</p>
                  <p className="text-xs opacity-75">+{contacts.whatsapp}</p>
                </div>
                <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>

              {/* WeChat */}
              <div
                className={`flex items-center gap-3 px-4 py-4 rounded-2xl border text-sm transition-colors duration-500 ${
                  isDark
                    ? "border-neutral-800 text-neutral-400"
                    : "border-neutral-200 text-neutral-500"
                }`}
              >
                <FaWeixin size={20} className="text-[#07C160]" />
                <div>
                  <p
                    className={`text-sm font-semibold transition-colors duration-500 ${
                      isDark ? "text-neutral-300" : "text-neutral-700"
                    }`}
                  >
                    WeChat
                  </p>
                  <p className="text-xs">{contacts.wechat}</p>
                </div>
              </div>

              {/* Disponibilité */}
              <div
                className={`mt-5 flex items-center gap-2 pt-5 border-t transition-colors duration-500 ${
                  isDark ? "border-neutral-800" : "border-neutral-200"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <p
                  className={`text-xs transition-colors duration-500 ${
                    isDark ? "text-neutral-500" : "text-neutral-400"
                  }`}
                >
                  {locale === "fr"
                    ? "Disponible 7j/7 sur WhatsApp & WeChat"
                    : "Available 7/7 on WhatsApp & WeChat"}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* BANDEAU CTA FINAL */}
        <FadeIn delay={0.3}>
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#E02020] to-[#1A3A8F]" />
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
            />
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 p-8 sm:p-10">
              <div>
                <p className="text-white/70 text-sm font-medium mb-1 uppercase tracking-widest">
                  FINDALL International Trading
                </p>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {locale === "fr"
                    ? "Prêt à connecter vos affaires au monde ?"
                    : "Ready to connect your business to the world?"}
                </h3>
              </div>

              <a
                href={`https://wa.me/${contacts.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-[#E02020] font-black rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl whitespace-nowrap"
              >
                <FaWhatsapp size={20} className="text-[#25D366]" />
                {locale === "fr" ? "Écrire maintenant" : "Write now"}
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
