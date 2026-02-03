"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PublicComments } from "@/components/public-comments";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";

interface ArticleDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Mock article data
const articleData: Record<string, any> = {
  "1": {
    title:
      "Indonesia's 2025 Defence Spending: Strategic Priorities and Fiscal Constraints",
    author: "Dr. Budi Santoso",
    date: "January 24, 2025",
    category: "Defence & Security",
    type: "Report",
    readTime: "8 min read",
    content: `
      <p>Indonesia's defence spending remains a critical indicator of strategic priorities and fiscal capacity.</p>
      <h2>Budget Overview</h2>
      <p>The 2025 defence budget allocation stands at approximately 2.3% of government expenditure.</p>
    `,
    excerpt:
      "Analysis of Indonesia's defence budget allocation, strategic priorities, and implications for regional security frameworks.",
  },
  "2": {
    title:
      "Digital Economy Regulation: Balancing Innovation and Consumer Protection",
    author: "Dr. Siti Nurhaliza",
    date: "January 20, 2025",
    category: "Economy & Business",
    type: "Article",
    readTime: "6 min read",
    content: `
      <p>Indonesia's digital economy has experienced explosive growth.</p>
    `,
    excerpt:
      "Examining the regulatory framework for Indonesia's digital economy sector and its impact on startup ecosystem growth.",
  },
};

export default function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  // ✅ WAJIB: unwrap params (INI KUNCI FIX)
  const { id } = React.use(params);

  const article = articleData[id as keyof typeof articleData];

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">
            Sorry, the article you're looking for doesn't exist.
          </p>
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-primary font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Insights
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Article Header */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12 md:py-16 border-b border-border">
        <div className="max-w-3xl mx-auto px-4">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-primary font-medium mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Insights
          </Link>

          <div className="flex gap-2 mb-4">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
              {article.type}
            </span>
            <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-semibold">
              {article.category}
            </span>
          </div>

          <h1 className="font-serif text-5xl font-bold mb-8">
            {article.title}
          </h1>

          <div className="flex gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {article.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {article.date}
            </span>
            <span className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              {article.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 prose prose-invert max-w-none">
          <article
            dangerouslySetInnerHTML={{
              __html: article.content
                .replace(/<h2>/g, '<h2 class="text-2xl font-bold mt-8 mb-4">')
                .replace(/<p>/g, '<p class="text-base leading-relaxed">')
                .replace(
                  /<ul>/g,
                  '<ul class="list-disc list-inside space-y-2 ml-4">',
                )
                .replace(
                  /<ol>/g,
                  '<ol class="list-decimal list-inside space-y-2 ml-4">',
                )
                .replace(/<li>/g, '<li class="text-base">'),
            }}
          />
        </div>
      </section>

      {/* Comments */}
      <PublicComments articleTitle={article.title} />

      {/* Related Articles */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-serif text-4xl font-bold mb-10">
            Related Insights
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(articleData)
              .filter(([articleId]) => articleId !== id)
              .slice(0, 3)
              .map(([articleId, data]) => (
                <Link key={articleId} href={`/insights/${articleId}`}>
                  <div className="p-6 rounded-lg border bg-card hover:shadow-md transition-all">
                    <h3 className="font-bold mb-2">{data.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {data.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
