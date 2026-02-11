"use client";

import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  ArrowRight,
  ArrowLeft,
  BarChart3,
  Database,
  LineChart,
  FileSearch,
  Brain,
  Target,
} from "lucide-react";

export default function PolicyResearchPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link
              href="/services"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Services
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">Policy Research & Big Data</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">
            Policy Research & Big Data
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            We combine rigorous research methodologies with advanced data
            analytics to generate evidence-based insights on policy challenges
            facing Indonesia.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-serif text-4xl font-bold text-foreground mb-6">
                Evidence-Based Policy Analysis
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Our policy research division delivers comprehensive analysis
                that informs strategic decision-making across government,
                business, and civil society sectors. We leverage big data
                capabilities to uncover patterns and insights that traditional
                research methods may miss.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                From regulatory impact assessments to sector-wide policy
                evaluations, our team brings together quantitative rigor and
                qualitative depth to address Indonesia's most pressing policy
                challenges.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { number: "150+", label: "Research projects completed" },
                { number: "50M+", label: "Data points analyzed" },
                { number: "30+", label: "Government partnerships" },
                { number: "15+", label: "Years of expertise" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-6 rounded-lg border border-border bg-card"
                >
                  <p className="font-serif text-4xl font-bold text-foreground mb-2">
                    {stat.number}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-16 md:py-24 border-b border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl font-bold text-foreground mb-12">
            Our Capabilities
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Database className="w-6 h-6" />,
                title: "Big Data Analytics",
                description:
                  "Advanced data collection, processing, and analysis using cutting-edge tools to extract meaningful insights from large datasets.",
              },
              {
                icon: <LineChart className="w-6 h-6" />,
                title: "Quantitative Research",
                description:
                  "Econometric modeling, statistical analysis, and survey research to provide rigorous quantitative foundations for policy recommendations.",
              },
              {
                icon: <FileSearch className="w-6 h-6" />,
                title: "Policy Evaluation",
                description:
                  "Systematic assessment of existing policies and programs to measure effectiveness, identify gaps, and recommend improvements.",
              },
              {
                icon: <Brain className="w-6 h-6" />,
                title: "Scenario Analysis",
                description:
                  "Forward-looking analysis exploring multiple policy scenarios and their potential impacts on stakeholders and outcomes.",
              },
              {
                icon: <Target className="w-6 h-6" />,
                title: "Regulatory Impact Assessment",
                description:
                  "Comprehensive evaluation of proposed regulations to assess costs, benefits, and implementation challenges.",
              },
              {
                icon: <BarChart3 className="w-6 h-6" />,
                title: "Benchmarking Studies",
                description:
                  "Comparative analysis of policies and practices across jurisdictions to identify best practices and adaptation opportunities.",
              },
            ].map((capability, i) => (
              <div
                key={i}
                className="p-8 rounded-lg border border-border bg-card hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-5">
                  {capability.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                  {capability.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {capability.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl font-bold text-foreground mb-12">
            Sectors We Serve
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Government Ministries",
              "State-Owned Enterprises",
              "International Organizations",
              "Private Sector",
              "Think Tanks",
              "Academic Institutions",
              "NGOs & Civil Society",
              "Development Partners",
            ].map((sector, i) => (
              <div
                key={i}
                className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors"
              >
                <p className="font-medium text-foreground">{sector}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl font-bold text-foreground mb-6">
            Need Evidence-Based Policy Research?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Let's discuss how ACRC's policy research and big data capabilities
            can support your strategic objectives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded hover:opacity-90 transition-opacity"
            >
              Start a Conversation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary font-semibold rounded hover:bg-primary/5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
