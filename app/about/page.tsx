'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ArrowRight, Check } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-6xl md:text-7xl font-bold text-foreground mb-6">About ACRC</h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed italic">
            About Aksara Cakra Research and Consulting
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section id="who-we-are" className="py-16 md:py-24 border-b border-border scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif text-5xl font-bold text-foreground mb-8">Who We Are</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Aksara Cakra Research and Consulting (ACRC) is a research and consulting firm based in 
South Jakarta, Indonesia. We help decision-makers in government, state-owned enterprises, 
and the private sector understand their strategic environment and translate it into orderly, 
realistic plans.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We work as an independent thought partner: mapping risks and opportunities, interpreting 
regulations, reading data, and presenting options that senior leaders can actually use.
              </p>
              <div className="space-y-4">
                {[
                  'Multidisciplinary expertise across sectors',
                  'Data-driven research methodologies',
                  'Deep government and policy relationships',
                  'Practical, implementable recommendations',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-muted rounded-lg p-10 border border-border h-full flex items-center justify-center min-h-80">
              <div className="text-center">
                <p className="font-serif text-6xl font-bold text-foreground mb-3">Since 2010</p>
                <p className="text-muted-foreground text-lg">Advancing Indonesian policy analysis</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section id="vision-mission" className="py-16 md:py-24 border-b border-border scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-5xl font-bold text-foreground mb-12">Vision & Mission</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="p-10 rounded-lg border border-border bg-card">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-5">Vision</h3>
              <p className="text-foreground leading-relaxed text-lg">
                To be a trusted thought partner for Indonesia’s policymakers and business leaders in shaping 
strategies and work plans that are grounded in data and respectful of the country’s 
governance traditions.
              </p>
            </div>
            <div className="p-10 rounded-lg border border-border bg-card">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-5">Mission</h3>
              <ul className="text-foreground leading-relaxed text-lg list-disc pl-6 space-y-3">
  <li>
    Produce research that is auditable, relevant, and accessible to decision-makers.
  </li>
  <li>
    Help clients structure risks and opportunities based on law, policy, and field realities.
  </li>
  <li>
    Uphold high standards of ethics, confidentiality, and bureaucratic etiquette.
  </li>
  <li>
    Strengthen clients’ internal capacity through dialogue, training, and knowledge transfer.
  </li>
</ul>

            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section id="values" className="py-16 md:py-24 border-b border-border bg-muted/30 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-5xl font-bold text-foreground mb-12">Our Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {[
    {
      title: 'Intellectual Integrity',
      description:
        'Our conclusions follow the data, not the other way around. Methods and sources are clearly explained.'
    },
    {
      title: 'Independence & Non-Partisanship',
      description:
        'We are not tied to any political group or business faction. This allows us to focus on long-term public interest.'
    },
    {
      title: 'Confidentiality & Data Ethics',
      description:
        'Client documents and respondent data are handled with strict confidentiality and used only for agreed purposes.'
    },
    {
      title: 'Respect for Bureaucratic Etiquette',
      description:
        'We treat procedures, hierarchies, and official protocols as an integral part of good governance, not as mere formality.'
    },
    {
      title: 'Diligence in Detail',
      description:
        'We read regulations down to the annexes, and we re-check numbers down to their assumptions.'
    },
  ].map((value, i) => (
    <div
      key={i}
      className="p-8 rounded-lg border border-border bg-card hover:shadow-md transition-shadow"
    >
      <h3 className="font-serif text-xl font-bold text-foreground mb-4">
        {value.title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {value.description}
      </p>
    </div>
  ))}
</div>

        </div>
      </section>

      {/* How We Work */}
      <section id="how-we-work" className="py-16 md:py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-5xl font-bold text-foreground mb-12">How We Work</h2>

          <div className="space-y-8">
  {[
    {
      number: '01',
      title: 'Initial Diagnosis',
      description:
        'We review key documents, speak with relevant stakeholders, and clarify the questions that truly matter.'
    },
    {
      number: '02',
      title: 'Framework & Work Plan',
      description:
        'We agree on core questions, methods, timeline, deliverables, and decision points.'
    },
    {
      number: '03',
      title: 'Data Collection & Processing',
      description:
        'We combine fieldwork, internal data, and official sources into a coherent information base.'
    },
    {
      number: '04',
      title: 'Analysis & Options',
      description:
        'We develop scenarios with clear implications for costs, risks, and opportunities.'
    },
    {
      number: '05',
      title: 'Action Plan',
      description:
        'We turn recommendations into concrete tasks: who does what, by when, and with which indicators.'
    },
    {
      number: '06',
      title: 'Implementation Support',
      description:
        'We help monitor progress and adjust the plan when conditions change, if requested.'
    },
  ].map((step, i) => (
    <div key={i} className="flex gap-8 items-start">
      <div className="flex-shrink-0 w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary">
        <span className="font-serif text-3xl font-bold text-primary">
          {step.number}
        </span>
      </div>
      <div className="flex-1 pt-2">
        <h3 className="font-serif text-2xl font-bold text-foreground mb-3">
          {step.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed text-lg">
          {step.description}
        </p>
      </div>
    </div>
  ))}
</div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 border-t border-border bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-5xl font-bold text-foreground mb-6">Work With ACRC</h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Ready to engage ACRC for your research or consulting needs? Let's start a conversation.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            Contact Us
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
