"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArticleCard } from "@/components/cards";
import api from "@/lib/api";

export default function BulletinPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await api.get(
          `/articles?limit=12&published=true&type=${encodeURIComponent("ACRC's Bulletin")}`,
        );
        const publishedArticles = res.data.filter(
          (article: any) => article.published,
        );
        setArticles(publishedArticles);
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
              href="/insights"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Publications
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">ACRC's Bulletin</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">
            ACRC's Bulletin
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl leading-relaxed">
            ACRC Bulletin is a monthly publication series that tracks key
            developments and turning points across three focus areas: ACRC
            Defense and Security Bulletin, ACRC Economic and Business Bulletin,
            and ACRC Bulletin on Politics and Social Issues. Each edition
            curates the most relevant issues of the month, explains why they
            matter, and offers a structured reading of trends, actors, and
            likely implications—so readers can follow fast-moving debates
            without losing the bigger picture. Each bulletin is published at
            least once a month and is intended for policymakers, business
            leaders, researchers, journalists, and the wider public who need
            clear, evidence-based analysis they can use. Bulletins may be
            published in Bahasa Indonesia and English.
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              [...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-slate-200 dark:bg-slate-800 rounded-xl h-64 border border-border"
                ></div>
              ))
            ) : articles.length > 0 ? (
              articles.map((article) => (
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
                No publications available.
              </p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
