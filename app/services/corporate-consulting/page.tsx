'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ArrowRight, ArrowLeft, Briefcase, Building2, Users, FileText, Shield, Compass } from 'lucide-react'

export default function CorporateConsultingPage() {
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
            <span className="text-foreground">Corporate & Public Consulting</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
              <Briefcase className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">
            Corporate & Public Consulting
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Strategic advisory services for private companies and public enterprises navigating complex regulatory environments and dynamic market conditions.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-serif text-4xl font-bold text-foreground mb-6">
                Navigate Complexity with Confidence
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Indonesia's business environment presents unique challenges - from evolving regulations and political dynamics to stakeholder complexity and market volatility. ACRC helps organizations understand and navigate these challenges through strategic analysis and tailored advisory services.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether you're a multinational entering the Indonesian market, a local enterprise seeking expansion, or a state-owned enterprise undergoing transformation, our consulting team brings deep expertise in institutional analysis, stakeholder engagement, and strategic positioning.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { number: '75+', label: 'Corporate clients served' },
                { number: '40+', label: 'SOE engagements' },
                { number: '25+', label: 'Industries covered' },
                { number: '90%', label: 'Client retention rate' },
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
                icon: <Building2 className="w-6 h-6" />,
                title: 'Institutional Analysis',
                description: 'Deep analysis of regulatory bodies, government agencies, and institutional frameworks affecting your business operations.',
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: 'Stakeholder Mapping',
                description: 'Identification and analysis of key stakeholders, their interests, and influence on your strategic objectives.',
              },
              {
                icon: <FileText className="w-6 h-6" />,
                title: 'Regulatory Advisory',
                description: 'Expert guidance on navigating complex regulatory requirements, compliance issues, and policy changes.',
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: 'Risk Assessment',
                description: 'Comprehensive evaluation of political, regulatory, and operational risks affecting business decisions.',
              },
              {
                icon: <Compass className="w-6 h-6" />,
                title: 'Strategic Positioning',
                description: 'Development of positioning strategies that align business objectives with policy and market realities.',
              },
              {
                icon: <Briefcase className="w-6 h-6" />,
                title: 'SOE Transformation',
                description: 'Advisory services for state-owned enterprises undergoing restructuring, privatization, or strategic transformation.',
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

      {/* Industries */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl font-bold text-foreground mb-12">Industries We Serve</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Energy & Resources',
              'Financial Services',
              'Infrastructure',
              'Manufacturing',
              'Technology',
              'Healthcare',
              'Agriculture',
              'Telecommunications',
            ].map((industry, i) => (
              <div key={i} className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors">
                <p className="font-medium text-foreground">{industry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl font-bold text-foreground mb-6">
            Ready to Navigate Indonesia's Business Landscape?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Partner with ACRC to develop strategies that account for Indonesia's unique institutional and regulatory environment.
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
