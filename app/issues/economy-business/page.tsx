"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArticleCard } from "@/components/cards";
import api from "@/lib/api";
import { ArrowRight, ArrowLeft, TrendingUp } from "lucide-react";

export default function EconomyBusinessPage() {
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await api.get("/articles", {
          params: { limit: 3, published: true, category: "Economy & Business" },
        });
        const publishedArticles = res.data.filter(
          (article: any) => article.published,
        );
        setRelatedArticles(publishedArticles.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link
              href="/issues"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Issues & Sectors
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">Economy & Business</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
          </div>

          <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">
            Economy & Business
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Analysis of macroeconomic trends and fiscal policy, investment
            climate and regulatory barriers, and sectoral and regional
            development opportunities shaping Indonesia’s economic trajectory.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-serif text-4xl font-bold text-foreground mb-6">
                Understanding Indonesia’s Economic Landscape
              </h2>

              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Indonesia’s economic performance is shaped by evolving
                macroeconomic conditions, fiscal policy choices, and structural
                reforms aimed at improving competitiveness. ACRC provides
                policy-oriented analysis to support informed decision-making in
                this dynamic environment.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Our research assesses how regulatory barriers affect investment,
                and identifies sectoral and regional development opportunities
                that can drive inclusive and sustainable economic growth.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="font-serif text-2xl font-bold text-foreground">
                Key Focus Areas
              </h3>

              <ul className="space-y-4">
                {[
                  "Macroeconomic trends and fiscal policy analysis",
                  "Public finance sustainability and budget priorities",
                  "Investment climate and regulatory barriers",
                  "Business regulation and market entry constraints",
                  "Sectoral growth opportunities and industrial development",
                  "Regional development and economic disparities",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Insights */}
      <section className="py-16 md:py-24 border-b border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <h2 className="font-serif text-4xl font-bold text-foreground">
              Related Publications
            </h2>
            <Link
              href="/insights?category=Economy"
              className="hidden md:inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? (
              [...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-slate-200 dark:bg-slate-800 rounded-xl h-64 border border-border"
                ></div>
              ))
            ) : relatedArticles.length > 0 ? (
              relatedArticles.map((article, i) => (
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
                No related publications available yet.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl font-bold text-foreground mb-6">
            Need Economic & Business Analysis?
          </h2>

          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Partner with ACRC for rigorous analysis of macroeconomic trends,
            investment barriers, and sectoral and regional development
            opportunities.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded hover:opacity-90 transition-opacity"
            >
              Start a Conversation
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/issues"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary font-semibold rounded hover:bg-primary/5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Issues
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
