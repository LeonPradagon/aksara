'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ArrowRight, FileText, Download, Calendar, MapPin, Users } from 'lucide-react'

// Articles & Analysis data
const articles = [
  {
    id: '1',
    title: 'Indonesia\'s 2025 Defence Spending: Strategic Priorities and Fiscal Constraints',
    excerpt: 'Analysis of Indonesia\'s defence budget allocation, strategic priorities, and implications for regional security frameworks.',
    date: 'Jan 24, 2025',
    category: 'Defence',
  },
  {
    id: '2',
    title: 'Digital Economy Regulation: Balancing Innovation and Consumer Protection',
    excerpt: 'Examining the regulatory framework for Indonesia\'s digital economy sector and its impact on startup ecosystem growth.',
    date: 'Jan 20, 2025',
    category: 'Economy',
  },
  {
    id: '3',
    title: 'Maritime Security and Regional Stability in Southeast Asia',
    excerpt: 'Analysis of maritime boundary disputes, naval modernization, and implications for Indonesia\'s strategic interests.',
    date: 'Jan 18, 2025',
    category: 'Defence',
  },
  {
    id: '4',
    title: 'Green Finance and Climate Investment in Indonesia',
    excerpt: 'Exploring the role of green finance in funding Indonesia\'s climate commitments and sustainable development goals.',
    date: 'Jan 10, 2025',
    category: 'ESG',
  },
  {
    id: '5',
    title: 'Local Elections 2024: Voter Behaviour and Campaign Dynamics',
    excerpt: 'Analysis of voting patterns, campaign strategies, and democratic participation in regional elections.',
    date: 'Jan 8, 2025',
    category: 'Elections',
  },
  {
    id: '6',
    title: 'Bureaucratic Reform and Public Service Delivery',
    excerpt: 'Assessment of administrative capacity improvements and challenges in delivering quality public services.',
    date: 'Jan 5, 2025',
    category: 'Politics',
  },
]

// Reports & Policy Briefs data
const reports = [
  {
    id: 'r1',
    title: 'Political Economy of Energy Transition in Indonesia',
    description: 'Comprehensive analysis of how political dynamics shape Indonesia\'s transition to renewable energy and implications for energy security policy.',
    date: 'Jan 2025',
    pages: 48,
    downloadAvailable: true,
  },
  {
    id: 'r2',
    title: 'Investment Climate Assessment: Eastern Indonesia',
    description: 'Regional analysis of investment opportunities, regulatory constraints, and infrastructure gaps in Eastern Indonesia provinces.',
    date: 'Dec 2024',
    pages: 36,
    downloadAvailable: true,
  },
  {
    id: 'r3',
    title: 'ESG Compliance Framework for Indonesian SOEs',
    description: 'Policy brief on environmental, social, and governance standards and implementation roadmap for state-owned enterprises.',
    date: 'Nov 2024',
    pages: 24,
    downloadAvailable: false,
  },
  {
    id: 'r4',
    title: 'Defence Industry Development: Strategic Roadmap',
    description: 'Analysis of Indonesia\'s domestic defence industry capabilities, technology transfer policies, and strategic development priorities.',
    date: 'Oct 2024',
    pages: 52,
    downloadAvailable: true,
  },
]

// Events & Presentations data
const events = [
  {
    id: 'e1',
    title: 'ACRC Policy Roundtable: Indonesia\'s Security Challenges in 2025',
    type: 'Closed-Door Briefing',
    date: 'Feb 15, 2025',
    location: 'Jakarta',
    description: 'Expert discussion on current security threats, regional dynamics, and strategic policy responses for senior government and corporate stakeholders.',
    status: 'upcoming',
  },
  {
    id: 'e2',
    title: 'Public Seminar: Economic Outlook and Investment Opportunities',
    type: 'Public Talk',
    date: 'Jan 28, 2025',
    location: 'Jakarta Convention Center',
    description: 'ACRC economists present analysis of Indonesia\'s 2025 economic outlook, sectoral opportunities, and policy recommendations.',
    status: 'upcoming',
  },
  {
    id: 'e3',
    title: 'Closed Briefing: Electoral Dynamics and Political Risk',
    type: 'Closed-Door Briefing',
    date: 'Jan 10, 2025',
    location: 'Jakarta',
    description: 'Exclusive briefing for corporate clients on post-election political landscape, coalition dynamics, and policy implications.',
    status: 'past',
  },
  {
    id: 'e4',
    title: 'Workshop: ESG Implementation for Indonesian Companies',
    type: 'Seminar',
    date: 'Dec 12, 2024',
    location: 'Bali',
    description: 'Practical workshop on ESG standards, compliance requirements, and stakeholder engagement strategies for corporate leaders.',
    status: 'past',
  },
]

const categories = ['All', 'Defence', 'Politics', 'Economy', 'Elections', 'ESG']

export default function InsightsPage() {
  const [activeSection, setActiveSection] = useState<'articles' | 'reports' | 'events'>('articles')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredArticles = selectedCategory === 'All' 
    ? articles 
    : articles.filter(a => a.category === selectedCategory)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-6xl md:text-7xl font-bold text-foreground mb-6">Insights from ACRC</h1>
          <p className="text-xl text-muted-foreground max-w-4xl leading-relaxed">
            Through our Insights, ACRC shares concise analyses, articles, and summaries of our work to help clients and the wider public understand key developments affecting Indonesia.
          </p>
        </div>
      </section>

      {/* Section Tabs */}
      <section className="border-b border-border sticky top-16 z-40 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-0">
            <button
              onClick={() => setActiveSection('articles')}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeSection === 'articles'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Articles & Analysis
            </button>
            <button
              onClick={() => setActiveSection('reports')}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeSection === 'reports'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Reports & Policy Briefs
            </button>
            <button
              onClick={() => setActiveSection('events')}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeSection === 'events'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Events & Presentations
            </button>
          </div>
        </div>
      </section>

      {/* Articles & Analysis Section */}
      {activeSection === 'articles' && (
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category Filters */}
            <div className="mb-10">
              <p className="text-sm font-medium text-muted-foreground mb-3">Filter by Category</p>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === cat
                        ? 'bg-foreground text-background'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Articles List */}
            <div className="space-y-6">
              {filteredArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/insights/${article.id}`}
                  className="block p-6 rounded-lg border border-border bg-card hover:shadow-md hover:border-primary/30 transition-all group"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded">
                          {article.category}
                        </span>
                        <span className="text-sm text-muted-foreground">{article.date}</span>
                      </div>
                      <h3 className="font-serif text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">{article.excerpt}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                  </div>
                </Link>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No articles found in this category.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Reports & Policy Briefs Section */}
      {activeSection === 'reports' && (
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-lg text-muted-foreground mb-10 max-w-3xl">
              ACRC produces thematic reports and policy briefs on key issues affecting Indonesia. Selected publications are available for download.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="p-6 rounded-lg border border-border bg-card hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-muted-foreground">{report.date}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{report.pages} pages</span>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-foreground mb-2">{report.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{report.description}</p>
                      {report.downloadAvailable ? (
                        <button className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                          <Download className="w-4 h-4" />
                          Download PDF
                        </button>
                      ) : (
                        <span className="text-sm text-muted-foreground italic">Available upon request</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Events & Presentations Section */}
      {activeSection === 'events' && (
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-lg text-muted-foreground mb-10 max-w-3xl">
              ACRC delivers closed-door briefings, seminars, and public talks on policy issues for government, corporate, and institutional audiences.
            </p>

            {/* Upcoming Events */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Upcoming Events</h2>
              <div className="space-y-4">
                {events.filter(e => e.status === 'upcoming').map((event) => (
                  <div
                    key={event.id}
                    className="p-6 rounded-lg border border-primary/30 bg-primary/5"
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <span className="px-2.5 py-0.5 text-xs font-medium bg-primary text-primary-foreground rounded">
                            {event.type}
                          </span>
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {event.date}
                          </span>
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            {event.location}
                          </span>
                        </div>
                        <h3 className="font-serif text-xl font-bold text-foreground mb-2">{event.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                      </div>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background text-sm font-medium rounded hover:opacity-90 transition-opacity flex-shrink-0"
                      >
                        <Users className="w-4 h-4" />
                        Register Interest
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Past Events */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Past Events</h2>
              <div className="space-y-4">
                {events.filter(e => e.status === 'past').map((event) => (
                  <div
                    key={event.id}
                    className="p-6 rounded-lg border border-border bg-card"
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <span className="px-2.5 py-0.5 text-xs font-medium bg-muted text-muted-foreground rounded">
                            {event.type}
                          </span>
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {event.date}
                          </span>
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            {event.location}
                          </span>
                        </div>
                        <h3 className="font-serif text-lg font-bold text-foreground mb-2">{event.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="py-16 md:py-24 border-t border-border bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl font-bold text-foreground mb-6">Receive Regular Insights</h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Subscribe to ACRC's newsletter for the latest research and policy analysis delivered to your inbox.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); }} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              required
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background font-semibold rounded hover:opacity-90 transition-opacity"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  )
}
