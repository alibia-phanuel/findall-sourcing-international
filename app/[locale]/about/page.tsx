"use client";

import { useLocale } from "next-intl";
import AboutSection from "@/components/sections/AboutSection";
import PageHeader from "@/components/layout/PageHeader";

export default function AboutPage() {
  const locale = useLocale();
  return (
    <>
      <PageHeader
        tag={locale === "fr" ? "Notre Histoire" : "Our Story"}
        title={locale === "fr" ? "À Propos" : "About Us"}
        subtitle={
          locale === "fr"
            ? "Une société africaine connectée aux marchés mondiaux."
            : "An African company connected to global markets."
        }
        accentColor="red"
      />
      <AboutSection />
    </>
  );
}