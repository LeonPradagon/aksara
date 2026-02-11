"use client";

import {
  ArrowRight,
  TrendingUp,
  Users,
  Globe,
  Shield,
  Landmark,
  Vote,
  Leaf,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArticleCard, SectorCard } from "@/components/cards";
import { NavLink } from "@/components/nav-link";
import { TestimonialsSection } from "@/components/testimonials-section";
// Import React Hooks untuk logika Carousel
import { useState, useEffect } from "react";

const issuesWeWorkOn = [
  {
    title: "Defence & Security",
    href: "/issues/defence-security",
    icon: <Shield className="w-5 h-5" />,
  },
  {
    title: "Politics & Governance",
    href: "/issues/politics-governance",
    icon: <Landmark className="w-5 h-5" />,
  },
  {
    title: "Economy & Business",
    href: "/issues/economy-business",
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    title: "Elections & Democracy",
    href: "/issues/elections-democracy",
    icon: <Vote className="w-5 h-5" />,
  },
  {
    title: "ESG & Sustainability",
    href: "/issues/esg-sustainability",
    icon: <Leaf className="w-5 h-5" />,
  },
];

export default function HomePage() {
  const slides = ["/picture/home.jpeg", "/picture/home-2.jpeg"];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="py-8 md:py-12 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-primary font-semibold mb-4">
                Aksara Cakra Research and Consulting (ACRC)
              </p>

              <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-8 leading-tight">
                Navigator of Nusantara's Policy Direction
              </h1>

              <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-3xl">
                ACRC is a Jakarta-based research and consulting firm that helps
                government, state-owned enterprises, and private sector leaders
                understand Indonesia's strategic environment – and turn that
                understanding into sound policies, business strategies, and
                political decisions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <NavLink
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded hover:opacity-90 transition-opacity"
                >
                  Explore Our Services
                  <ArrowRight className="w-4 h-4" />
                </NavLink>

                <NavLink
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary font-semibold rounded hover:bg-primary/5 transition-colors"
                >
                  Schedule a Conversation
                </NavLink>
              </div>
            </div>

            {/* CAROUSEL CONTAINER */}
            <div className="relative w-full aspect-[3/2] rounded-lg border border-border overflow-hidden bg-muted group">
              {/* Render Gambar */}
              {slides.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Hero Slide ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}

              {/* Indikator Dots (Navigasi Manual) */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentSlide
                        ? "w-8 bg-white"
                        : "w-2 bg-white/50 hover:bg-white"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Opsional: Overlay Gelap sedikit agar teks di luar lebih fokus (bisa dihapus jika tidak perlu) */}
              <div className="absolute inset-0 bg-black/5 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ACRC's Concern */}
      <section className="py-16 md:py-24 border-b border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="font-serif text-5xl font-bold text-foreground mb-6">
              ACRC's Concern
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Before we act, we must understand. These are the anomalies and
              critical questions that keep us awake – and that should concern
              every decision-maker in Indonesia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                category: "Defence & Security",
                question:
                  "Why does Indonesia spend less than 1% of GDP on defence while regional tensions escalate?",
                stat: "0.8%",
                statLabel: "of GDP on defence",
              },
              {
                category: "Politics & Governance",
                question:
                  "How can the new capital project succeed when past mega-projects have struggled with coordination?",
                stat: "40+",
                statLabel: "ministries involved",
              },
              {
                category: "Economy & Business",
                question:
                  "Why do regulatory inconsistencies continue to deter foreign investment despite reform promises?",
                stat: "72",
                statLabel: "overlapping regulations",
              },
              {
                category: "Elections & Democracy",
                question:
                  "What happens to democratic norms when voter turnout masks declining public trust in institutions?",
                stat: "81%",
                statLabel: "turnout, 45% trust",
              },
              {
                category: "ESG & Sustainability",
                question:
                  "Can Indonesia meet its net-zero pledge while coal still dominates the energy mix?",
                stat: "60%",
                statLabel: "energy from coal",
              },
              {
                category: "Digital Economy",
                question:
                  "Is Indonesia's digital economy regulation enabling innovation or stifling local unicorns?",
                stat: "11",
                statLabel: "unicorns at risk",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all group"
              >
                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary mb-4">
                  {item.category}
                </span>
                <p className="text-foreground font-medium leading-relaxed mb-4 group-hover:text-primary transition-colors">
                  {item.question}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-serif font-bold text-primary">
                    {item.stat}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {item.statLabel}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <NavLink
              href="/insights/concern"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              Explore All Our Concerns
              <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-5xl font-bold text-foreground mb-8">
            Who We Are
          </h2>
          <div className="max-w-4xl">
            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
              ACRC brings together researchers and consultants with backgrounds
              in defence, politics, law, economics, and communications. Based on
              Jl. Tebet Barat Dalam II No.5, South Jakarta, we combine academic
              discipline with a practical understanding of how bureaucracy and
              business actually work in Indonesia.
            </p>
            <NavLink
              href="/about"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              Learn more about ACRC
              <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>
        </div>
      </section>

      {/* Three Core Pillars */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-5xl font-bold text-foreground mb-12">
            Three Core Pillars
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-lg border border-border bg-card hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-4">
                Policy Research & Big Data
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Evidence-based analysis of regulations, public opinion, and
                internal data to answer critical policy questions.
              </p>
            </div>
            <div className="p-8 rounded-lg border border-border bg-card hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-4">
                Corporate & Public Consulting
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Government relations, risk & opportunity management, strategic
                planning, and regulatory compliance advisory.
              </p>
            </div>
            <div className="p-8 rounded-lg border border-border bg-card hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-4">
                Political & Election Consulting
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Campaign strategy, voter research, and candidate narrative
                development grounded in realistic promises and coherent
                messaging.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Issues We Work On */}
      <section className="py-16 md:py-24 border-b border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="font-serif text-5xl font-bold text-foreground mb-4">
              Issues We Work On
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Our research and consulting covers five strategic sectors central
              to Indonesia's future.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            {issuesWeWorkOn.map((issue) => (
              <NavLink
                key={issue.title}
                href={issue.href}
                className="inline-flex items-center gap-3 px-5 py-3 bg-card border border-border rounded-lg hover:border-primary hover:shadow-md transition-all group"
              >
                <span className="text-primary group-hover:scale-110 transition-transform">
                  {issue.icon}
                </span>
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {issue.title}
                </span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </NavLink>
            ))}
          </div>

          <div className="mt-8">
            <NavLink
              href="/issues"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              View All Issues & Sectors
              <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>
        </div>
      </section>

      {/* Key Issues & Sectors */}
      {/* <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-serif text-5xl font-bold text-foreground">
                Issues & Sectors
              </h2>
              <p className="text-muted-foreground mt-3 text-lg">
                Strategic focus areas
              </p>
            </div>
            <NavLink
              href="/issues"
              className="hidden md:inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SectorCard
              title="Defence & Security"
              description="Analysis of defence policy, security threats, and strategic implications for national and regional security."
            />
            <SectorCard
              title="Politics & Governance"
              description="Deep dive into political dynamics, institutional effectiveness, and governance reform initiatives."
            />
            <SectorCard
              title="Economy & Business"
              description="Economic trends, business regulation, and competitiveness factors shaping Indonesia's economic future."
            />
            <SectorCard
              title="Elections & Democracy"
              description="Electoral processes, democratic institutions, and political participation across Indonesia."
            />
            <SectorCard
              title="ESG & Sustainability"
              description="Environmental, social, and governance considerations in corporate strategy and policy."
            />
            <SectorCard
              title="Emerging Issues"
              description="Cross-cutting themes including digital transformation, inequality, and global trends."
            />
          </div>

          <div className="mt-10 flex justify-center md:hidden">
            <NavLink
              href="/issues"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              View All Issues & Sectors
              <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>
        </div>
      </section> */}

      {/* Latest Insights */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-serif text-5xl font-bold text-foreground">
                Latest Insights
              </h2>
              <p className="text-muted-foreground mt-3 text-lg">
                Research, analysis & policy briefs
              </p>
            </div>
            <NavLink
              href="/insights"
              className="hidden md:inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ArticleCard
              title="Reassessing Political Risk in Southeast Asia"
              excerpt="A comprehensive analysis of evolving political risk factors across Southeast Asian markets and their implications for strategic decision-making."
              date="Jan 24, 2025"
              category="Politics"
              href="/insights/reassessing-political-risk-southeast-asia"
              featured
            />
            <ArticleCard
              title="What Indonesia's Fiscal Choices Mean for Investors"
              excerpt="Examining the impact of Indonesia's fiscal policy decisions on investment climate and market opportunities."
              date="Jan 20, 2025"
              category="Economy"
              href="/insights/indonesia-fiscal-choices-investors"
            />
            <ArticleCard
              title="Lessons from Previous Election Cycles Ahead of 2029"
              excerpt="Drawing insights from Indonesia's electoral history to understand patterns and prepare for the upcoming 2029 elections."
              date="Jan 15, 2025"
              category="Elections"
              href="/insights/lessons-election-cycles-2029"
            />
          </div>

          <div className="mt-10 flex justify-center md:hidden">
            <NavLink
              href="/insights"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              View All Insights
              <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-16 md:py-24 border-b border-border bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-5xl font-bold text-foreground mb-6">
            Ready to Shape Indonesia's Future?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Connect with ACRC to discuss your research, policy, or strategic
            consulting needs.
          </p>
          <NavLink
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded hover:opacity-90 transition-opacity"
          >
            Get In Touch
            <ArrowRight className="w-4 h-4" />
          </NavLink>
        </div>
      </section>

      <Footer />
    </div>
  );
}
