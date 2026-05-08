"use client";

import { useLocale } from "next-intl";
import ServicesSection from "@/components/sections/ServicesSection";
import PageHeader from "@/components/layout/PageHeader";

export default function ServicesPage() {
  const locale = useLocale();
  return (
    <>
      <PageHeader
        tag={locale === "fr" ? "Ce que nous faisons" : "What we do"}
        title={locale === "fr" ? "Nos Services" : "Our Services"}
        subtitle={
          locale === "fr"
            ? "8 domaines d'expertise pour vos besoins commerciaux et industriels."
            : "8 areas of expertise for your commercial and industrial needs."
        }
        accentColor="red"
      />
      <ServicesSection />
    </>
  );
}
