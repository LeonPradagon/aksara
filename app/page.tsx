"use client";

import {
  ArrowRight,
  TrendingUp,
  Users,
  Globe,
  Shield,
  Landmark,
  Vote,
  Leaf,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArticleCard, SectorCard } from "@/components/cards";
import { NavLink } from "@/components/nav-link";
import { TestimonialsSection } from "@/components/testimonials-section";
import { useState, useEffect } from "react";
import { useLocale } from "@/contexts/locale-context";

export default function HomePage() {
  const { t } = useLocale();
  const slides = ["/picture/home.jpeg", "/picture/home-2.jpeg"];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [latestArticles, setLatestArticles] = useState<any[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    async function fetchLatest() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5342/api"}/articles?limit=3&published=true`,
        );
        if (response.ok) {
          const data = await response.json();
          setLatestArticles(data);
        }
      } catch (err) {
        console.error("Failed to fetch latest articles:", err);
      } finally {
        setLoadingArticles(false);
      }
    }
    fetchLatest();
  }, []);

  const [concernArticles, setConcernArticles] = useState<any[]>([]);
  const [loadingConcern, setLoadingConcern] = useState(true);

  useEffect(() => {
    async function fetchConcern() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5342/api"}/articles?limit=6&published=true&type=${encodeURIComponent("ACRC's Concern")}`,
        );
        if (response.ok) {
          const data = await response.json();
          setConcernArticles(data);
        }
      } catch (err) {
        console.error("Failed to fetch concern articles:", err);
      } finally {
        setLoadingConcern(false);
      }
    }
    fetchConcern();
  }, []);

  const issuesWeWorkOn = [
    {
      title: t("nav.issues_defence"),
      href: "/issues/defence-security",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      title: t("nav.issues_politics"),
      href: "/issues/politics-governance",
      icon: <Landmark className="w-5 h-5" />,
    },
    {
      title: t("nav.issues_economy"),
      href: "/issues/economy-business",
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      title: t("nav.issues_elections"),
      href: "/issues/elections-democracy",
      icon: <Vote className="w-5 h-5" />,
    },
    {
      title: t("nav.issues_esg"),
      href: "/issues/esg-sustainability",
      icon: <Leaf className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="py-8 md:py-12 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-3xl md:text-4xl text-primary font-bold mb-4">
                Aksara Cakra Research and Consulting (ACRC)
              </p>

              <h1 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-8 leading-tight">
                {t("home.hero_title")}
              </h1>

              <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-3xl">
                {t("home.hero_desc")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <NavLink
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded hover:opacity-90 transition-opacity"
                >
                  {t("home.hero_btn_services")}
                  <ArrowRight className="w-4 h-4" />
                </NavLink>

                <NavLink
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary font-semibold rounded hover:bg-primary/5 transition-colors"
                >
                  {t("home.hero_btn_contact")}
                </NavLink>
              </div>
            </div>

            {/* CAROUSEL CONTAINER */}
            <div className="relative w-full aspect-[3/2] rounded-lg border border-border overflow-hidden bg-muted group">
              {/* Render Gambar */}
              {slides.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Hero Slide ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}

              {/* Indikator Dots (Navigasi Manual) */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentSlide
                        ? "w-8 bg-white"
                        : "w-2 bg-white/50 hover:bg-white"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Opsional: Overlay Gelap sedikit agar teks di luar lebih fokus (bisa dihapus jika tidak perlu) */}
              <div className="absolute inset-0 bg-black/5 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Publications / ACRC's Concern */}
      <section className="py-16 md:py-24 border-b border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="font-serif text-5xl font-bold text-foreground mb-6">
              {t("home.concern_title")}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("home.concern_desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loadingConcern ? (
              [...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-slate-200 dark:bg-slate-800 rounded-xl h-64 border border-border"
                ></div>
              ))
            ) : concernArticles.length > 0 ? (
              concernArticles.map((article, index) => (
                <ArticleCard
                  key={article.id}
                  title={article.title}
                  excerpt={article.excerpt}
                  date={new Date(
                    article.published_at || article.created_at,
                  ).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                  category={article.category}
                  href={`/insights/${article.slug}`}
                  // We can make the first one featured if desired. Here we just map them identically.
                  featured={false}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-muted-foreground py-10">
                No recent publications available.
              </p>
            )}
          </div>
          <div className="mt-10 text-center">
            <NavLink
              href="/insights/concern"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded hover:opacity-90 transition-opacity"
            >
              {t("home.concern_btn")}
              <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-5xl font-bold text-foreground mb-8">
            {t("home.who_title")}
          </h2>
          <div className="max-w-4xl">
            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
              {t("home.who_desc")}
            </p>
            <NavLink
              href="/about"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              {t("home.who_btn")}
              <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>
        </div>
      </section>

      {/* Three Core Pillars */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-5xl font-bold text-foreground mb-12 text-center">
            {t("home.pillars_title")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-lg border border-border bg-card hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-4">
                {t("home.pillar_policy_title")}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("home.pillar_policy_desc")}
              </p>
            </div>
            <div className="p-8 rounded-lg border border-border bg-card hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-4">
                {t("home.pillar_corporate_title")}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("home.pillar_corporate_desc")}
              </p>
            </div>
            <div className="p-8 rounded-lg border border-border bg-card hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-4">
                {t("home.pillar_political_title")}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("home.pillar_political_desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Issues We Work On */}
      <section className="py-16 md:py-24 border-b border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="font-serif text-5xl font-bold text-foreground mb-4">
              {t("home.issues_title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {t("home.issues_desc")}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            {issuesWeWorkOn.map((issue) => (
              <NavLink
                key={issue.title}
                href={issue.href}
                className="inline-flex items-center gap-3 px-5 py-3 bg-card border border-border rounded-lg hover:border-primary hover:shadow-md transition-all group"
              >
                <span className="text-primary group-hover:scale-110 transition-transform">
                  {issue.icon}
                </span>
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {issue.title}
                </span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </NavLink>
            ))}
          </div>

          <div className="mt-8">
            <NavLink
              href="/issues"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              {t("home.issues_view_all")}
              <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>
        </div>
      </section>

      {/* Key Issues & Sectors */}
      {/* <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-serif text-5xl font-bold text-foreground">
                Issues & Sectors
              </h2>
              <p className="text-muted-foreground mt-3 text-lg">
                Strategic focus areas
              </p>
            </div>
            <NavLink
              href="/issues"
              className="hidden md:inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SectorCard
              title="Defence & Security"
              description="Analysis of defence policy, security threats, and strategic implications for national and regional security."
            />
            <SectorCard
              title="Politics & Governance"
              description="Deep dive into political dynamics, institutional effectiveness, and governance reform initiatives."
            />
            <SectorCard
              title="Economy & Business"
              description="Economic trends, business regulation, and competitiveness factors shaping Indonesia's economic future."
            />
            <SectorCard
              title="Elections & Democracy"
              description="Electoral processes, democratic institutions, and political participation across Indonesia."
            />
            <SectorCard
              title="ESG & Sustainability"
              description="Environmental, social, and governance considerations in corporate strategy and policy."
            />
            <SectorCard
              title="Emerging Issues"
              description="Cross-cutting themes including digital transformation, inequality, and global trends."
            />
          </div>

          <div className="mt-10 flex justify-center md:hidden">
            <NavLink
              href="/issues"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              View All Issues & Sectors
              <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>
        </div>
      </section> */}

      {/* Latest Insights */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-serif text-5xl font-bold text-foreground">
                {t("home.insights_title")}
              </h2>
              <p className="text-muted-foreground mt-3 text-lg">
                {t("home.insights_subtitle")}
              </p>
            </div>
            <NavLink
              href="/insights"
              className="hidden md:inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              {t("home.insights_view_all")}
              <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loadingArticles ? (
              [...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-slate-100 dark:bg-slate-800 rounded-xl h-64"
                ></div>
              ))
            ) : latestArticles.length > 0 ? (
              latestArticles.map((article, index) => (
                <ArticleCard
                  key={article.id}
                  title={article.title}
                  excerpt={article.excerpt}
                  date={new Date(
                    article.published_at || article.created_at,
                  ).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                  category={article.category}
                  href={`/insights/${article.slug}`}
                  featured={index === 0}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-muted-foreground py-10">
                No recent insights available.
              </p>
            )}
          </div>

          <div className="mt-10 flex justify-center md:hidden">
            <NavLink
              href="/insights"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              {t("home.insights_view_all")}
              <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>
        </div>
      </section>

      {/* <TestimonialsSection /> */}

      {/* Career Section */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="font-serif text-5xl font-bold text-foreground mb-6">
              {t("careers.title")}
            </h2>
          </div>
          <div className="bg-card border border-border rounded-xl p-8 lg:p-12 shadow-sm">
            <h3 className="font-serif text-3xl font-semibold mb-6">
              {t("careers.internship_title")}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 whitespace-pre-wrap">
              {t("careers.internship_desc")}
            </p>
            <NavLink
              href="/careers"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded hover:opacity-90 transition-opacity"
            >
              Learn More
              <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 border-b border-border bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-5xl font-bold text-foreground mb-6">
            {t("home.cta_title")}
          </h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            {t("home.cta_desc")}
          </p>
          <NavLink
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded hover:opacity-90 transition-opacity"
          >
            {t("home.cta_btn")}
            <ArrowRight className="w-4 h-4" />
          </NavLink>
        </div>
      </section>

      <Footer />
    </div>
  );
}
