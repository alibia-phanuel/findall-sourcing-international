"use client";

import { useTheme } from "next-themes";
import { motion } from "framer-motion";

interface PageHeaderProps {
  tag: string;
  title: string;
  subtitle?: string;
  accentColor?: "red" | "blue";
}

export default function PageHeader({
  tag,
  title,
  subtitle,
  accentColor = "red",
}: PageHeaderProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const color = accentColor === "red" ? "#E02020" : "#1A3A8F";

  return (
    <section
      className={`relative pt-32 pb-16 overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-neutral-950" : "bg-white"
      }`}
    >
      {/* Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] opacity-10 pointer-events-none"
        style={{ backgroundColor: color }}
      />

      {/* Grille */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          isDark ? "opacity-[0.04]" : "opacity-[0.025]"
        }`}
        style={{
          backgroundImage: `
            linear-gradient(rgba(224,32,32,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(224,32,32,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-5"
        >
          <div className="w-8 h-px" style={{ backgroundColor: color }} />
          <span
            className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${
              isDark ? "text-neutral-500" : "text-neutral-400"
            }`}
          >
            {tag}
          </span>
          <div className="w-8 h-px" style={{ backgroundColor: color }} />
        </motion.div>

        {/* Titre */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`text-4xl sm:text-6xl font-black mb-4 transition-colors duration-500 ${
            isDark ? "text-white" : "text-neutral-900"
          }`}
        >
          {title}
        </motion.h1>

        {/* Barre */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-16 h-1.5 rounded-full mx-auto mb-5"
          style={{
            background: `linear-gradient(90deg, ${color}, ${
              accentColor === "red" ? "#1A3A8F" : "#E02020"
            })`,
          }}
        />

        {/* Sous-titre */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className={`text-lg max-w-2xl mx-auto transition-colors duration-500 ${
              isDark ? "text-neutral-400" : "text-neutral-500"
            }`}
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* Ligne bas */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}30, transparent)`,
        }}
      />
    </section>
  );
}