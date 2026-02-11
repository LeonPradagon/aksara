"use client";

import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  ArrowRight,
  AlertCircle,
  TrendingUp,
  Shield,
  Landmark,
  Leaf,
} from "lucide-react";

const currentConcerns = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Regional Security Tensions",
    description:
      "Escalating geopolitical tensions in the South China Sea and their implications for Indonesia's foreign policy positioning and defence posture.",
    urgency: "High",
    category: "Defence & Security",
  },
  {
    icon: <Landmark className="w-6 h-6" />,
    title: "Governance Quality in New Capital",
    description:
      "Governance arrangements and institutional frameworks for Nusantara, Indonesia's new capital city, and implications for regional development.",
    urgency: "Medium",
    category: "Politics & Governance",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Digital Economy Regulation",
    description:
      "The evolving regulatory landscape for Indonesia's digital economy and its impact on innovation, competition, and consumer protection.",
    urgency: "High",
    category: "Economy & Business",
  },
  {
    icon: <Leaf className="w-6 h-6" />,
    title: "Energy Transition Politics",
    description:
      "Political economy challenges in Indonesia's transition to renewable energy and achievement of net-zero commitments.",
    urgency: "High",
    category: "ESG & Sustainability",
  },
  {
    icon: <AlertCircle className="w-6 h-6" />,
    title: "Electoral Integrity",
    description:
      "Safeguarding electoral integrity and democratic participation ahead of future electoral cycles.",
    urgency: "Medium",
    category: "Elections & Democracy",
  },
];

export default function ConcernPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link
              href="/insights"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Insights
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">ACRC's Concern</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">
            ACRC's Concern
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Key issues and emerging trends that ACRC is monitoring and
            researching. These represent the policy challenges and developments
            that we believe deserve attention from decision-makers.
          </p>
        </div>
      </section>

      {/* Current Concerns */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl font-bold text-foreground mb-12">
            Current Priority Areas
          </h2>

          <div className="space-y-8">
            {currentConcerns.map((concern, i) => (
              <div
                key={i}
                className="p-8 rounded-lg border border-border bg-card hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    {concern.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="font-serif text-2xl font-bold text-foreground">
                        {concern.title}
                      </h3>
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          concern.urgency === "High"
                            ? "bg-destructive/10 text-destructive"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        {concern.urgency} Priority
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {concern.description}
                    </p>
                    <Link
                      href={`/issues/${concern.category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
                      className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors"
                    >
                      Explore {concern.category}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 md:py-24 border-b border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-serif text-4xl font-bold text-foreground mb-6">
                How We Identify Concerns
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                ACRC continuously monitors political, economic, and social
                developments across Indonesia and the region. Our concern
                identification process combines:
              </p>
              <ul className="space-y-4">
                {[
                  "Systematic media and policy monitoring",
                  "Expert consultations and stakeholder engagement",
                  "Data analysis and trend identification",
                  "Comparative analysis with regional developments",
                  "Assessment of policy impact and implementation challenges",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-10 rounded-lg border border-border bg-card">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-6">
                Request a Briefing
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                ACRC offers customized briefings on current concerns for
                government agencies, businesses, and organizations seeking to
                understand emerging policy challenges.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded hover:opacity-90 transition-opacity"
              >
                Request Briefing
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl font-bold text-foreground mb-6">
            Stay Informed
          </h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Explore our latest articles, reports, and analysis on the issues
            that matter most.
          </p>
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded hover:opacity-90 transition-opacity"
          >
            Browse All Insights
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
