'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ArticleCard } from '@/components/cards'
import { ArrowRight, ArrowLeft, Vote } from 'lucide-react'

const relatedInsights = [
  {
    title: "Regional Elections 2024: Patterns and Implications",
    excerpt: "Analysis of simultaneous regional elections and their implications for national political dynamics.",
    date: "Jan 5, 2025",
    category: "Elections",
    href: "/insights/article-1"
  },
  {
    title: "Electoral System Reform: Options and Trade-offs",
    excerpt: "Examining proposals for electoral system reform and their potential impacts on representation.",
    date: "Dec 1, 2024",
    category: "Democracy",
    href: "/insights/article-2"
  },
  {
    title: "Political Finance and Campaign Regulation",
    excerpt: "Assessment of Indonesia's political finance regulations and enforcement challenges.",
    date: "Nov 10, 2024",
    category: "Elections",
    href: "/insights/article-3"
  },
]

export default function ElectionsDemocracyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/issues" className="text-muted-foreground hover:text-primary transition-colors">
              Issues & Sectors
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">Elections & Democracy</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
              <Vote className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">
            Elections & Democracy
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Electoral processes, democratic institutions, and political participation across Indonesia's vibrant democracy.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-serif text-4xl font-bold text-foreground mb-6">
                Indonesia's Democratic Journey
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                As the world's third-largest democracy, Indonesia's electoral processes and democratic institutions are of critical importance to its political stability and development trajectory. ACRC provides deep analysis of democratic dynamics.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our research covers electoral systems, political party development, voter behavior, democratic quality, and the institutions that underpin Indonesia's democratic governance.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="font-serif text-2xl font-bold text-foreground">Key Focus Areas</h3>
              <ul className="space-y-4">
                {[
                  'Electoral system design and reform',
                  'Voter behavior and political participation',
                  'Political party organization and competition',
                  'Election administration and integrity',
                  'Democratic quality and consolidation',
                  'Campaign dynamics and political communication',
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
            <h2 className="font-serif text-4xl font-bold text-foreground">Related Insights</h2>
            <Link
              href="/insights?category=Elections"
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
            Need Elections & Democracy Analysis?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Partner with ACRC for expert analysis of Indonesia's electoral processes and democratic development.
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
  )
}
