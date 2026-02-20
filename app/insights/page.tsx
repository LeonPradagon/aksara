"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArrowRight, X } from "lucide-react";
import { useLocale } from "@/contexts/locale-context";

import { articlesData } from "@/lib/articles";

function formatDate(dateString: string, locale: "en" | "id") {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

const isSameDate = (articleDate: string, selectedDate: string) => {
  return articleDate === selectedDate;
};

export default function InsightsPage() {
  const { t, locale } = useLocale();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");

  const allLabel = locale === "id" ? "Semua" : "All";

  // Derive articles with translated content
  const articles = useMemo(() => {
    return articlesData.map((item) => ({
      id: item.id,
      rawDate: item.date,
      date: formatDate(item.date, locale),
      title: t(`articles.${item.id}.title`),
      excerpt: t(`articles.${item.id}.excerpt`),
      category: t(`articles.${item.id}.category`),
    }));
  }, [t, locale]);

  // Derive unique categories from translated articles
  const categories = useMemo(() => {
    const unique = Array.from(new Set(articles.map((a) => a.category)));
    return [allLabel, ...unique];
  }, [articles, allLabel]);

  // Reset selected category when locale changes to avoid mismatched filters
  useEffect(() => {
    setSelectedCategory(allLabel);
  }, [locale, allLabel]);

  const filteredArticles = articles.filter((article) => {
    // category filter
    if (
      selectedCategory !== allLabel &&
      selectedCategory !== "All" &&
      selectedCategory !== "Semua" &&
      article.category !== selectedCategory
    ) {
      return false;
    }

    // single date filter
    if (selectedDate && !isSameDate(article.rawDate, selectedDate)) {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-6xl md:text-7xl font-bold text-foreground mb-6">
            {t("insights_page.title")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl leading-relaxed">
            {t("insights_page.subtitle")}
          </p>
        </div>
      </section>

      {/* ================= Filters ================= */}
      <section className="py-10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            {/* Category */}
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-3">
                {t("insights_page.filters.category")}
              </p>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === cat
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Date + Reset */}
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-3">
                {t("insights_page.filters.date")}
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-border bg-background text-sm"
                />
                {selectedDate && (
                  <button
                    onClick={() => setSelectedDate("")}
                    className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg border border-border text-muted-foreground hover:bg-muted transition-colors"
                    aria-label="Reset date"
                  >
                    <X className="w-4 h-4" />
                    {t("insights_page.filters.reset")}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Articles ================= */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {filteredArticles.map((article) => (
              <Link
                key={article.id}
                href={`/insights/${article.id}`}
                className="block p-6 rounded-lg border border-border bg-card hover:shadow-md hover:border-primary/30 transition-all group"
              >
                <div className="flex flex-col md:flex-row md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded">
                        {article.category}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {article.date}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors mt-1" />
                </div>
              </Link>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {t("insights_page.filters.no_articles")}
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
