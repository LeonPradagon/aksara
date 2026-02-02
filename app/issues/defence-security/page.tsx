'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ArticleCard } from '@/components/cards'
import { ArrowRight, ArrowLeft, Shield } from 'lucide-react'

const relatedInsights = [
  {
    title: "Indonesia's 2025 Defence Spending: Strategic Priorities and Fiscal Constraints",
    excerpt: "Analysis of Indonesia's defence budget allocation, strategic priorities, and implications for regional security.",
    date: "Jan 24, 2025",
    category: "Defence",
    href: "/insights/article-1"
  },
  {
    title: "Maritime Security in the South China Sea: Indonesia's Strategic Options",
    excerpt: "Examining Indonesia's maritime security challenges and strategic responses in contested waters.",
    date: "Dec 15, 2024",
    category: "Security",
    href: "/insights/article-2"
  },
  {
    title: "Defence Modernization and Industrial Policy",
    excerpt: "Assessment of Indonesia's defence modernization efforts and the development of domestic defence industries.",
    date: "Nov 20, 2024",
    category: "Defence",
    href: "/insights/article-3"
  },
]

export default function DefenceSecurityPage() {
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
            Analysis of defence policy, security threats, and strategic implications for national and regional security in Indonesia and the Indo-Pacific region.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-serif text-4xl font-bold text-foreground mb-6">
                Strategic Security Analysis
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Indonesia faces complex security challenges spanning traditional defence concerns, maritime security, cyber threats, and transnational security issues. ACRC provides rigorous analysis of these challenges to inform policy and strategic decision-making.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our defence and security research covers military modernization, regional security dynamics, defence industry development, and the evolving strategic environment in the Indo-Pacific.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="font-serif text-2xl font-bold text-foreground">Key Focus Areas</h3>
              <ul className="space-y-4">
                {[
                  'Defence policy and budget analysis',
                  'Military modernization and capability development',
                  'Maritime and territorial security',
                  'Regional security architecture',
                  'Cyber security and emerging threats',
                  'Defence industry and procurement',
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
            Partner with ACRC for rigorous analysis of defence policy and security challenges.
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
