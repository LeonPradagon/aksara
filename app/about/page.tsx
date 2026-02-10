"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Shield,
} from "lucide-react";

export default function AboutPage() {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-6xl md:text-7xl font-bold text-foreground mb-6">
            About ACRC
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed italic">
            About Aksara Cakra Research and Consulting
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section
        id="who-we-are"
        className="py-16 md:py-24 border-b border-border scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif text-5xl font-bold text-foreground mb-8">
                Who We Are
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Established in early 2025 by a multidisciplinary team of
                professionals, Aksara Cakra Research and Consulting (ACRC) is
                aiming to supports decision makers in government and the private
                sector. ACRC provides reliable, comprehensive information and
                analysis to explain how geopolitical, geostrategic, and
                geoeconomic developments shape business decisions and public
                policy. This work enables clear assessments of risks and
                opportunities so that policies and strategies are grounded in
                evidence.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                ACRC applies multiple, well-tested approaches to help
                policymakers and executives assess risk and opportunity. Our
                work is grounded in a deep understanding of geopolitical,
                geostrategic, and geoeconomic dynamics, which frames how we
                analyze issues and engage with clients. We serve a broad range
                of partners, including government agencies, elected officials,
                investors, and corporate leaders.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We recognize that today’s environment is marked by volatility
                and uncertainty, creating both threats and openings for business
                and investment. ACRC is committed to helping clients make sense
                of shifting social, political, and economic conditions. We
                provide clear, evidence-based information and analysis so
                stakeholders can navigate complexity and make more informed
                decisions.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We support governments, state-owned enterprises, private firms,
                and individual leaders in making evidence-based decisions and
                managing key stakeholders effectively. ACRC delivers analysis
                that is independent, nonpartisan, and insulated from personal or
                group interests. We are also committed to cultivating
                Indonesia’s next generation of leaders by developing lawful,
                well-structured winning strategies.
              </p>
            </div>
            {/* <div className="bg-muted rounded-lg p-10 border border-border h-full flex items-center justify-center min-h-80">
              <div className="text-center">
                <p className="font-serif text-6xl font-bold text-foreground mb-3">Since 2010</p>
                <p className="text-muted-foreground text-lg">Advancing Indonesian policy analysis</p>
              </div>
            </div> */}
            <div
              className="rounded-lg border border-border w-full aspect-[3/2] bg-cover bg-center"
              style={{
                backgroundImage: "url('/picture/ilustrasi-keadilan.jpg')",
              }}
            >
              {/* <div className="text-center bg-black/40 backdrop-blur-sm rounded-lg p-6">
                <p className="font-serif text-6xl font-bold text-white mb-3">
                  Since 2010
                </p>
                <p className="text-white/80 text-lg">
                  Advancing Indonesian policy analysis
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section
        id="vision-mission"
        className="py-16 md:py-24 border-b border-border scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-5xl font-bold text-foreground mb-12">
            Vision & Mission
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="p-10 rounded-lg border border-border bg-card">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-5">
                Vision
              </h3>
              <p className="text-foreground leading-relaxed text-lg">
                To be a trusted thought partner for Indonesia’s policymakers and
                business leaders in shaping strategies and work plans that are
                grounded in data and respectful of the country’s governance
                traditions.
              </p>
            </div>
            <div className="p-10 rounded-lg border border-border bg-card">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-5">
                Mission
              </h3>
              <ul className="text-foreground leading-relaxed text-lg list-disc pl-6 space-y-3">
                <li>
                  Produce research that is auditable, relevant, and accessible
                  to decision-makers.
                </li>
                <li>
                  Help clients structure risks and opportunities based on law,
                  policy, and field realities.
                </li>
                <li>
                  Uphold high standards of ethics, confidentiality, and
                  bureaucratic etiquette.
                </li>
                <li>
                  Strengthen clients’ internal capacity through dialogue,
                  training, and knowledge transfer.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section
        id="values"
        className="py-16 md:py-24 border-b border-border bg-muted/30 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-5xl font-bold text-foreground mb-12">
            Our Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Navigating Disruption",
                description:
                  "At Aksara Cakra Research and Consulting, our mission is to equip clients with practical tools and clear insights for a world where geopolitical, geostrategic, and geoeconomic shifts frequently create disruption. We aim to be a trusted research and consulting partner for organizations and leaders who view disruption not only as a challenge but as an opportunity to create value and improve outcomes.",
              },
              {
                title: "Disciplined Curiosity",
                description:
                  "At our core is a disciplined curiosity about human behavior and complexity, which drives continuous inquiry and analysis. We pair that curiosity with independence and methodological rigor to uphold the highest standards of quality. Our insights help decision-makers clearly grasp how geopolitical, geostrategic, and geoeconomic shifts shape markets and political dynamics—and what those shifts mean for their choices.",
              },
              {
                title: "Integrity & Creativity",
                description:
                  "We ground our work in integrity with data, intellectual bravery, and practical creativity. We pursue results alongside our clients and treat missteps as lessons to strengthen quality and productivity. Our value lies in pairing rigorous analysis with timely, usable guidance.",
              },
              {
                title: "Non-negotiable Rigor",
                description:
                  "Rigor is nonnegotiable. ACRC examines every angle, tests each detail, and verifies all sources. We aim to uncover the facts and the underlying narrative of each event. We review information carefully, remove what is immaterial, and deliver insights that can drive better outcomes. We uphold strict confidentiality and integrity in all contexts, including difficult or sensitive settings.",
              },
              {
                title: "Strict Research Ethics",
                description:
                  "Above all, we uphold strict research ethics. We protect respondent identities, process personal data only when necessary, disclose any potential conflicts of interest, and refrain from drawing conclusions when the evidence is insufficient.",
              },
              {
                title: "Public Trust",
                description:
                  "We place public trust above any single project. When uncertainty exists, we state it plainly and outline next steps to gather additional evidence, rather than claim certainty that the data cannot support.",
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

      {/* Organizational Structure */}
      <section
        id="structure"
        className="py-16 md:py-24 border-b border-border scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-5xl font-bold text-foreground mb-12">
            Organizational Structure
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              ACRC is organized around two core pillars: the Research Division
              and the Consulting Division.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-serif text-3xl font-bold text-foreground mb-4">
                  Research Division
                </h3>
                <p className="text-muted-foreground mb-4">
                  Led by a Director of Research (DoR), this division produces
                  auditable, timely, and policy-oriented research. It comprises:
                </p>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">
                        Security, Defense, and International Relations
                      </strong>
                      : Geopolitics, defense posture, and maritime security.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">
                        Politics, Public Policy, and Social Affairs
                      </strong>
                      : Political dynamics, policy governance, and social
                      issues.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">Economics</strong>:
                      Macroeconomic trends, fiscal policy, industry, and trade.
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-serif text-3xl font-bold text-foreground mb-4">
                  Consulting Division
                </h3>
                <p className="text-muted-foreground mb-4">
                  Led by a Director of Consulting (DoC), this division converts
                  research into measurable strategies. Key departments include:
                </p>
                <ul className="space-y-3">
                  {[
                    "Public Policy & Government Relations",
                    "Risk & Opportunity Management",
                    "Legal & Regulatory Compliance Advisory",
                    "Communications & Public Affairs",
                    "Political Consulting & Campaign Services",
                    "ESG & Sustainability",
                    "Economic & Sectoral Advisory",
                  ].map((dept, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                      <span className="text-foreground">{dept}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Research Instruments */}
      <section
        id="instruments"
        className="py-16 md:py-24 border-b border-border bg-muted/30 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-5xl font-bold text-foreground mb-6">
            Our Research Instruments
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mb-12">
            Beyond diverse scientific approaches, we employ big data as a
            disciplined process to help clients make informed, fast, and
            less-risky decisions. We turn fragmented datasets—sales records,
            traffic flows, geospatial info—into a dependable knowledge base.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Clearer Visibility",
                desc: "Track demand across multiple signals (sales, visits, search behavior) to optimize staffing, inventory, and layout.",
              },
              {
                title: "Precise Targeting",
                desc: "Build practical segments based on transaction patterns to improve response rates and reduce acquisition costs.",
              },
              {
                title: "Early Warning",
                desc: "Monitor key indicators with set thresholds to detect demand drops or supply disruptions early.",
              },
              {
                title: "Realistic Budgeting",
                desc: "Use simple, auditable forecasting models for sales and logistics based on seasonality and local patterns.",
              },
              {
                title: "Fair Evaluation",
                desc: "Compare intervention areas with control groups to prove impact and justify promotional or public spending.",
              },
            ].map((benefit, i) => (
              <div
                key={i}
                className="p-6 rounded-lg bg-background border border-border shadow-sm"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="font-serif font-bold text-primary">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-background rounded-2xl p-8 md:p-12 border border-border">
            <h3 className="font-serif text-3xl font-bold text-foreground mb-8 text-center">
              Our Data Principles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Governance",
                  desc: "Clear ownership, access rules, and change records.",
                },
                {
                  title: "Confidentiality",
                  desc: "Minimizing personal data and storing identity keys separately.",
                },
                {
                  title: "Traceability",
                  desc: "Logs recording data origin, update time, and processing steps.",
                },
                {
                  title: "Simplicity",
                  desc: "Simple reports with a few indicators that truly matter.",
                },
              ].map((principle, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-foreground" />
                  </div>
                  <h4 className="font-bold text-foreground mb-2">
                    {principle.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {principle.desc}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-center text-muted-foreground mt-8 max-w-2xl mx-auto">
              "Data is a trust, not a commodity. We place ethics at the center
              of our work."
            </p>
          </div>
        </div>
      </section>

      <section id="how-we-work" className="py-16 md:py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-5xl font-bold text-foreground mb-12">
            How We Work
          </h2>

          <div className="space-y-8">
            {[
              {
                number: "01",
                title: "Initial Diagnosis",
                description:
                  "We review key documents, speak with relevant stakeholders, and clarify the questions that truly matter.",
              },
              {
                number: "02",
                title: "Framework & Work Plan",
                description:
                  "We agree on core questions, methods, timeline, deliverables, and decision points.",
              },
              {
                number: "03",
                title: "Data Collection & Processing",
                description:
                  "We combine fieldwork, internal data, and official sources into a coherent information base.",
              },
              {
                number: "04",
                title: "Analysis & Options",
                description:
                  "We develop scenarios with clear implications for costs, risks, and opportunities.",
              },
              {
                number: "05",
                title: "Action Plan",
                description:
                  "We turn recommendations into concrete tasks: who does what, by when, and with which indicators.",
              },
              {
                number: "06",
                title: "Implementation Support",
                description:
                  "We help monitor progress and adjust the plan when conditions change, if requested.",
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
          <h2 className="font-serif text-5xl font-bold text-foreground mb-6">
            Work With ACRC
          </h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Ready to engage ACRC for your research or consulting needs? Let's
            start a conversation.
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
  );
}
