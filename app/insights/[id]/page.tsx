"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PublicComments } from "@/components/public-comments";
import { ArrowLeft, Calendar, FileText, Download } from "lucide-react";
import { articlesData } from "@/lib/articles";
import { useLocale } from "@/contexts/locale-context";

interface ArticleDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const { id } = React.use(params);
  const { t, locale } = useLocale();

  const article = articlesData.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-bold mb-4">
            {locale === "id" ? "Artikel Tidak Ditemukan" : "Article Not Found"}
          </h1>
          <p className="text-muted-foreground mb-8">
            {locale === "id"
              ? "Maaf, artikel yang Anda cari tidak ada."
              : "Sorry, the article you're looking for doesn't exist."}
          </p>
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-primary font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            {locale === "id" ? "Kembali ke Insights" : "Back to Insights"}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const translatedTitle = t(`articles.${article.id}.title`);
  const translatedExcerpt = t(`articles.${article.id}.excerpt`);
  const translatedCategory = t(`articles.${article.id}.category`);

  const formattedDate = new Intl.DateTimeFormat(
    locale === "id" ? "id-ID" : "en-GB",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  ).format(new Date(article.date));

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
            {locale === "id" ? "Kembali ke Insights" : "Back to Insights"}
          </Link>

          <div className="flex gap-2 mb-4">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
              PDF
            </span>
            <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-semibold">
              {translatedCategory}
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-5xl font-bold mb-8 leading-tight">
            {translatedTitle}
          </h1>

          <div className="flex gap-6 text-sm text-muted-foreground mb-8">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {formattedDate}
            </span>
          </div>

          {/* PDF Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={`/artikel/${article.pdfFile}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <FileText className="w-4 h-4" />
              {locale === "id" ? "Baca PDF Lengkap" : "Read Full PDF"}
            </a>
            <a
              href={`/artikel/${article.pdfFile}`}
              download
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border bg-background hover:bg-muted text-foreground rounded-lg font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              {locale === "id" ? "Unduh PDF" : "Download PDF"}
            </a>
          </div>
        </div>
      </section>

      {/* Article Content / Abstract */}
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 prose prose-invert max-w-none">
          <div className="p-6 bg-muted/30 rounded-lg border border-border">
            <h3 className="text-xl font-bold mb-3 mt-0">
              {locale === "id" ? "Abstrak / Ringkasan:" : "Abstract / Summary:"}
            </h3>
            <p className="leading-relaxed text-muted-foreground">
              {translatedExcerpt}
            </p>
            <div className="mt-6 text-sm text-muted-foreground">
              {locale === "id" ? (
                <p>
                  Silakan unduh atau buka file PDF di atas untuk membaca
                  analisis lengkap artikel ini.
                </p>
              ) : (
                <p>
                  Please download or open the PDF file above to read the full
                  analysis of this article.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Comments */}
      <PublicComments articleTitle={translatedTitle} />

      {/* Related Articles */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-serif text-3xl font-bold mb-10">
            {locale === "id" ? "Insight Terkait" : "Related Insights"}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {articlesData
              .filter((a) => a.id !== id)
              .slice(0, 3)
              .map((a) => {
                const title = t(`articles.${a.id}.title`);
                const excerpt = t(`articles.${a.id}.excerpt`); // Using excerpt as subtext
                return (
                  <Link key={a.id} href={`/insights/${a.id}`}>
                    <div className="p-6 rounded-lg border bg-card hover:shadow-md transition-all h-full flex flex-col">
                      <h3 className="font-bold mb-2 text-lg line-clamp-2">
                        {title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {excerpt}
                      </p>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
