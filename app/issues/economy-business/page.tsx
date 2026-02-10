"use client";

import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArticleCard } from "@/components/cards";
import { ArrowRight, ArrowLeft, TrendingUp } from "lucide-react";

const relatedInsights = [
  {
    title: "Macroeconomic Outlook and Fiscal Policy Challenges in Indonesia",
    excerpt:
      "Analysis of Indonesia’s macroeconomic trends, fiscal sustainability, and policy trade-offs amid global uncertainty.",
    date: "Jan 20, 2025",
    category: "Economy",
    href: "/insights/article-1",
  },
  {
    title:
      "Investment Climate Reform: Regulatory Barriers and Policy Responses",
    excerpt:
      "Assessment of regulatory constraints, licensing reforms, and their impact on domestic and foreign investment.",
    date: "Dec 10, 2024",
    category: "Business",
    href: "/insights/article-2",
  },
  {
    title: "Sectoral and Regional Development Opportunities in Indonesia",
    excerpt:
      "Examining growth opportunities across key sectors and regions, including infrastructure, manufacturing, and emerging regional hubs.",
    date: "Nov 25, 2024",
    category: "Economy",
    href: "/insights/article-3",
  },
];

export default function EconomyBusinessPage() {
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
              Related Insights
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
            {relatedInsights.map((insight, i) => (
              <ArticleCard key={i} {...insight} />
            ))}
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
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-foreground text-foreground font-semibold rounded hover:bg-muted transition-colors"
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
