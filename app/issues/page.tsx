"use client";

import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArticleCard } from "@/components/cards";
import {
  ArrowRight,
  Shield,
  Landmark,
  TrendingUp,
  Vote,
  Leaf,
} from "lucide-react";
import { useLocale } from "@/contexts/locale-context";

export default function IssuesPage() {
  const { t } = useLocale();

  // ================================
  // FEATURE FLAGS
  // ================================
  const SHOW_RELATED_INSIGHTS = false;

  const sectors = [
    {
      id: "defence-security",
      title: t("issues_page.sectors.defence_security.title"),
      icon: <Shield className="w-8 h-8" />,
      description: t("issues_page.sectors.defence_security.desc"),
      topics: [
        t("issues_page.sectors.defence_security.topics.0"),
        t("issues_page.sectors.defence_security.topics.1"),
        t("issues_page.sectors.defence_security.topics.2"),
      ],
      link: "issues_page.sectors.defence_security.link",
      href: "/issues/defence-security",
    },
    {
      id: "politics-governance",
      title: t("issues_page.sectors.politics_governance.title"),
      icon: <Landmark className="w-8 h-8" />,
      description: t("issues_page.sectors.politics_governance.desc"),
      topics: [
        t("issues_page.sectors.politics_governance.topics.0"),
        t("issues_page.sectors.politics_governance.topics.1"),
        t("issues_page.sectors.politics_governance.topics.2"),
      ],
      link: "issues_page.sectors.politics_governance.link",
      href: "/issues/politics-governance",
    },
    {
      id: "economy-business",
      title: t("issues_page.sectors.economy_business.title"),
      icon: <TrendingUp className="w-8 h-8" />,
      description: t("issues_page.sectors.economy_business.desc"),
      topics: [
        t("issues_page.sectors.economy_business.topics.0"),
        t("issues_page.sectors.economy_business.topics.1"),
        t("issues_page.sectors.economy_business.topics.2"),
      ],
      link: "issues_page.sectors.economy_business.link",
      href: "/issues/economy-business",
    },
    {
      id: "elections-democracy",
      title: t("issues_page.sectors.elections_democracy.title"),
      icon: <Vote className="w-8 h-8" />,
      description: t("issues_page.sectors.elections_democracy.desc"),
      topics: [
        t("issues_page.sectors.elections_democracy.topics.0"),
        t("issues_page.sectors.elections_democracy.topics.1"),
        t("issues_page.sectors.elections_democracy.topics.2"),
      ],
      link: "issues_page.sectors.elections_democracy.link",
      href: "/issues/elections-democracy",
    },
    {
      id: "esg-sustainability",
      title: t("issues_page.sectors.esg_sustainability.title"),
      icon: <Leaf className="w-8 h-8" />,
      description: t("issues_page.sectors.esg_sustainability.desc"),
      topics: [
        t("issues_page.sectors.esg_sustainability.topics.0"),
        t("issues_page.sectors.esg_sustainability.topics.1"),
        t("issues_page.sectors.esg_sustainability.topics.2"),
      ],
      link: "issues_page.sectors.esg_sustainability.link",
      href: "/issues/esg-sustainability",
    },
  ];

  const methods = [
    {
      title: t("issues_page.cross_cutting.methods.0.title"),
      description: t("issues_page.cross_cutting.methods.0.desc"),
    },
    {
      title: t("issues_page.cross_cutting.methods.1.title"),
      description: t("issues_page.cross_cutting.methods.1.desc"),
    },
    {
      title: t("issues_page.cross_cutting.methods.2.title"),
      description: t("issues_page.cross_cutting.methods.2.desc"),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-6xl md:text-7xl font-bold text-foreground mb-6">
            {t("issues_page.title")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl leading-relaxed">
            {t("issues_page.subtitle")}
          </p>
        </div>
      </section>

      {/* Sectors */}
      {sectors.map((sector, index) => (
        <section
          key={sector.id}
          id={sector.id}
          className={`py-16 md:py-24 border-b border-border scroll-mt-20 ${
            index % 2 === 1 ? "bg-muted/30" : ""
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    {sector.icon}
                  </div>
                  <h2 className="font-serif text-4xl font-bold text-foreground">
                    {sector.title}
                  </h2>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  {sector.description}
                </p>

                <Link
                  href={sector.href}
                  className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                >
                  {t(sector.link)}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="bg-card border border-border rounded-lg p-8">
                <h3 className="font-semibold text-foreground mb-6">
                  {t("issues_page.focus_areas")}
                </h3>
                <ul className="space-y-4">
                  {sector.topics.map((topic) => (
                    <li key={topic} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <span className="text-muted-foreground leading-relaxed">
                        {topic}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Cross-Cutting Methods */}
      {SHOW_RELATED_INSIGHTS && (
        <section className="py-16 md:py-24 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-5xl font-bold text-foreground mb-6">
              {t("issues_page.cross_cutting.title")}
            </h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-3xl leading-relaxed">
              {t("issues_page.cross_cutting.desc")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {methods.map((method, i) => (
                <div
                  key={method.title}
                  className="p-6 rounded-lg border border-border bg-card"
                >
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-serif font-bold mb-4">
                    {i + 1}
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    {method.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {method.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Insights (FEATURE FLAGGED) */}
      {SHOW_RELATED_INSIGHTS && (
        <section className="py-16 md:py-24 border-b border-border bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="font-serif text-4xl font-bold text-foreground">
                  Related Insights
                </h2>
                <p className="text-muted-foreground mt-2">
                  Featured analyses across our focus areas
                </p>
              </div>

              <Link
                href="/insights"
                className="hidden md:inline-flex items-center gap-2 text-primary font-medium hover:underline"
              >
                View All Insights
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ArticleCard
                title="Maritime Security and Regional Stability in Southeast Asia"
                excerpt="Analysis of maritime boundary disputes, naval modernization, and implications for Indonesia's strategic interests."
                date="Jan 18, 2025"
                category="Defence & Security"
                href="/insights/maritime-security"
              />
              <ArticleCard
                title="Investment Climate Reforms: Progress and Challenges"
                excerpt="Assessment of regulatory reforms aimed at improving Indonesia's business environment and attracting foreign investment."
                date="Jan 12, 2025"
                category="Economy & Business"
                href="/insights/investment-climate"
              />
              <ArticleCard
                title="Local Elections 2024: Patterns and Implications"
                excerpt="Analysis of voter behaviour, campaign strategies, and democratic participation in Indonesia's regional elections."
                date="Jan 8, 2025"
                category="Elections & Democracy"
                href="/insights/local-elections"
              />
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t("issues_page.cta.title")}
          </h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            {t("issues_page.cta.desc")}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded hover:opacity-90 transition-opacity"
          >
            {t("issues_page.cta.btn")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
