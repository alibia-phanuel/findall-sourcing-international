"use client";

import { useLocale } from "next-intl";
import SourcingSection from "@/components/sections/SourcingSection";
import PageHeader from "@/components/layout/PageHeader";

export default function SourcingPage() {
  const locale = useLocale();
  return (
    <>
      <PageHeader
        tag={locale === "fr" ? "Branche Spécialisée" : "Specialized Branch"}
        title="FINDALL SOURCING"
        subtitle={
          locale === "fr"
            ? "Votre agent sourcing professionnel basé en Chine."
            : "Your professional sourcing agent based in China."
        }
        accentColor="blue"
      />
      <SourcingSection />
    </>
  );
}
