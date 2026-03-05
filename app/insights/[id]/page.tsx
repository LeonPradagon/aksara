"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PublicComments } from "@/components/public-comments";
import { ArrowLeft, Calendar, FileText, Download, Loader2 } from "lucide-react";
import { useLocale } from "@/contexts/locale-context";
import api from "@/lib/api";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  created_at: string;
  pdf_url?: string;
  author?: string;
}

interface ArticleDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const { id } = React.use(params);
  const { t, locale } = useLocale();
  const [article, setArticle] = React.useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = React.useState<Article[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const [articleRes, allArticlesRes] = await Promise.all([
        api.get(`/articles/${id}`),
        api.get("/articles"),
      ]);
      setArticle(articleRes.data);
      setRelatedArticles(
        allArticlesRes.data.filter((a: Article) => a.id !== id).slice(0, 3),
      );
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-24 flex flex-col items-center justify-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
          <p className="font-medium animate-pulse">
            Loading research publication...
          </p>
        </div>
        <Footer />
      </div>
    );
  }

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
            {locale === "id" ? "Kembali ke Publikasi" : "Back to Publications"}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const formattedDate = new Intl.DateTimeFormat(
    locale === "id" ? "id-ID" : "en-GB",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  ).format(new Date(article.created_at));

  const pdfLink = article.pdf_url
    ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5342/api"}${article.pdf_url}`
    : null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Article Header */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12 md:py-20 border-b border-border">
        <div className="max-w-3xl mx-auto px-4">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-primary font-medium mb-10 hover:-translate-x-1 transition-transform"
          >
            <ArrowLeft className="w-4 h-4" />
            {locale === "id" ? "Kembali ke Publikasi" : "Back to Publications"}
          </Link>

          <div className="flex gap-2 mb-6">
            {pdfLink && (
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
                PDF Publication
              </span>
            )}
            <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-bold uppercase tracking-wider">
              {article.category}
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight text-foreground">
            {article.title}
          </h1>

          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-10">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              {formattedDate}
            </span>
            {article.author && (
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                By {article.author}
              </span>
            )}
          </div>

          {/* PDF Action Buttons */}
          {pdfLink && (
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={pdfLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-100"
              >
                <FileText className="w-5 h-5" />
                {locale === "id" ? "Baca PDF Lengkap" : "Read Full PDF"}
              </a>
              <button
                onClick={async () => {
                  try {
                    const response = await fetch(pdfLink);
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.style.display = "none";
                    a.href = url;
                    // Extract filename from URL or use a default
                    const filename =
                      article.pdf_url?.split("/").pop() || "publication.pdf";
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                  } catch (error) {
                    console.error("Error downloading PDF:", error);
                  }
                }}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-border bg-background hover:bg-muted text-foreground rounded-2xl font-bold transition-all hover:scale-[1.02] active:scale-100"
              >
                <Download className="w-5 h-5" />
                {locale === "id" ? "Unduh PDF" : "Download PDF"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Article Content / Abstract */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <h3 className="text-2xl font-bold mb-8 text-foreground font-serif border-b border-border pb-4">
            {locale === "id"
              ? "Abstrak / Ringkasan Research"
              : "Research Abstract / Summary"}
          </h3>
          <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-wrap mb-10">
            {article.excerpt}
          </p>

          {article.content && (
            <div className="mt-12 pt-12 border-t border-border">
              <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-extra-relaxed">
                {article.content}
              </div>
            </div>
          )}

          {!article.content && pdfLink && (
            <div className="mt-8 p-8 bg-primary/5 rounded-3xl border border-primary/10 flex items-start gap-4">
              <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <p className="text-primary font-medium">
                {locale === "id"
                  ? "Analisis mendalam tersedia dalam format PDF. Silakan gunakan tombol di bagian atas halaman untuk mengakses dokumen lengkap."
                  : "The full in-depth analysis is available in PDF format. Please use the buttons at the top of the page to access the complete document."}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Comments */}
      <PublicComments articleId={article.id} articleTitle={article.title} />

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-20 md:py-32 bg-slate-50 dark:bg-slate-900/10 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {locale === "id"
                    ? "Publikasi Terkait"
                    : "Related Publications"}
                </h2>
                <div className="w-20 h-1 bg-primary rounded-full"></div>
              </div>
              <Link
                href="/insights"
                className="text-primary font-bold hover:underline hidden sm:block"
              >
                {locale === "id" ? "Lihat Semua" : "View All"} &rarr;
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedArticles.map((ra) => (
                <Link key={ra.id} href={`/insights/${ra.id}`} className="group">
                  <div className="p-8 rounded-3xl border border-border bg-card hover:shadow-2xl hover:-translate-y-2 transition-all h-full flex flex-col group">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-4 block">
                      {ra.category}
                    </span>
                    <h3 className="font-bold mb-4 text-xl group-hover:text-primary transition-colors line-clamp-2 font-serif text-foreground leading-snug">
                      {ra.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-6">
                      {ra.excerpt}
                    </p>
                    <div className="mt-auto pt-6 flex items-center text-xs font-bold text-primary group-hover:gap-2 transition-all">
                      READ ANALYSIS <ArrowLeft className="w-4 h-4 rotate-180" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
