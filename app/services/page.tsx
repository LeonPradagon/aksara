"use client";

import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  Shield,
  FileText,
  TrendingUp,
  Building2,
  AlertTriangle,
  Scale,
  Megaphone,
  Vote,
  Leaf,
  Briefcase,
} from "lucide-react";

export default function ServicesPage() {
  const researchDepts = [
    {
      id: "defense-security",
      title: "1. Department of Defense, Security, and International Relations",
      icon: <Shield className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p>
            Indonesia is an archipelagic state with vital sea lanes, long
            borders, and rich natural resources. Defense and security are
            inseparable from economic management. We track shifts in the
            regional strategic landscape, monitor partner-country policies, and
            assess defense trade implications.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <h4 className="font-semibold mb-2">Key Focus Areas:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Regional strategic landscape monitoring</li>
                <li>Defense modernization & industrial capacity</li>
                <li>Maritime security (North Natuna Sea, Malacca Strait)</li>
                <li>International partnerships & diplomacy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Key Outputs:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Policy briefs & risk outlooks</li>
                <li>Partnership matrices</li>
                <li>Sector-specific risk maps</li>
                <li>SOPs for ports & industrial zones</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "politics-policy",
      title: "2. Department of Political Studies, Policy, and Social Issues",
      icon: <FileText className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p>
            We monitor politics and policy governance at national and regional
            levels. Our role is to organize knowledge about Indonesia’s diverse
            political landscape and translate it into actionable policy options.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <h4 className="font-semibold mb-2">Key Focus Areas:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Policy analysis & Regulatory Impact Assessment (RIA)</li>
                <li>Political Economy Analysis (PEA)</li>
                <li>Program planning & evaluation (M&E)</li>
                <li>Social listening & public opinion</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Key Outputs:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Policy briefs & actor maps</li>
                <li>Public consultation drafts</li>
                <li>Program evaluation reports</li>
                <li>Interactive indicator dashboards</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "economics",
      title: "3. Department of Economic Studies",
      icon: <TrendingUp className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p>
            We link academic inquiry with practical client needs, answering key
            economic questions using auditable methods. We design rigorous
            studies so decisions are grounded in evidence.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <h4 className="font-semibold mb-2">Key Focus Areas:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Macroeconomic trends & fiscal policy</li>
                <li>Sectoral analysis (Manufacturing, Energy, Digital)</li>
                <li>Cost-benefit analysis</li>
                <li>Investment climate assessment</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Key Outputs:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Sector outlooks & fiscal notes</li>
                <li>Supply-chain analyses</li>
                <li>Regional investment maps</li>
                <li>Impact measurement reports</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const consultingDepts = [
    {
      id: "gov-relations",
      title: "1. Government Relations",
      icon: <Building2 className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p>
            We serve as an early warning system and official bridge aligning
            business strategies with national priorities. We help clients build
            credibility and trust with policymakers.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>Policy intelligence & regulatory monitoring</li>
            <li>Social license to operate strategies</li>
            <li>Stakeholder engagement & partnership building</li>
            <li>Issue & crisis management</li>
            <li>Regulatory risk registers & war rooms</li>
          </ul>
        </div>
      ),
    },
    {
      id: "risk-opportunity",
      title: "2. Risk and Opportunity Management",
      icon: <AlertTriangle className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p>
            We help clients navigate the intersection of politics and business,
            turning risk management from a defensive activity into a strategic
            capability.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>Integrated risk & opportunity maps</li>
            <li>Market-entry due diligence</li>
            <li>Compliance & licensing roadmaps</li>
            <li>100-day actionable recommendation plans</li>
          </ul>
        </div>
      ),
    },
    {
      id: "strategic-planning",
      title: "3. Strategic Planning Development",
      icon: <TrendingUp className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p>
            We integrate insights to help clients prioritize and interpret
            emerging global and domestic trends. We are partners in
            implementation, ensuring ideas deliver tangible results.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>Market sizing & competitor analysis</li>
            <li>Scenario planning</li>
            <li>Partnership negotiation frameworks</li>
            <li>Investment roadmaps</li>
          </ul>
        </div>
      ),
    },
    {
      id: "legal-compliance",
      title: "4. Legal Assistance and Regulatory Compliance",
      icon: <Scale className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p>
            We treat legal assistance as essential groundwork. We intervene
            early to design compliance roadmaps that keep organizations on
            track.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>Obligation maps (OSS, SNI, TKDN, etc.)</li>
            <li>SOP design & alignment</li>
            <li>Contract review & drafting</li>
            <li>Audit support & dispute resolution</li>
          </ul>
        </div>
      ),
    },
    {
      id: "political-consulting",
      title: "5. Political Consulting Services",
      icon: <Vote className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p>
            We help governments, parties, and leaders make the right decisions.
            We combine policy analysis, stakeholder mapping, and strategic
            communication.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div>
              <strong className="block text-sm mb-1">Campaign Strategy</strong>
              <p className="text-xs text-muted-foreground">
                Data-driven positioning, message architecture, and field
                organization.
              </p>
            </div>
            <div>
              <strong className="block text-sm mb-1">Survey & Research</strong>
              <p className="text-xs text-muted-foreground">
                Rigorous public opinion studies and performance evaluations.
              </p>
            </div>
            <div>
              <strong className="block text-sm mb-1">
                Campaign Management
              </strong>
              <p className="text-xs text-muted-foreground">
                End-to-end management from strategy to election day operations.
              </p>
            </div>
            <div>
              <strong className="block text-sm mb-1">Personal Branding</strong>
              <p className="text-xs text-muted-foreground">
                Authentic narrative building and reputation management.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "communications",
      title: "6. Management of Political Communication",
      icon: <Megaphone className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p>
            We design and manage every element of communication so leaders
            appear reliable, grounded, and trustworthy.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>Message architecture development</li>
            <li>Speech writing & Q&A preparation</li>
            <li>Media relations & digital engagement</li>
            <li>Crisis communication & clarification</li>
          </ul>
        </div>
      ),
    },
    {
      id: "esg",
      title: "7. ESG & Sustainability (Consulting)",
      icon: <Leaf className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p>
            We help clients align sustainability goals with national policy,
            treating ESG as a strategic investment.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>Environmental-social compliance maps</li>
            <li>Decarbonization initiative support</li>
            <li>Community partnership programs</li>
          </ul>
        </div>
      ),
    },
    {
      id: "economic-advisory",
      title: "8. Economic & Sectoral Advisory",
      icon: <Briefcase className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p>
            We conduct market-entry studies, sector analyses, and investment
            planning to support measurable business growth.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>Market entry studies</li>
            <li>Local content (TKDN) assessments</li>
            <li>Partnership strategies</li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-6xl md:text-7xl font-bold text-foreground mb-6">
            Our Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl leading-relaxed">
            ACRC offers integrated services: policy research, data analytics,
            corporate consulting, and political consulting. All share the same
            foundation: respect for facts, for the law, and for Indonesia's
            institutional realities.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="research" className="space-y-12">
            <div className="flex justify-center">
              <TabsList className="bg-muted p-1 h-auto rounded-full">
                <TabsTrigger
                  value="research"
                  className="px-8 py-3 rounded-full text-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  Research Division
                </TabsTrigger>
                <TabsTrigger
                  value="consulting"
                  className="px-8 py-3 rounded-full text-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  Consulting Division
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent
              value="research"
              className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 className="font-serif text-4xl font-bold mb-4">
                  Research Division
                </h2>
                <p className="text-muted-foreground text-lg">
                  Our center for knowledge creation, delivering auditable,
                  timely, and policy-oriented research for immediate client use.
                </p>
              </div>

              <div className="grid gap-6 max-w-4xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                  {researchDepts.map((dept) => (
                    <AccordionItem
                      key={dept.id}
                      value={dept.id}
                      className="border rounded-lg bg-card px-6 mb-4"
                    >
                      <AccordionTrigger className="hover:no-underline py-6">
                        <div className="flex items-center gap-4 text-left">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                            {dept.icon}
                          </div>
                          <div>
                            <span className="font-serif text-xl font-bold block">
                              {dept.title}
                            </span>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-0 pb-6 pl-[3.5rem] pr-4 text-base leading-relaxed">
                        {dept.content}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>

            <TabsContent
              value="consulting"
              className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 className="font-serif text-4xl font-bold mb-4">
                  Consulting Division
                </h2>
                <p className="text-muted-foreground text-lg">
                  Converting research findings into measurable strategies,
                  programs, and execution plans for corporate and political
                  clients.
                </p>
              </div>

              <div className="grid gap-6 max-w-4xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                  {consultingDepts.map((dept) => (
                    <AccordionItem
                      key={dept.id}
                      value={dept.id}
                      className="border rounded-lg bg-card px-6 mb-4"
                    >
                      <AccordionTrigger className="hover:no-underline py-6">
                        <div className="flex items-center gap-4 text-left">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                            {dept.icon}
                          </div>
                          <div>
                            <span className="font-serif text-xl font-bold block">
                              {dept.title}
                            </span>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-0 pb-6 pl-[3.5rem] pr-4 text-base leading-relaxed">
                        {dept.content}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 border-t border-border bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Let's Discuss Your Needs
          </h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Contact ACRC to explore how our research and consulting services can
            support your strategic objectives.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded hover:opacity-90 transition-opacity"
          >
            Get In Touch
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
