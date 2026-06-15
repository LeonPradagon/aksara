"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Shield,
} from "lucide-react";
import { useLocale } from "@/contexts/locale-context";

export default function AboutPage() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useLocale();
  const [whoWeAreImage, setWhoWeAreImage] = useState("/picture/ilustrasi-keadilan.jpg");

  useEffect(() => {
    async function fetchSettings() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5342/api"}/settings`);
        if (response.ok) {
          const data = await response.json();
          if (data.about_who_we_are_image) {
            const url = data.about_who_we_are_image;
            setWhoWeAreImage(url.startsWith("http") || url.startsWith("/picture/") || url.startsWith("/tim/") ? url : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5342/api"}${url}`);
          }
        }
      } catch (err) {
        console.error("Failed to fetch settings:", err);
      }
    }
    fetchSettings();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-6xl md:text-7xl font-bold text-foreground mb-6">
            {t("about.hero_title")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed italic">
            {t("about.hero_subtitle")}
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section
        id="who-we-are"
        className="py-16 md:py-24 border-b border-border scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif text-5xl font-bold text-foreground mb-8">
                {t("about.who_title")}
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {t("about.who_p1")}
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {t("about.who_p2")}
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {t("about.who_p3")}
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {t("about.who_p4")}
              </p>
            </div>
            {/* <div className="bg-muted rounded-lg p-10 border border-border h-full flex items-center justify-center min-h-80">
              <div className="text-center">
                <p className="font-serif text-6xl font-bold text-foreground mb-3">Since 2010</p>
                <p className="text-muted-foreground text-lg">Advancing Indonesian policy analysis</p>
              </div>
            </div> */}
            <div
              className="rounded-lg border border-border w-full aspect-[3/2] bg-cover bg-center"
              style={{
                backgroundImage: `url('${whoWeAreImage}')`,
              }}
            >
              {/* <div className="text-center bg-black/40 backdrop-blur-sm rounded-lg p-6">
                <p className="font-serif text-6xl font-bold text-white mb-3">
                  Since 2010
                </p>
                <p className="text-white/80 text-lg">
                  Advancing Indonesian policy analysis
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section
        id="vision-mission"
        className="py-16 md:py-24 border-b border-border scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-5xl font-bold text-foreground mb-12">
            {t("about.vision_title")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="p-10 rounded-lg border border-border bg-card">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-5">
                {t("about.vision_heading")}
              </h3>
              <p className="text-foreground leading-relaxed text-lg">
                {t("about.vision_desc")}
              </p>
            </div>
            <div className="p-10 rounded-lg border border-border bg-card">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-5">
                {t("about.mission_heading")}
              </h3>
              <ul className="text-foreground leading-relaxed text-lg list-disc pl-6 space-y-3">
                <li>{t("about.mission_list.0")}</li>
                <li>{t("about.mission_list.1")}</li>
                <li>{t("about.mission_list.2")}</li>
                <li>{t("about.mission_list.3")}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section
        id="values"
        className="py-16 md:py-24 border-b border-border bg-muted/30 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-5xl font-bold text-foreground mb-12">
            {t("about.values_title")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: t("about.values_items.0.title"),
                description: t("about.values_items.0.desc"),
              },
              {
                title: t("about.values_items.1.title"),
                description: t("about.values_items.1.desc"),
              },
              {
                title: t("about.values_items.2.title"),
                description: t("about.values_items.2.desc"),
              },
              {
                title: t("about.values_items.3.title"),
                description: t("about.values_items.3.desc"),
              },
              {
                title: t("about.values_items.4.title"),
                description: t("about.values_items.4.desc"),
              },
              {
                title: t("about.values_items.5.title"),
                description: t("about.values_items.5.desc"),
              },
            ].map((value, i) => (
              <div
                key={i}
                className="p-8 rounded-lg border border-border bg-card hover:shadow-md transition-shadow"
              >
                <h3 className="font-serif text-xl font-bold text-foreground mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organizational Structure */}
      <section
        id="structure"
        className="py-16 md:py-24 border-b border-border scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-5xl font-bold text-foreground mb-12">
            {t("about.structure_title")}
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              {t("about.structure_intro")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-serif text-3xl font-bold text-foreground mb-4">
                  {t("about.research_div_title")}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {t("about.research_div_desc")}
                </p>
                <ul className="space-y-4">
                  {[0, 1, 2].map((i) => (
                    <li key={i} className="flex gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                      <span>
                        <strong className="text-foreground">
                          {t(`about.research_div_items.${i}.title`)}
                        </strong>
                        {t(`about.research_div_items.${i}.desc`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-serif text-3xl font-bold text-foreground mb-4">
                  {t("about.consulting_div_title")}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {t("about.consulting_div_desc")}
                </p>
                <ul className="space-y-3">
                  {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                    <li key={i} className="flex gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                      <span className="text-foreground">
                        {t(`about.consulting_div_items.${i}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-12 text-center">
              <Link
                href="/about/structure"
                className="inline-flex items-center gap-2 text-primary font-medium hover:underline hover:underline-offset-4 transition-all"
              >
                {t("about.structure_btn")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Research Instruments */}
      <section
        id="instruments"
        className="py-16 md:py-24 border-b border-border bg-muted/30 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-5xl font-bold text-foreground mb-6">
            {t("about.instruments_title")}
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mb-12">
            {t("about.instruments_desc")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="p-6 rounded-lg bg-background border border-border shadow-sm"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="font-serif font-bold text-primary">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">
                  {t(`about.instruments_benefits.${i}.title`)}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t(`about.instruments_benefits.${i}.desc`)}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-background rounded-2xl p-8 md:p-12 border border-border">
            <h3 className="font-serif text-3xl font-bold text-foreground mb-8 text-center">
              {t("about.data_principles_title")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-foreground" />
                  </div>
                  <h4 className="font-bold text-foreground mb-2">
                    {t(`about.data_principles_items.${i}.title`)}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {t(`about.data_principles_items.${i}.desc`)}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-center text-muted-foreground mt-8 max-w-2xl mx-auto">
              {t("about.data_quote")}
            </p>
          </div>
        </div>
      </section>

      <section id="how-we-work" className="py-16 md:py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-5xl font-bold text-foreground mb-12">
            {t("about.work_title")}
          </h2>

          <div className="space-y-8">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary">
                  <span className="font-serif text-3xl font-bold text-primary">
                    0{i + 1}
                  </span>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-3">
                    {t(`about.work_steps.${i}.title`)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {t(`about.work_steps.${i}.desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 border-t border-border bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-5xl font-bold text-foreground mb-6">
            {t("about.cta_title")}
          </h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            {t("about.cta_desc")}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            {t("about.cta_btn")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
