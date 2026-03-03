"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArticleCard } from "@/components/cards";
import { NavLink } from "@/components/nav-link";
import api from "@/lib/api";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/contexts/locale-context";

export default function ConcernPage() {
  const { t } = useLocale();
  const [concernArticles, setConcernArticles] = useState<any[]>([]);
  const [loadingConcern, setLoadingConcern] = useState(true);

  useEffect(() => {
    const fetchConcernArticles = async () => {
      try {
        const res = await api.get(
          `/articles?limit=6&published=true&type=${encodeURIComponent("ACRC's Concern")}`,
        );
        const publishedArticles = res.data.filter(
          (article: any) => article.published,
        );
        setConcernArticles(publishedArticles.slice(0, 6));
      } catch (error) {
        console.error("Failed to fetch concern articles:", error);
      } finally {
        setLoadingConcern(false);
      }
    };
    fetchConcernArticles();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link
              href="/insights"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Publications
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">ACRC's Concern</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">
            ACRC's Concern
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Key issues and emerging trends that ACRC is monitoring and
            researching. These represent the policy challenges and developments
            that we believe deserve attention from decision-makers.
          </p>
        </div>
      </section>

      {/* Current Concerns */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl font-bold text-foreground mb-12">
            Publications
          </h2>

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
                  href={`/insights/${article.slug || article.id}`}
                  featured={false}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-muted-foreground py-10">
                No recent publications available.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 md:py-24 border-b border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-serif text-4xl font-bold text-foreground mb-6">
                How We Identify Concerns
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                ACRC continuously monitors political, economic, and social
                developments across Indonesia and the region. Our concern
                identification process combines:
              </p>
              <ul className="space-y-4">
                {[
                  "Systematic media and policy monitoring",
                  "Expert consultations and stakeholder engagement",
                  "Data analysis and trend identification",
                  "Comparative analysis with regional developments",
                  "Assessment of policy impact and implementation challenges",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-10 rounded-lg border border-border bg-card">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-6">
                Request a Briefing
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                ACRC offers customized briefings on current concerns for
                government agencies, businesses, and organizations seeking to
                understand emerging policy challenges.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded hover:opacity-90 transition-opacity"
              >
                Request Briefing
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl font-bold text-foreground mb-6">
            Stay Informed
          </h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Explore our latest articles, reports, and analysis on the issues
            that matter most.
          </p>
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded hover:opacity-90 transition-opacity"
          >
            Browse All Publications
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
