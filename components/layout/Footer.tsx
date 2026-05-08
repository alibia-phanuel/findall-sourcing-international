"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { FaWhatsapp, FaWeixin } from "react-icons/fa";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { contacts } from "@/lib/data";

const navLinks = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "sourcing", href: "/sourcing" },
  { key: "contact", href: "/contact" },
];

export default function Footer() {
  const t = useTranslations("nav");
  const tf = useTranslations("footer");
  const locale = useLocale();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const isDark = theme === "dark";

  return (
    <footer
      className={`relative border-t transition-colors duration-500 ${
        isDark
          ? "bg-neutral-950 border-neutral-800"
          : "bg-neutral-50 border-neutral-200"
      }`}
    >
      {/* Accent top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E02020]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* COLONNE 1 — Brand */}
          <div className="lg:col-span-1">
            <Link
              href={`/${locale}`}
              className="flex items-center gap-3 mb-5 group w-fit"
            >
              {mounted && (
                <Image
                  src={
                    isDark ? "/images/logo-dark.png.jpg" : "/images/logo-light.png.jpg"
                  }
                  alt="FINDALL Logo"
                  width={44}
                  height={44}
                  className="rounded-lg transition-transform duration-300 group-hover:scale-105"
                />
              )}
              <div>
                <p className="font-black text-sm text-[#E02020]">FINDALL</p>
                <p
                  className={`text-[10px] uppercase tracking-widest transition-colors duration-500 ${
                    isDark ? "text-neutral-500" : "text-neutral-400"
                  }`}
                >
                  International
                </p>
              </div>
            </Link>
            <p
              className={`text-sm leading-relaxed mb-5 transition-colors duration-500 ${
                isDark ? "text-neutral-500" : "text-neutral-500"
              }`}
            >
              {tf("tagline")}
            </p>

            {/* Socials */}
            <div className="flex items-center gap-2">
              <a
                href={`https://wa.me/${contacts.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-200"
              >
                <FaWhatsapp size={16} />
              </a>

              <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#07C160]/10 text-[#07C160]">
                <FaWeixin size={16} />
              </div>

              <a
                href={`mailto:${contacts.emails[0]}`}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  isDark
                    ? "bg-neutral-800 text-neutral-400 hover:bg-[#E02020]/10 hover:text-[#E02020]"
                    : "bg-neutral-200 text-neutral-500 hover:bg-[#E02020]/10 hover:text-[#E02020]"
                }`}
              >
                <HiOutlineMail size={16} />
              </a>
            </div>
          </div>

          {/* COLONNE 2 — Navigation */}
          <div>
            <h4
              className={`text-xs font-black uppercase tracking-[0.15em] mb-5 transition-colors duration-500 ${
                isDark ? "text-neutral-400" : "text-neutral-500"
              }`}
            >
              {locale === "fr" ? "Navigation" : "Navigation"}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={`/${locale}${href === "/" ? "" : href}`}
                    className={`text-sm transition-colors duration-200 hover:text-[#E02020] ${
                      isDark ? "text-neutral-400" : "text-neutral-500"
                    }`}
                  >
                    {t(
                      key as
                        | "home"
                        | "about"
                        | "services"
                        | "sourcing"
                        | "contact",
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLONNE 3 — Contact */}
          <div>
            <h4
              className={`text-xs font-black uppercase tracking-[0.15em] mb-5 transition-colors duration-500 ${
                isDark ? "text-neutral-400" : "text-neutral-500"
              }`}
            >
              Contact
            </h4>
            <ul className="flex flex-col gap-3">
              {contacts.phones.slice(0, 2).map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className={`flex items-center gap-2 text-sm transition-colors duration-200 hover:text-[#E02020] ${
                      isDark ? "text-neutral-400" : "text-neutral-500"
                    }`}
                  >
                    <HiOutlinePhone size={13} className="flex-shrink-0" />
                    {phone}
                  </a>
                </li>
              ))}

              {contacts.emails.map((email) => (
                <li key={email}>
                  <a
                    href={`mailto:${email}`}
                    className={`flex items-center gap-2 text-sm transition-colors duration-200 hover:text-[#E02020] truncate ${
                      isDark ? "text-neutral-400" : "text-neutral-500"
                    }`}
                  >
                    <HiOutlineMail size={13} className="flex-shrink-0" />
                    {email}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLONNE 4 — Sourcing */}
          <div>
            <h4
              className={`text-xs font-black uppercase tracking-[0.15em] mb-5 transition-colors duration-500 ${
                isDark ? "text-neutral-400" : "text-neutral-500"
              }`}
            >
              FINDALL SOURCING
            </h4>
            <p
              className={`text-sm leading-relaxed mb-4 transition-colors duration-500 ${
                isDark ? "text-neutral-500" : "text-neutral-500"
              }`}
            >
              {locale === "fr"
                ? "Votre agent sourcing en Chine. Guangzhou · Shenzhen · Yiwu"
                : "Your sourcing agent in China. Guangzhou · Shenzhen · Yiwu"}
            </p>

            <a
              href={`https://wa.me/${contacts.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#E02020] hover:bg-[#c41a1a] text-white text-xs font-bold rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(224,32,32,0.35)]"
            >
              <FaWhatsapp size={14} />
              {locale === "fr" ? "Démarrer" : "Get started"}
            </a>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div
          className={`pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors duration-500 ${
            isDark ? "border-neutral-800" : "border-neutral-200"
          }`}
        >
          <p
            className={`text-xs transition-colors duration-500 ${
              isDark ? "text-neutral-600" : "text-neutral-400"
            }`}
          >
            © {new Date().getFullYear()} FINDALL International Trading Groupe
            SARL. {tf("rights")}
          </p>
          <div className="flex items-center gap-1">
            <span
              className={`text-xs transition-colors duration-500 ${
                isDark ? "text-neutral-700" : "text-neutral-300"
              }`}
            >
              Yaoundé, Cameroun 🇨🇲 · Made with
            </span>
            <span className="text-[#E02020] text-xs">♥</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
