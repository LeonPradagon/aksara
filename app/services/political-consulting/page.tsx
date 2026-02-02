'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ArrowRight, ArrowLeft, Users, Vote, Megaphone, Target, TrendingUp, MessageSquare } from 'lucide-react'

export default function PoliticalConsultingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">
              Services
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">Political & Election Consulting</span>
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
            Political & Election Consulting
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Expert insights on electoral dynamics, political risk assessment, and strategic communications for stakeholders navigating Indonesia's political landscape.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-serif text-4xl font-bold text-foreground mb-6">
                Understanding Political Dynamics
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Indonesia's democratic landscape is complex and dynamic, with evolving political coalitions, regional variations, and shifting voter preferences. ACRC provides comprehensive political analysis and strategic advisory services to help clients navigate this environment effectively.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our political consulting practice combines deep expertise in Indonesian politics with rigorous analytical methods to deliver insights that inform strategic decision-making across electoral, policy, and business contexts.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { number: '10+', label: 'Election cycles analyzed' },
                { number: '500+', label: 'Political risk assessments' },
                { number: '34', label: 'Provinces covered' },
                { number: '100+', label: 'Stakeholder networks' },
              ].map((stat, i) => (
                <div key={i} className="p-6 rounded-lg border border-border bg-card">
                  <p className="font-serif text-4xl font-bold text-foreground mb-2">{stat.number}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24 border-b border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl font-bold text-foreground mb-12">Our Services</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: 'Political Analysis',
                description: 'In-depth analysis of political trends, coalition dynamics, and policy directions at national and regional levels.',
              },
              {
                icon: <Vote className="w-6 h-6" />,
                title: 'Election Consulting',
                description: 'Strategic advisory services for candidates, parties, and stakeholders involved in electoral processes.',
              },
              {
                icon: <Target className="w-6 h-6" />,
                title: 'Campaign Strategy',
                description: 'Development of comprehensive campaign strategies including messaging, targeting, and mobilization approaches.',
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: 'Voter Research',
                description: 'Public opinion research, voter segmentation analysis, and issue polling to inform strategic decisions.',
              },
              {
                icon: <Megaphone className="w-6 h-6" />,
                title: 'Strategic Communications',
                description: 'Development and implementation of communications strategies for political and policy contexts.',
              },
              {
                icon: <MessageSquare className="w-6 h-6" />,
                title: 'Stakeholder Engagement',
                description: 'Strategic engagement with political stakeholders, coalition building, and relationship management.',
              },
            ].map((service, i) => (
              <div key={i} className="p-8 rounded-lg border border-border bg-card hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-5">
                  {service.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl font-bold text-foreground mb-12">Who We Work With</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Political Parties',
              'Candidates & Officials',
              'Government Agencies',
              'Businesses & Investors',
              'Civil Society Organizations',
              'International Organizations',
              'Media Organizations',
              'Academic Institutions',
            ].map((client, i) => (
              <div key={i} className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors">
                <p className="font-medium text-foreground">{client}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl font-bold text-foreground mb-6">
            Need Political Insights?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Partner with ACRC to understand Indonesia's political landscape and develop strategies that account for political dynamics.
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
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-foreground text-foreground font-semibold rounded hover:bg-muted transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
