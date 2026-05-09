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

const stepKeys = ["suppliers", "production", "quality", "shipping", "custom", "network"] as const;
const stepEmojis = ["🔍", "🏭", "✅", "🚢", "🎨", "🌐"];
const stepColors = ["#E02020", "#1A3A8F", "#E02020", "#1A3A8F", "#E02020", "#1A3A8F"];

const cities = ["Guangzhou", "Shenzhen", "Yiwu"];

const visaItems = [
  { emoji: "💼", num: 0, color: "#1A3A8F", titleFr: "Visa Business / M", titleEn: "Business / M Visa", descFr: "Pour vos déplacements professionnels en Chine.", descEn: "For your professional trips to China." },
  { emoji: "⚙️", num: 1, color: "#E02020", titleFr: "Visa Travail / Z", titleEn: "Work / Z Visa", descFr: "Pour les contrats de travail en territoire chinois.", descEn: "For work contracts in Chinese territory." },
  { emoji: "🎓", num: 2, color: "#1A3A8F", titleFr: "Visa Étudiant / X (X1, X2)", titleEn: "Student / X Visa (X1, X2)", descFr: "Court et long séjour pour études en Chine.", descEn: "Short and long stay for studies in China." },
  { emoji: "🏫", num: 3, color: "#E02020", titleFr: "Admission Scolaire", titleEn: "School Admission", descFr: "Accompagnement pour intégrer les meilleures universités chinoises.", descEn: "Support to join the best Chinese universities." },
  { emoji: "🏆", num: 4, color: "#1A3A8F", titleFr: "Bourses d'Études", titleEn: "Scholarship", descFr: "Recherche et candidature aux bourses gouvernementales.", descEn: "Research and application for scholarships." },
];

const qcItems = [
  { emoji: "🔍", num: 0, color: "#E02020", titleFr: "Inspection Produits", titleEn: "Product Inspections", descFr: "Vérification physique de vos produits avant expédition.", descEn: "Physical verification of your products before shipment." },
  { emoji: "🏭", num: 1, color: "#1A3A8F", titleFr: "Audit d'Usine", titleEn: "Factory Audits", descFr: "Évaluation complète des capacités des fournisseurs.", descEn: "Full assessment of supplier capabilities." },
  { emoji: "📋", num: 2, color: "#E02020", titleFr: "Vérification Qualité", titleEn: "Quality Verification", descFr: "Contrôle des spécifications techniques requises.", descEn: "Checking technical specifications and standards." },
  { emoji: "📦", num: 3, color: "#1A3A8F", titleFr: "Contrôle Emballage", titleEn: "Packaging Checks", descFr: "Inspection des matériaux et conformité des emballages.", descEn: "Inspection of materials and packaging compliance." },
  { emoji: "🚢", num: 4, color: "#E02020", titleFr: "Inspection Pré-expédition", titleEn: "Pre-shipment Inspections", descFr: "Dernier contrôle avant le chargement du conteneur.", descEn: "Final check before container loading." },
];

function BranchDivider({ isDark }: { isDark: boolean }) {
  return (
    <div className={`w-full h-px my-20 ${isDark ? "bg-neutral-800" : "bg-neutral-200"}`}>
      <div className="w-24 h-px bg-gradient-to-r from-[#E02020] to-[#1A3A8F]" />
    </div>
  );
}

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
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 pointer-events-none">
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${isDark ? "opacity-[0.04]" : "opacity-[0.025]"}`}
          style={{
            backgroundImage: `
              linear-gradient(rgba(26,58,143,0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(26,58,143,0.8) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
        <div className={`absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full border-2 transition-colors duration-500 ${isDark ? "border-[#1A3A8F]/10" : "border-[#1A3A8F]/06"}`} />
        <div className={`absolute -bottom-16 -left-16 w-[400px] h-[400px] rounded-full border transition-colors duration-500 ${isDark ? "border-[#E02020]/08" : "border-[#E02020]/05"}`} />
      </motion.div>

      {/* Glow Parallax */}
      <motion.div style={{ y: glowY }} className="absolute inset-0 z-0 pointer-events-none">
        <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[130px] transition-opacity duration-500 ${isDark ? "bg-[#1A3A8F] opacity-10" : "bg-[#1A3A8F] opacity-[0.05]"}`} />
        <div className={`absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full blur-[100px] transition-opacity duration-500 ${isDark ? "bg-[#E02020] opacity-[0.06]" : "bg-[#E02020] opacity-[0.03]"}`} />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER GÉNÉRAL */}
        <FadeIn delay={0}>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#1A3A8F]" />
              <span className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${isDark ? "text-neutral-500" : "text-neutral-400"}`}>
                {locale === "fr" ? "Branches Spécialisées" : "Specialized Branches"}
              </span>
              <div className="w-8 h-px bg-[#1A3A8F]" />
            </div>
            <h2 className={`text-4xl sm:text-5xl font-black mb-2 transition-colors duration-500 ${isDark ? "text-white" : "text-neutral-900"}`}>
              FINDALL
            </h2>
            <h2 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#1A3A8F] to-[#4a7fff] mb-6">
              SOURCING
            </h2>
            <p className={`text-lg max-w-2xl mx-auto transition-colors duration-500 ${isDark ? "text-neutral-400" : "text-neutral-500"}`}>
              {t("description")}
            </p>
          </div>
        </FadeIn>

        {/* ====================== BRANCHE 01 — SOURCING ====================== */}
        <div>
          <FadeIn delay={0}>
            <div className="flex items-center gap-4 mb-10">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl flex-shrink-0 font-black text-2xl text-white" style={{ background: "linear-gradient(135deg, #E02020, #ff6b6b)" }}>
                01
              </div>
              <div className="flex-1">
                <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${isDark ? "text-neutral-500" : "text-neutral-400"}`}>
                  {locale === "fr" ? "Branche Spécialisée" : "Specialized Branch"}
                </p>
                <h3 className={`text-2xl sm:text-3xl font-black ${isDark ? "text-white" : "text-neutral-900"}`}>
                  {locale === "fr" ? "Sourcing Produits" : "Product Sourcing"}
                </h3>
              </div>

              <a
                href="https://findallsourcing.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={`hidden sm:inline-flex group items-center gap-2 px-4 py-2 rounded-full border font-bold text-xs transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(26,58,143,0.3)] ${
                  isDark ? "border-[#1A3A8F]/50 text-[#4a7fff] bg-[#1A3A8F]/10 hover:bg-[#1A3A8F]/20" : "border-[#1A3A8F]/40 text-[#1A3A8F] bg-[#1A3A8F]/05 hover:bg-[#1A3A8F]/10"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#1A3A8F] animate-pulse" />
                {locale === "fr" ? "Voir la Marketplace" : "View Marketplace"}
                <HiArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-10 items-start mb-12">
            <FadeIn delay={0.1} direction="left">
              <div className="flex flex-wrap gap-2 mb-6">
                <ReactCountryFlag countryCode="CN" svg style={{ fontSize: "1.4em" }} className="mt-0.5" />
                {cities.map((city, i) => (
                  <span key={city} className="flex items-center gap-2">
                    <span className={`text-sm font-semibold ${isDark ? "text-neutral-300" : "text-neutral-600"}`}>{city}</span>
                    {i < cities.length - 1 && <span className={`text-xs ${isDark ? "text-neutral-600" : "text-neutral-300"}`}>·</span>}
                  </span>
                ))}
              </div>

              <a
                href={`https://wa.me/${contacts.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-[#1A3A8F] hover:bg-[#142d70] text-white font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_25px_rgba(26,58,143,0.4)] hover:scale-105"
              >
                <FaWhatsapp size={18} className="text-[#25D366]" />
                {locale === "fr" ? "Démarrer un sourcing" : "Start sourcing"}
                <HiArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </FadeIn>

            <FadeIn delay={0.2} direction="right">
              <div className={`relative rounded-3xl p-6 border overflow-hidden transition-colors duration-500 ${isDark ? "bg-neutral-800 border-neutral-700" : "bg-white border-neutral-200 shadow-lg"}`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1A3A8F] via-[#4a7fff] to-[#E02020]" />
                <div className="text-4xl mb-3 opacity-20 font-serif">&quot;</div>
                <p className={`text-xl font-black italic mb-4 ${isDark ? "text-white" : "text-neutral-900"}`}>{t("tagline")}</p>
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-dashed border-neutral-200 dark:border-neutral-700">
                  {[
                    { value: "6", label: locale === "fr" ? "Étapes" : "Steps" },
                    { value: "3", label: locale === "fr" ? "Villes CN" : "CN Cities" },
                    { value: "100%", label: locale === "fr" ? "Dédié" : "Dedicated" },
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <p className="text-lg font-black text-[#1A3A8F]">{s.value}</p>
                      <p className={`text-xs mt-0.5 ${isDark ? "text-neutral-500" : "text-neutral-400"}`}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Timeline Sourcing */}
          <FadeIn delay={0}>
            <p className={`text-sm text-center mb-10 ${isDark ? "text-neutral-500" : "text-neutral-400"}`}>
              {locale === "fr" ? "Notre processus en 6 étapes" : "Our 6-step process"}
            </p>
          </FadeIn>

          <div className="hidden lg:block relative">
            <div className="absolute top-10 left-0 right-0 flex items-center px-8">
              <TimelineLine isDark={isDark} />
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

          <div className="lg:hidden relative pl-8">
            <div className={`absolute left-4 top-0 bottom-0 w-px ${isDark ? "bg-neutral-800" : "bg-neutral-200"}`} />
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

          {/* CTA Marketplace */}
          <FadeIn delay={0.2}>
            <div className="flex justify-center mt-12">
              <a
                href="https://findallsourcing.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl border-2 font-bold text-base transition-all duration-300 hover:scale-105 overflow-hidden ${
                  isDark
                    ? "border-[#1A3A8F] text-white bg-[#1A3A8F]/15 hover:bg-[#1A3A8F]/25 hover:shadow-[0_0_30px_rgba(26,58,143,0.4)]"
                    : "border-[#1A3A8F] text-[#1A3A8F] bg-[#1A3A8F]/05 hover:bg-[#1A3A8F]/10 hover:shadow-[0_0_30px_rgba(26,58,143,0.2)]"
                }`}
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <span className="text-xl">🛒</span>
                <div className="text-left">
                  <p className="text-xs font-medium opacity-70 mb-0.5">{locale === "fr" ? "Découvrez notre" : "Discover our"}</p>
                  <p className="font-black tracking-wide">{locale === "fr" ? "Marketplace FINDALL" : "FINDALL Marketplace"}</p>
                </div>
                <HiArrowRight size={20} className="ml-2 transition-transform duration-300 group-hover:translate-x-1.5" />
              </a>
            </div>
          </FadeIn>
        </div>

        <BranchDivider isDark={isDark} />

        {/* ====================== BRANCHE 02 — VISA ====================== */}
        <div>
          <FadeIn delay={0}>
            <div className="flex items-center gap-4 mb-10">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl flex-shrink-0 font-black text-2xl text-white" style={{ background: "linear-gradient(135deg, #1A3A8F, #4a7fff)" }}>
                02
              </div>
              <div>
                <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${isDark ? "text-neutral-500" : "text-neutral-400"}`}>
                  {locale === "fr" ? "Branche Spécialisée" : "Specialized Branch"}
                </p>
                <h3 className={`text-2xl sm:text-3xl font-black ${isDark ? "text-white" : "text-neutral-900"}`}>
                  {locale === "fr" ? "Visa & Admission Universitaire" : "Visa Application & Study Admission"}
                </h3>
              </div>
            </div>
          </FadeIn>

          <div className="hidden lg:block relative">
            <div className="absolute top-10 left-0 right-0 flex items-center px-8">
              <TimelineLine isDark={isDark} />
            </div>
            <div className="grid grid-cols-5 gap-4">
              {visaItems.map((item) => (
                <TimelineStepDesktop
                  key={item.num}
                  index={item.num}
                  emoji={item.emoji}
                  color={item.color}
                  title={locale === "fr" ? item.titleFr : item.titleEn}
                  desc={locale === "fr" ? item.descFr : item.descEn}
                  isDark={isDark}
                  isEven={item.num % 2 === 0}
                />
              ))}
            </div>
          </div>

          <div className="lg:hidden relative pl-8">
            <div className={`absolute left-4 top-0 bottom-0 w-px ${isDark ? "bg-neutral-800" : "bg-neutral-200"}`} />
            <div className="flex flex-col gap-8">
              {visaItems.map((item) => (
                <TimelineStepMobile
                  key={item.num}
                  index={item.num}
                  emoji={item.emoji}
                  color={item.color}
                  title={locale === "fr" ? item.titleFr : item.titleEn}
                  desc={locale === "fr" ? item.descFr : item.descEn}
                  isDark={isDark}
                />
              ))}
            </div>
          </div>

          <FadeIn delay={0.2}>
            <div className="flex justify-center mt-12">
              <a
                href={`https://wa.me/${contacts.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl border-2 font-bold text-base transition-all duration-300 hover:scale-105 overflow-hidden ${
                  isDark
                    ? "border-[#1A3A8F] text-white bg-[#1A3A8F]/15 hover:bg-[#1A3A8F]/25 hover:shadow-[0_0_30px_rgba(26,58,143,0.4)]"
                    : "border-[#1A3A8F] text-[#1A3A8F] bg-[#1A3A8F]/05 hover:bg-[#1A3A8F]/10 hover:shadow-[0_0_30px_rgba(26,58,143,0.2)]"
                }`}
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <FaWhatsapp size={20} className="text-[#25D366]" />
                <div className="text-left">
                  <p className="text-xs font-medium opacity-70 mb-0.5">{locale === "fr" ? "Besoin d'aide ?" : "Need help?"}</p>
                  <p className="font-black tracking-wide">{locale === "fr" ? "Demander un visa" : "Apply for a visa"}</p>
                </div>
                <HiArrowRight size={20} className="ml-2 transition-transform duration-300 group-hover:translate-x-1.5" />
              </a>
            </div>
          </FadeIn>
        </div>

        <BranchDivider isDark={isDark} />

        {/* ====================== BRANCHE 03 — QUALITY CONTROL ====================== */}
        <div>
          <FadeIn delay={0}>
            <div className="flex items-center gap-4 mb-10">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl flex-shrink-0 font-black text-2xl text-white" style={{ background: "linear-gradient(135deg, #E02020, #ff6b6b)" }}>
                03
              </div>
              <div>
                <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${isDark ? "text-neutral-500" : "text-neutral-400"}`}>
                  {locale === "fr" ? "Branche Spécialisée" : "Specialized Branch"}
                </p>
                <h3 className={`text-2xl sm:text-3xl font-black ${isDark ? "text-white" : "text-neutral-900"}`}>
                  {locale === "fr" ? "Contrôle Qualité & Inspection" : "Quality Control & Inspection"}
                </h3>
              </div>
            </div>
          </FadeIn>

          <div className="hidden lg:block relative">
            <div className="absolute top-10 left-0 right-0 flex items-center px-8">
              <TimelineLine isDark={isDark} />
            </div>
            <div className="grid grid-cols-5 gap-4">
              {qcItems.map((item) => (
                <TimelineStepDesktop
                  key={item.num}
                  index={item.num}
                  emoji={item.emoji}
                  color={item.color}
                  title={locale === "fr" ? item.titleFr : item.titleEn}
                  desc={locale === "fr" ? item.descFr : item.descEn}
                  isDark={isDark}
                  isEven={item.num % 2 === 0}
                />
              ))}
            </div>
          </div>

          <div className="lg:hidden relative pl-8">
            <div className={`absolute left-4 top-0 bottom-0 w-px ${isDark ? "bg-neutral-800" : "bg-neutral-200"}`} />
            <div className="flex flex-col gap-8">
              {qcItems.map((item) => (
                <TimelineStepMobile
                  key={item.num}
                  index={item.num}
                  emoji={item.emoji}
                  color={item.color}
                  title={locale === "fr" ? item.titleFr : item.titleEn}
                  desc={locale === "fr" ? item.descFr : item.descEn}
                  isDark={isDark}
                />
              ))}
            </div>
          </div>

          <FadeIn delay={0.2}>
            <div className="flex justify-center mt-12">
              <a
                href={`https://wa.me/${contacts.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl border-2 font-bold text-base transition-all duration-300 hover:scale-105 overflow-hidden ${
                  isDark
                    ? "border-[#E02020] text-white bg-[#E02020]/15 hover:bg-[#E02020]/25 hover:shadow-[0_0_30px_rgba(224,32,32,0.4)]"
                    : "border-[#E02020] text-[#E02020] bg-[#E02020]/05 hover:bg-[#E02020]/10 hover:shadow-[0_0_30px_rgba(224,32,32,0.2)]"
                }`}
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <FaWhatsapp size={20} className="text-[#25D366]" />
                <div className="text-left">
                  <p className="text-xs font-medium opacity-70 mb-0.5">{locale === "fr" ? "Besoin d'une inspection ?" : "Need an inspection?"}</p>
                  <p className="font-black tracking-wide">{locale === "fr" ? "Demander un contrôle" : "Request quality control"}</p>
                </div>
                <HiArrowRight size={20} className="ml-2 transition-transform duration-300 group-hover:translate-x-1.5" />
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ==================== TIMELINE COMPONENTS ==================== */
function TimelineLine({ isDark }: { isDark: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="w-full relative h-px">
      <div className={`absolute inset-0 ${isDark ? "bg-neutral-800" : "bg-neutral-200"}`} />
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
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className={`flex flex-col ${isEven ? "pt-20" : "pb-20 justify-end"}`}
    >
      <div className={`flex justify-center ${isEven ? "mb-4 order-first" : "mt-4 order-last"}`}>
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
          isDark ? "bg-neutral-900 border-neutral-800 hover:border-neutral-600" : "bg-white border-neutral-200 hover:border-neutral-300 hover:shadow-lg"
        }`}
      >
        <div className="text-2xl mb-3 w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
          {emoji}
        </div>
        <div className="text-xs font-black mb-0.5 uppercase tracking-wider" style={{ color }}>
          {String(index + 1).padStart(2, "0")}
        </div>
        <h4 className={`text-sm font-bold mb-2 leading-tight ${isDark ? "text-white" : "text-neutral-900"}`}>{title}</h4>
        <p className={`text-xs leading-relaxed ${isDark ? "text-neutral-500" : "text-neutral-500"}`}>{desc}</p>
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
      <div className="absolute -left-[26px] top-3 w-4 h-4 rounded-full border-2 border-white dark:border-neutral-900 shadow-md" style={{ backgroundColor: color }} />
      <div className={`rounded-2xl p-5 border transition-colors duration-500 ${isDark ? "bg-neutral-900 border-neutral-800" : "bg-white border-neutral-200 shadow-sm"}`}>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xl">{emoji}</span>
          <span className="text-xs font-black uppercase tracking-wider" style={{ color }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <h4 className={`text-sm font-bold ${isDark ? "text-white" : "text-neutral-900"}`}>{title}</h4>
        </div>
        <p className={`text-xs leading-relaxed ${isDark ? "text-neutral-500" : "text-neutral-500"}`}>{desc}</p>
      </div>
    </motion.div>
  );
}