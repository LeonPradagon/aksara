"use client";

import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArticleCard } from "@/components/cards";
import { ArrowRight, ArrowLeft, Shield } from "lucide-react";

const relatedInsights = [
  {
    title: "Indonesia's Defence Modernization: Capabilities and Strategic Gaps",
    excerpt:
      "An assessment of Indonesia’s defence modernization efforts, capability development priorities, and strategic challenges.",
    date: "Jan 24, 2025",
    category: "Defence",
    href: "/insights/article-1",
  },
  {
    title: "Maritime and Border Security in Indonesia’s Archipelagic State",
    excerpt:
      "Examining Indonesia’s maritime and border security challenges, including sea lane protection and territorial integrity.",
    date: "Dec 15, 2024",
    category: "Security",
    href: "/insights/article-2",
  },
  {
    title: "Strengthening Indonesia’s Domestic Defence Industry",
    excerpt:
      "Analysis of defence industrial policy, procurement strategies, and the development of domestic defence manufacturing.",
    date: "Nov 20, 2024",
    category: "Defence",
    href: "/insights/article-3",
  },
];

export default function DefenceSecurityPage() {
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
            <span className="text-foreground">Defence & Security</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary" />
            </div>
          </div>

          <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">
            Defence & Security
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            In-depth analysis of Indonesia’s defence modernization, maritime and
            border security challenges, and the development of the domestic
            defence industry to support national strategic autonomy.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-serif text-4xl font-bold text-foreground mb-6">
                Strategic Defence and Security Analysis
              </h2>

              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Indonesia’s security environment is increasingly shaped by the
                need for effective defence modernization, secure maritime and
                border management, and a resilient domestic defence industry.
                ACRC provides rigorous, policy-oriented analysis to support
                strategic decision-making in these critical areas.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Our research focuses on aligning military capability development
                with strategic priorities, strengthening maritime and border
                security governance, and advancing domestic defence industry
                capacity to enhance national resilience and strategic autonomy.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="font-serif text-2xl font-bold text-foreground">
                Key Focus Areas
              </h3>

              <ul className="space-y-4">
                {[
                  "Defence modernization and capability development",
                  "Maritime security and sea lane protection",
                  "Border security and territorial integrity",
                  "Domestic defence industry development",
                  "Defence industrial policy and procurement",
                  "Strategic autonomy and national resilience",
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
              href="/insights?category=Defence"
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
            Need Defence & Security Analysis?
          </h2>

          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Partner with ACRC for rigorous analysis on defence modernization,
            maritime and border security, and domestic defence industry
            development.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background font-semibold rounded hover:opacity-90 transition-opacity"
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
