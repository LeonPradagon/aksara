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

import { useLocale } from "@/contexts/locale-context";

export default function ServicesPage() {
  const { t } = useLocale();

  const researchDepts = [
    {
      id: "defense-security",
      title: t("services.research.defense_security.title"),
      icon: <Shield className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p>{t("services.research.defense_security.desc")}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <h4 className="font-semibold mb-2">
                {t("services.research.defense_security.focus_title")}
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>{t("services.research.defense_security.focus_list.0")}</li>
                <li>{t("services.research.defense_security.focus_list.1")}</li>
                <li>{t("services.research.defense_security.focus_list.2")}</li>
                <li>{t("services.research.defense_security.focus_list.3")}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">
                {t("services.research.defense_security.output_title")}
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>{t("services.research.defense_security.output_list.0")}</li>
                <li>{t("services.research.defense_security.output_list.1")}</li>
                <li>{t("services.research.defense_security.output_list.2")}</li>
                <li>{t("services.research.defense_security.output_list.3")}</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "politics-policy",
      title: t("services.research.politics_policy.title"),
      icon: <FileText className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p>{t("services.research.politics_policy.desc")}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <h4 className="font-semibold mb-2">
                {t("services.research.politics_policy.focus_title")}
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>{t("services.research.politics_policy.focus_list.0")}</li>
                <li>{t("services.research.politics_policy.focus_list.1")}</li>
                <li>{t("services.research.politics_policy.focus_list.2")}</li>
                <li>{t("services.research.politics_policy.focus_list.3")}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">
                {t("services.research.politics_policy.output_title")}
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>{t("services.research.politics_policy.output_list.0")}</li>
                <li>{t("services.research.politics_policy.output_list.1")}</li>
                <li>{t("services.research.politics_policy.output_list.2")}</li>
                <li>{t("services.research.politics_policy.output_list.3")}</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "economics",
      title: t("services.research.economics.title"),
      icon: <TrendingUp className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p>{t("services.research.economics.desc")}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <h4 className="font-semibold mb-2">
                {t("services.research.economics.focus_title")}
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>{t("services.research.economics.focus_list.0")}</li>
                <li>{t("services.research.economics.focus_list.1")}</li>
                <li>{t("services.research.economics.focus_list.2")}</li>
                <li>{t("services.research.economics.focus_list.3")}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">
                {t("services.research.economics.output_title")}
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>{t("services.research.economics.output_list.0")}</li>
                <li>{t("services.research.economics.output_list.1")}</li>
                <li>{t("services.research.economics.output_list.2")}</li>
                <li>{t("services.research.economics.output_list.3")}</li>
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
      title: t("services.consulting.gov_relations.title"),
      icon: <Building2 className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p>{t("services.consulting.gov_relations.desc")}</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>{t("services.consulting.gov_relations.list.0")}</li>
            <li>{t("services.consulting.gov_relations.list.1")}</li>
            <li>{t("services.consulting.gov_relations.list.2")}</li>
            <li>{t("services.consulting.gov_relations.list.3")}</li>
            <li>{t("services.consulting.gov_relations.list.4")}</li>
          </ul>
        </div>
      ),
    },
    {
      id: "risk-opportunity",
      title: t("services.consulting.risk_opportunity.title"),
      icon: <AlertTriangle className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p>{t("services.consulting.risk_opportunity.desc")}</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>{t("services.consulting.risk_opportunity.list.0")}</li>
            <li>{t("services.consulting.risk_opportunity.list.1")}</li>
            <li>{t("services.consulting.risk_opportunity.list.2")}</li>
            <li>{t("services.consulting.risk_opportunity.list.3")}</li>
          </ul>
        </div>
      ),
    },
    {
      id: "strategic-planning",
      title: t("services.consulting.strategic_planning.title"),
      icon: <TrendingUp className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p>{t("services.consulting.strategic_planning.desc")}</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>{t("services.consulting.strategic_planning.list.0")}</li>
            <li>{t("services.consulting.strategic_planning.list.1")}</li>
            <li>{t("services.consulting.strategic_planning.list.2")}</li>
            <li>{t("services.consulting.strategic_planning.list.3")}</li>
          </ul>
        </div>
      ),
    },
    {
      id: "legal-compliance",
      title: t("services.consulting.legal_compliance.title"),
      icon: <Scale className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p>{t("services.consulting.legal_compliance.desc")}</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>{t("services.consulting.legal_compliance.list.0")}</li>
            <li>{t("services.consulting.legal_compliance.list.1")}</li>
            <li>{t("services.consulting.legal_compliance.list.2")}</li>
            <li>{t("services.consulting.legal_compliance.list.3")}</li>
          </ul>
        </div>
      ),
    },
    {
      id: "political-consulting",
      title: t("services.consulting.political_consulting.title"),
      icon: <Vote className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p>{t("services.consulting.political_consulting.desc")}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div>
              <strong className="block text-sm mb-1">
                {t(
                  "services.consulting.political_consulting.campaign_strategy.title",
                )}
              </strong>
              <p className="text-xs text-muted-foreground">
                {t(
                  "services.consulting.political_consulting.campaign_strategy.desc",
                )}
              </p>
            </div>
            <div>
              <strong className="block text-sm mb-1">
                {t(
                  "services.consulting.political_consulting.survey_research.title",
                )}
              </strong>
              <p className="text-xs text-muted-foreground">
                {t(
                  "services.consulting.political_consulting.survey_research.desc",
                )}
              </p>
            </div>
            <div>
              <strong className="block text-sm mb-1">
                {t(
                  "services.consulting.political_consulting.campaign_management.title",
                )}
              </strong>
              <p className="text-xs text-muted-foreground">
                {t(
                  "services.consulting.political_consulting.campaign_management.desc",
                )}
              </p>
            </div>
            <div>
              <strong className="block text-sm mb-1">
                {t(
                  "services.consulting.political_consulting.personal_branding.title",
                )}
              </strong>
              <p className="text-xs text-muted-foreground">
                {t(
                  "services.consulting.political_consulting.personal_branding.desc",
                )}
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "communications",
      title: t("services.consulting.communications.title"),
      icon: <Megaphone className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p>{t("services.consulting.communications.desc")}</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>{t("services.consulting.communications.list.0")}</li>
            <li>{t("services.consulting.communications.list.1")}</li>
            <li>{t("services.consulting.communications.list.2")}</li>
            <li>{t("services.consulting.communications.list.3")}</li>
          </ul>
        </div>
      ),
    },
    {
      id: "esg",
      title: t("services.consulting.esg.title"),
      icon: <Leaf className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p>{t("services.consulting.esg.desc")}</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>{t("services.consulting.esg.list.0")}</li>
            <li>{t("services.consulting.esg.list.1")}</li>
            <li>{t("services.consulting.esg.list.2")}</li>
          </ul>
        </div>
      ),
    },
    {
      id: "economic-advisory",
      title: t("services.consulting.economic_advisory.title"),
      icon: <Briefcase className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p>{t("services.consulting.economic_advisory.desc")}</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>{t("services.consulting.economic_advisory.list.0")}</li>
            <li>{t("services.consulting.economic_advisory.list.1")}</li>
            <li>{t("services.consulting.economic_advisory.list.2")}</li>
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
            {t("services.title")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl leading-relaxed">
            {t("services.subtitle")}
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
                  {t("services.tabs.research")}
                </TabsTrigger>
                <TabsTrigger
                  value="consulting"
                  className="px-8 py-3 rounded-full text-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  {t("services.tabs.consulting")}
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent
              value="research"
              className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 className="font-serif text-4xl font-bold mb-4">
                  {t("services.research.title")}
                </h2>
                <p className="text-muted-foreground text-lg">
                  {t("services.research.desc")}
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
                  {t("services.consulting.title")}
                </h2>
                <p className="text-muted-foreground text-lg">
                  {t("services.consulting.desc")}
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
            {t("services.cta.title")}
          </h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            {t("services.cta.desc")}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded hover:opacity-90 transition-opacity"
          >
            {t("services.cta.btn")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
