"use client";

import { useLocale } from "next-intl";
import ContactSection from "@/components/sections/ContactSection";
import PageHeader from "@/components/layout/PageHeader";

export default function ContactPage() {
  const locale = useLocale();
  return (
    <>
      <PageHeader
        tag={locale === "fr" ? "Parlons-nous" : "Let's talk"}
        title={locale === "fr" ? "Contactez-Nous" : "Contact Us"}
        subtitle={
          locale === "fr"
            ? "Disponibles sur WhatsApp, WeChat et par email."
            : "Available on WhatsApp, WeChat and by email."
        }
        accentColor="red"
      />
      <ContactSection />
    </>
  );
}
