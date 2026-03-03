"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArticleCard } from "@/components/cards";
import api from "@/lib/api";

export default function WorkingPaperPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await api.get(
          `/articles?limit=12&published=true&type=${encodeURIComponent("ACRC's Working Paper")}`,
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
            <span className="text-foreground">ACRC's Working Paper</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">
            ACRC's Working Paper
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl leading-relaxed">
            ACRC Working Paper is a series for presenting research in progress
            and early-stage findings. It provides space for researchers to
            develop arguments, share data and methods, and test interpretations
            before they are refined into final publications. The aim is to
            encourage careful thinking, invite constructive critique, and
            strengthen the quality of future work. ACRC Working Papers may be
            published in Bahasa Indonesia and English to reach a broad community
            of readers, including scholars, practitioners, and students. The
            views expressed in each paper are those of the author(s) alone and
            do not necessarily reflect the official position of ACRC or any
            institution with which the author(s) may be affiliated.
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
