"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArrowRight, X } from "lucide-react";

// =====================
// Articles data
// =====================
const articles = [
  {
    id: "1",
    title:
      "Indonesia's 2025 Defence Spending: Strategic Priorities and Fiscal Constraints",
    excerpt:
      "Analysis of Indonesia's defence budget allocation, strategic priorities, and implications for regional security frameworks.",
    date: "Jan 24, 2025",
    category: "Defence",
  },
  {
    id: "2",
    title:
      "Digital Economy Regulation: Balancing Innovation and Consumer Protection",
    excerpt:
      "Examining the regulatory framework for Indonesia's digital economy sector and its impact on startup ecosystem growth.",
    date: "Jan 20, 2025",
    category: "Economy",
  },
  {
    id: "3",
    title: "Maritime Security and Regional Stability in Southeast Asia",
    excerpt:
      "Analysis of maritime boundary disputes, naval modernization, and implications for Indonesia's strategic interests.",
    date: "Jan 18, 2025",
    category: "Defence",
  },
  {
    id: "4",
    title: "Green Finance and Climate Investment in Indonesia",
    excerpt:
      "Exploring the role of green finance in funding Indonesia's climate commitments and sustainable development goals.",
    date: "Jan 10, 2025",
    category: "ESG",
  },
  {
    id: "5",
    title: "Local Elections 2024: Voter Behaviour and Campaign Dynamics",
    excerpt:
      "Analysis of voting patterns, campaign strategies, and democratic participation in regional elections.",
    date: "Jan 8, 2025",
    category: "Elections",
  },
  {
    id: "6",
    title: "Bureaucratic Reform and Public Service Delivery",
    excerpt:
      "Assessment of administrative capacity improvements and challenges in delivering quality public services.",
    date: "Jan 5, 2025",
    category: "Politics",
  },
];

const categories = [
  "All",
  "Defence",
  "Politics",
  "Economy",
  "Elections",
  "ESG",
];

// =====================
// Helper: SAFE date comparison
// =====================
const isSameDate = (articleDate: string, selectedDate: string) => {
  const d = new Date(articleDate);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}` === selectedDate;
};

// =====================
// Page Component
// =====================
export default function InsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");

  const filteredArticles = articles.filter((article) => {
    // category filter
    if (selectedCategory !== "All" && article.category !== selectedCategory) {
      return false;
    }

    // single date filter (timezone-safe)
    if (selectedDate && !isSameDate(article.date, selectedDate)) {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ================= Hero ================= */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-6xl md:text-7xl font-bold text-foreground mb-6">
            Insights from ACRC
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl leading-relaxed">
            Articles and policy analysis to understand key developments
            affecting Indonesia.
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
                Filter by Category
              </p>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === cat
                        ? "bg-foreground text-background"
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
                Filter by Date
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
                    Reset
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
                    <p className="text-muted-foreground leading-relaxed">
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
                No articles found for the selected filters.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
