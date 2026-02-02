'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ArrowRight, BarChart3, Building2, Vote, Database, FileSearch, TrendingUp, Shield, Handshake, Scale, Target, ClipboardList, Megaphone, UserCheck } from 'lucide-react'

export default function ServicesPage() {
  const services = [
    {
      id: 'policy-research',
      title: 'Policy Research & Big Data',
      description: 'ACRC delivers rigorous policy research combined with data analytics to support evidence-based decision-making across government, SOEs, and private sector clients.',
      icon: <BarChart3 className="w-8 h-8" />,
      href: '/services/policy-research',
      offerings: [
        {
          title: 'Defence, Security & International Affairs Research',
          description: 'We support ministries, the armed forces, and strategic state-owned enterprises in understanding regional security dynamics, defence modernization needs, and opportunities for defence and maritime cooperation consistent with Indonesia’s legal framework.',
          icon: <Shield className="w-5 h-5" />,
        },
        {
          title: 'Political, Public Policy & Social Research',
          description: 'We analyse draft and existing regulations, conduct regulatory impact assessments, evaluate public programmes, and study social issues at both national and local levels.',
          icon: <FileSearch className="w-5 h-5" />,
        },
        {
          title: 'Economic & Business Climate Research',
          description: 'We examine macroeconomic developments, investment climate constraints, and sectoral opportunities across Indonesia’s regions.',
          icon: <TrendingUp className="w-5 h-5" />,
        },
        {
          title: 'Big Data & Analytics',
          description: 'ACRC helps clients organise and use their internal data – from sales and complaints to visits and logistics – alongside spatial and public data to build practical dashboards and early warning indicators for management.',
          icon: <Database className="w-5 h-5" />,
        },
      ],
    },
    {
      id: 'corporate-consulting',
      title: 'Corporate & Public Consulting',
      description: 'Strategic advisory services helping organisations navigate Indonesia\'s complex regulatory environment and achieve their institutional objectives.',
      icon: <Building2 className="w-8 h-8" />,
      href: '/services/corporate-consulting',
      offerings: [
        {
          title: 'Government Relations',
          description: 'We assist companies in structuring healthy, transparent relationships with ministries, regulators, and local governments: stakeholder mapping, regulatory monitoring, and concise policy briefs for executives.',
          icon: <Handshake className="w-5 h-5" />,
        },
        {
          title: 'Risk & Opportunity Management',
          description: 'We develop integrated maps of regulatory, tax, labour, standards, data, and environmental risks, while also identifying incentives, partnership opportunities, and expansion prospects.',
          icon: <ClipboardList className="w-5 h-5" />,
        },
        {
          title: 'Strategic Planning Development',
          description: 'We guide clients through market mapping, scenario planning, and the design of partnerships between local and foreign partners that are compliant and culturally sensitive.',
          icon: <Target className="w-5 h-5" />,
        },
        {
          title: 'Legal & Regulatory Compliance Advisory',
          description: 'We map licensing and compliance obligations, review standard contracts, and support clients in responding to audit findings or disputes – with an emphasis on orderly, constructive resolution. ',
          icon: <Scale className="w-5 h-5" />,
        },
      ],
    },
    {
      id: 'political-consulting',
      title: 'Political & Election Consulting',
      description: 'Expert political advisory services supporting coherent, realistic, and credible political strategies grounded in Indonesia\'s institutional realities.',
      icon: <Vote className="w-8 h-8" />,
      href: '/services/political-consulting',
      offerings: [
        {
          title: 'Strategic Political Consulting & Campaign Services',
          description: 'We help governments, parties, and candidates design coherent policy agendas and issue management strategies that are realistic and aligned with their actual capacity.',
          icon: <Target className="w-5 h-5" />,
        },
        {
          title: 'Campaign Strategy & Management',
          description: 'We analyse constituencies, build message architectures, design campaign organisations, and assist in planning for election day and the post-election period. ',
          icon: <ClipboardList className="w-5 h-5" />,
        },
        {
          title: 'Survey & Opinion Research',
          description: 'We design and implement surveys with transparent methodology, and we explain not just “what the numbers are” but “why people think that way”.',
          icon: <BarChart3 className="w-5 h-5" />,
        },
        {
          title: 'Candidate Personal Branding',
          description: 'We help candidates articulate who they are, what problems they want to solve, and how they credibly plan to do so – in a narrative that matches their track record and everyday behaviour.',
          icon: <UserCheck className="w-5 h-5" />,
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-6xl md:text-7xl font-bold text-foreground mb-6">Our Services</h1>
          <p className="text-xl text-muted-foreground max-w-4xl leading-relaxed">
            ACRC offers a set of integrated services: policy research and data analytics, corporate and public consulting, and political consulting. All of them share the same foundation: respect for facts, for the law, and for the institutional realities of Indonesia.
          </p>
        </div>
      </section>

      {/* Three Core Services with Detailed Offerings */}
      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-16 md:py-24 border-b border-border scroll-mt-20 ${index % 2 === 1 ? 'bg-muted/30' : ''}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Service Header */}
            <div className="flex flex-col md:flex-row md:items-start gap-6 mb-12">
              <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                {service.icon}
              </div>
              <div className="flex-1">
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">{service.title}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                  {service.description}
                </p>
              </div>
            </div>

            {/* Service Offerings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.offerings.map((offering, i) => (
                <div key={i} className="p-6 rounded-lg border border-border bg-card hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      {offering.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">{offering.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{offering.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Learn More Link */}
            <div className="mt-8">
              <Link
                href={service.href}
                className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
              >
                Learn more about {service.title}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      ))}

      {/* Our Approach */}
      {/* <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-5xl font-bold text-foreground mb-6">Our Approach</h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-3xl leading-relaxed">
            All ACRC services are delivered with a commitment to analytical rigour, institutional understanding, and practical applicability.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Respect for Facts',
                description: 'Our work is grounded in rigorous research methodologies, accurate data, and evidence-based analysis.',
              },
              {
                title: 'Respect for the Law',
                description: 'We operate within Indonesia\'s legal framework and advise clients on compliant, ethical approaches.',
              },
              {
                title: 'Institutional Realities',
                description: 'Our recommendations account for Indonesia\'s unique institutional context and practical implementation challenges.',
              },
            ].map((principle, i) => (
              <div key={i} className="p-8 rounded-lg border border-border bg-card">
                <div className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center font-serif font-bold text-xl mb-6">
                  {i + 1}
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">{principle.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA */}
      <section className="py-16 md:py-24 border-b border-border bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">Let's Discuss Your Needs</h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Contact ACRC to explore how our research and consulting services can support your strategic objectives.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-semibold rounded hover:opacity-90 transition-opacity"
          >
            Get In Touch
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
