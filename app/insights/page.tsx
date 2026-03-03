"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  ArrowRight,
  X,
  Loader2,
  FileText,
  Shield,
  Landmark,
  TrendingUp,
  Vote,
  Leaf,
  AlertCircle,
} from "lucide-react";
import { useLocale } from "@/contexts/locale-context";
import api from "@/lib/api";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  type: string;
  created_at: string;
  author: string;
}

function formatDate(dateString: string, locale: "en" | "id") {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function InsightsContent() {
  const { t, locale } = useLocale();
  const searchParams = useSearchParams();
  const urlType = searchParams.get("type");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");

  const allLabel = locale === "id" ? "Semua" : "All";

  useEffect(() => {
    fetchArticles();
  }, [urlType]);

  const fetchArticles = async () => {
    try {
      setLoading(true);

      let dbType = "";
      if (urlType === "article") dbType = "ACRC Commentaries";
      else if (urlType === "report") dbType = "ACRC's Working Paper";
      else if (urlType === "event") dbType = "Events & Presentations";
      else if (urlType === "bulletin") dbType = "ACRC's Bulletin";

      let endpoint = "/articles?published=true";
      if (dbType) {
        endpoint += `&type=${encodeURIComponent(dbType)}`;
      }

      const response = await api.get(endpoint);
      setArticles(response.data);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Reset selected category when locale changes
  useEffect(() => {
    setSelectedCategory(allLabel);
  }, [locale, allLabel]);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(articles.map((a) => a.category)));
    return [allLabel, ...unique];
  }, [articles, allLabel]);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      // category filter
      if (
        selectedCategory !== allLabel &&
        selectedCategory !== "All" &&
        selectedCategory !== "Semua" &&
        article.category !== selectedCategory
      ) {
        return false;
      }

      // date filter
      if (selectedDate) {
        const articleDate = new Date(article.created_at)
          .toISOString()
          .split("T")[0];
        if (articleDate !== selectedDate) return false;
      }

      return true;
    });
  }, [articles, selectedCategory, selectedDate, allLabel]);

  const priorityAreas = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Defence & Security",
      description:
        "Escalating geopolitical tensions in the South China Sea and their implications for Indonesia's foreign policy positioning and defence posture.",
      urgency: "High",
      category: "Defence & Security",
      href: "/issues/defence-security",
    },
    {
      icon: <Landmark className="w-6 h-6" />,
      title: "Politics & Governance",
      description:
        "Governance arrangements and institutional frameworks for Nusantara, Indonesia's new capital city, and implications for regional development.",
      urgency: "Medium",
      category: "Politics & Governance",
      href: "/issues/politics-governance",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Economy & Business",
      description:
        "The evolving regulatory landscape for Indonesia's digital economy and its impact on innovation, competition, and consumer protection.",
      urgency: "High",
      category: "Economy & Business",
      href: "/issues/economy-business",
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "ESG & Sustainability",
      description:
        "Political economy challenges in Indonesia's transition to renewable energy and achievement of net-zero commitments.",
      urgency: "High",
      category: "ESG & Sustainability",
      href: "/issues/esg-sustainability",
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: "Elections & Democracy",
      description:
        "Safeguarding electoral integrity and democratic participation ahead of future electoral cycles.",
      urgency: "Medium",
      category: "Elections & Democracy",
      href: "/issues/elections-democracy",
    },
  ];

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
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center text-muted-foreground">
              <Loader2 className="w-12 h-12 animate-spin mb-4 text-primary" />
              <p className="text-lg font-medium">
                {t("insights_page.loading") || "Loading publications..."}
              </p>
            </div>
          ) : (
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
                          {formatDate(article.created_at, locale)}
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

              {filteredArticles.length === 0 && (
                <div className="text-center py-12 flex flex-col items-center">
                  <FileText className="w-16 h-16 text-muted-foreground opacity-20 mb-4" />
                  <p className="text-muted-foreground">
                    {t("insights_page.filters.no_articles")}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Current Priority Areas */}
      <section className="py-16 md:py-24 border-b border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
                Current Priority Areas
              </h2>
              <p className="text-lg text-muted-foreground">
                Our active monitoring and research currently prioritize these
                interconnected domains, where policy decisions have the most
                significant impact on Indonesia's trajectory.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {priorityAreas.map((area, index) => (
              <div
                key={index}
                className="p-8 rounded-lg border border-border bg-card hover:shadow-md hover:border-primary/40 transition-all group flex flex-col h-full bg-background"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform flex-shrink-0">
                    {area.icon}
                  </div>
                  <div className="flex flex-col items-end gap-2 text-right">
                    <span className="text-[10px] font-bold px-2.5 py-1 bg-muted text-muted-foreground rounded-full uppercase tracking-wider">
                      {area.category}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        area.urgency === "High"
                          ? "bg-red-500/10 text-red-600 dark:text-red-400"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      {area.urgency} Priority
                    </span>
                  </div>
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {area.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed flex-1 mb-6">
                  {area.description}
                </p>
                <div className="mt-auto">
                  <Link
                    href={area.href}
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
                  >
                    Explore
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function InsightsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      }
    >
      <InsightsContent />
    </Suspense>
  );
}
