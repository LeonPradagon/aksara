"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useLocale } from "@/contexts/locale-context";
import Link from "next/link";
import { ArrowRight, Building2, Users, TrendingUp } from "lucide-react";

export default function OrganizationalStructurePage() {
  const { t } = useLocale();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-primary/10 border-b border-border">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                <Building2 className="w-4 h-4" />
                <span>Struktur Organisasi</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">
                {t("about.structure_title")}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {t("about.structure_intro")}
              </p>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
        </section>

        {/* Research Division */}
        <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                <TrendingUp className="w-4 h-4" />
                <span>Riset & Analisis</span>
              </div>
              <h2 className="text-4xl font-serif font-bold mb-8">
                {t("structure.research.title")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-5xl leading-relaxed">
                {t("structure.research.intro")}
              </p>
            </div>

            {/* Department 1: Defense, Security, and International Relations */}
            <div className="mb-20 group">
              <div className="bg-card border border-border rounded-2xl p-8 md:p-12 hover:shadow-2xl hover:border-primary/50 transition-all duration-300">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0 group-hover:scale-110 transition-transform">
                    <span className="text-2xl font-bold">1</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold flex-1">
                    {t("structure.research.defense.title")}
                  </h3>
                </div>
                <div className="prose max-w-none text-muted-foreground space-y-4 pl-0 md:pl-16">
                  <p className="leading-relaxed">
                    {t("structure.research.defense.para1")}
                  </p>
                  <p className="leading-relaxed">
                    {t("structure.research.defense.para2")}
                  </p>
                  <p className="leading-relaxed">
                    {t("structure.research.defense.para3")}
                  </p>
                  <p className="leading-relaxed">
                    {t("structure.research.defense.para4")}
                  </p>
                  <p className="leading-relaxed">
                    {t("structure.research.defense.para5")}
                  </p>
                  <p className="leading-relaxed">
                    {t("structure.research.defense.para6")}
                  </p>
                  <p className="leading-relaxed">
                    {t("structure.research.defense.para7")}
                  </p>
                  <p className="leading-relaxed">
                    {t("structure.research.defense.para8")}
                  </p>
                </div>
              </div>
            </div>

            {/* Department 2: Political Studies, Policy, and Social Issues */}
            <div className="mb-20 group">
              <div className="bg-card border border-border rounded-2xl p-8 md:p-12 hover:shadow-2xl hover:border-primary/50 transition-all duration-300">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0 group-hover:scale-110 transition-transform">
                    <span className="text-2xl font-bold">2</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold flex-1">
                    {t("structure.research.politics.title")}
                  </h3>
                </div>
                <div className="prose max-w-none text-muted-foreground space-y-4 pl-0 md:pl-16">
                  <p className="leading-relaxed">
                    {t("structure.research.politics.para1")}
                  </p>
                  <p className="leading-relaxed">
                    {t("structure.research.politics.para2")}
                  </p>
                  <p className="leading-relaxed">
                    {t("structure.research.politics.para3")}
                  </p>
                  <p className="leading-relaxed">
                    {t("structure.research.politics.para4")}
                  </p>
                  <p className="leading-relaxed">
                    {t("structure.research.politics.para5")}
                  </p>
                  <p className="leading-relaxed">
                    {t("structure.research.politics.para6")}
                  </p>
                  <p className="leading-relaxed">
                    {t("structure.research.politics.para7")}
                  </p>
                  <p className="leading-relaxed">
                    {t("structure.research.politics.para8")}
                  </p>
                  <p className="leading-relaxed">
                    {t("structure.research.politics.para9")}
                  </p>
                </div>
              </div>
            </div>

            {/* Department 3: Economic Studies */}
            <div className="mb-20 group">
              <div className="bg-card border border-border rounded-2xl p-8 md:p-12 hover:shadow-2xl hover:border-primary/50 transition-all duration-300">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0 group-hover:scale-110 transition-transform">
                    <span className="text-2xl font-bold">3</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold flex-1">
                    {t("structure.research.economics.title")}
                  </h3>
                </div>
                <div className="prose max-w-none text-muted-foreground space-y-4 pl-0 md:pl-16">
                  <p className="leading-relaxed">
                    {t("structure.research.economics.para1")}
                  </p>
                  <p className="leading-relaxed">
                    {t("structure.research.economics.para2")}
                  </p>
                  <p className="leading-relaxed">
                    {t("structure.research.economics.para3")}
                  </p>
                  <p className="leading-relaxed">
                    {t("structure.research.economics.para4")}
                  </p>
                  <p className="leading-relaxed">
                    {t("structure.research.economics.para5")}
                  </p>
                  <p className="leading-relaxed">
                    {t("structure.research.economics.para6")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-border"></div>

        {/* Consulting Division */}
        <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                <Users className="w-4 h-4" />
                <span>Konsultansi & Strategi</span>
              </div>
              <h2 className="text-4xl font-serif font-bold mb-8">
                {t("structure.consulting.title")}
              </h2>
            </div>

            {/* Corporate/Private Sector Services */}
            <div className="mb-20">
              <div className="bg-gradient-to-br from-primary/5 to-background border border-border rounded-2xl p-8 md:p-12 mb-12">
                <h3 className="text-3xl font-serif font-bold mb-6">
                  {t("structure.consulting.corporate.title")}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t("structure.consulting.corporate.intro")}
                </p>
              </div>

              {/* 1.1 Government Relations */}
              <div className="mb-12 group">
                <div className="bg-card border border-border rounded-xl p-6 md:p-10 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                  <h4 className="text-xl font-serif font-bold mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-sm flex-shrink-0">
                      1.1
                    </span>
                    {t("structure.consulting.corporate.gov_relations.title")}
                  </h4>
                  <div className="prose max-w-none text-muted-foreground space-y-4">
                    <p className="leading-relaxed">
                      {t("structure.consulting.corporate.gov_relations.para1")}
                    </p>
                    <p className="leading-relaxed">
                      {t("structure.consulting.corporate.gov_relations.para2")}
                    </p>
                    <p className="leading-relaxed">
                      {t("structure.consulting.corporate.gov_relations.para3")}
                    </p>
                    <p className="leading-relaxed">
                      {t("structure.consulting.corporate.gov_relations.para4")}
                    </p>
                    <p className="leading-relaxed">
                      {t("structure.consulting.corporate.gov_relations.para5")}
                    </p>
                    <p className="leading-relaxed">
                      {t("structure.consulting.corporate.gov_relations.para6")}
                    </p>
                    <p className="leading-relaxed">
                      {t("structure.consulting.corporate.gov_relations.para7")}
                    </p>
                    <p className="leading-relaxed">
                      {t("structure.consulting.corporate.gov_relations.para8")}
                    </p>
                    <p className="leading-relaxed">
                      {t("structure.consulting.corporate.gov_relations.para9")}
                    </p>
                    <p className="leading-relaxed">
                      {t("structure.consulting.corporate.gov_relations.para10")}
                    </p>
                    <p className="leading-relaxed">
                      {t("structure.consulting.corporate.gov_relations.para11")}
                    </p>
                  </div>
                </div>
              </div>

              {/* 1.2 Risk and Opportunity Management */}
              <div className="mb-12 group">
                <div className="bg-card border border-border rounded-xl p-6 md:p-10 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                  <h4 className="text-xl md:text-2xl font-serif font-bold mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-sm flex-shrink-0">
                      1.2
                    </span>
                    {t("structure.consulting.corporate.risk_mgmt.title")}
                  </h4>
                  <div className="prose max-w-none text-muted-foreground space-y-4">
                    <p className="leading-relaxed">
                      {t("structure.consulting.corporate.risk_mgmt.para1")}
                    </p>
                    <p className="leading-relaxed">
                      {t("structure.consulting.corporate.risk_mgmt.para2")}
                    </p>
                    <p className="leading-relaxed">
                      {t("structure.consulting.corporate.risk_mgmt.para3")}
                    </p>
                    <p className="leading-relaxed">
                      {t("structure.consulting.corporate.risk_mgmt.para4")}
                    </p>
                    <p className="leading-relaxed">
                      {t("structure.consulting.corporate.risk_mgmt.para5")}
                    </p>
                    <p className="leading-relaxed">
                      {t("structure.consulting.corporate.risk_mgmt.para6")}
                    </p>
                    <p className="leading-relaxed">
                      {t("structure.consulting.corporate.risk_mgmt.para7")}
                    </p>
                  </div>
                </div>
              </div>

              {/* 1.3 Strategic Planning Development */}
              <div className="mb-12 group">
                <div className="bg-card border border-border rounded-xl p-6 md:p-10 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                  <h4 className="text-xl md:text-2xl font-serif font-bold mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-sm flex-shrink-0">
                      1.3
                    </span>
                    {t(
                      "structure.consulting.corporate.strategic_planning.title",
                    )}
                  </h4>
                  <div className="prose max-w-none text-muted-foreground space-y-4">
                    <p className="leading-relaxed">
                      {t(
                        "structure.consulting.corporate.strategic_planning.para1",
                      )}
                    </p>
                    <p className="leading-relaxed">
                      {t(
                        "structure.consulting.corporate.strategic_planning.para2",
                      )}
                    </p>
                    <p className="leading-relaxed">
                      {t(
                        "structure.consulting.corporate.strategic_planning.para3",
                      )}
                    </p>
                    <p className="leading-relaxed">
                      {t(
                        "structure.consulting.corporate.strategic_planning.para4",
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* 1.4 Legal Assistance and Regulatory Compliance */}
              <div className="mb-12 group">
                <div className="bg-card border border-border rounded-xl p-6 md:p-10 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                  <h4 className="text-xl md:text-2xl font-serif font-bold mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-sm flex-shrink-0">
                      1.4
                    </span>
                    {t("structure.consulting.corporate.legal.title")}
                  </h4>
                  <div className="prose max-w-none text-muted-foreground space-y-4">
                    <p className="leading-relaxed">
                      {t("structure.consulting.corporate.legal.para1")}
                    </p>
                    <p className="leading-relaxed">
                      {t("structure.consulting.corporate.legal.para2")}
                    </p>
                    <p className="leading-relaxed">
                      {t("structure.consulting.corporate.legal.para3")}
                    </p>
                    <p className="leading-relaxed">
                      {t("structure.consulting.corporate.legal.para4")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Political Consultancy Services */}
            <div className="mb-20">
              <div className="bg-gradient-to-br from-primary/5 to-background border border-border rounded-2xl p-8 md:p-12 mb-12">
                <h3 className="text-3xl font-serif font-bold mb-6">
                  {t("structure.consulting.political.title")}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t("structure.consulting.political.intro")}
                </p>
              </div>

              {/* 2.1 Campaign Strategy */}
              <div className="mb-12 group">
                <div className="bg-card border border-border rounded-xl p-6 md:p-10 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                  <h4 className="text-xl md:text-2xl font-serif font-bold mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-sm flex-shrink-0">
                      2.1
                    </span>
                    {t(
                      "structure.consulting.political.campaign_strategy.title",
                    )}
                  </h4>
                  <div className="prose max-w-none text-muted-foreground space-y-4">
                    <p className="leading-relaxed">
                      {t(
                        "structure.consulting.political.campaign_strategy.para1",
                      )}
                    </p>
                    <p className="leading-relaxed">
                      {t(
                        "structure.consulting.political.campaign_strategy.para2",
                      )}
                    </p>
                    <p className="leading-relaxed">
                      {t(
                        "structure.consulting.political.campaign_strategy.para3",
                      )}
                    </p>
                    <p className="leading-relaxed">
                      {t(
                        "structure.consulting.political.campaign_strategy.para4",
                      )}
                    </p>
                    <p className="leading-relaxed">
                      {t(
                        "structure.consulting.political.campaign_strategy.para5",
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* 2.2 Survey */}
              <div className="mb-12 group">
                <div className="bg-card border border-border rounded-xl p-6 md:p-10 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                  <h4 className="text-xl md:text-2xl font-serif font-bold mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-sm flex-shrink-0">
                      2.2
                    </span>
                    {t("structure.consulting.political.survey.title")}
                  </h4>
                  <div className="prose max-w-none text-muted-foreground space-y-4">
                    <p className="leading-relaxed">
                      {t("structure.consulting.political.survey.para1")}
                    </p>
                    <p className="leading-relaxed">
                      {t("structure.consulting.political.survey.para2")}
                    </p>
                    <p className="leading-relaxed">
                      {t("structure.consulting.political.survey.para3")}
                    </p>
                    <p className="leading-relaxed">
                      {t("structure.consulting.political.survey.para4")}
                    </p>
                  </div>
                </div>
              </div>

              {/* 2.3 Campaign Management */}
              <div className="mb-12 group">
                <div className="bg-card border border-border rounded-xl p-6 md:p-10 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                  <h4 className="text-xl md:text-2xl font-serif font-bold mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-sm flex-shrink-0">
                      2.3
                    </span>
                    {t("structure.consulting.political.campaign_mgmt.title")}
                  </h4>
                  <div className="prose max-w-none text-muted-foreground space-y-4">
                    <p className="leading-relaxed">
                      {t("structure.consulting.political.campaign_mgmt.para1")}
                    </p>
                    <p className="leading-relaxed">
                      {t("structure.consulting.political.campaign_mgmt.para2")}
                    </p>
                    <p className="leading-relaxed">
                      {t("structure.consulting.political.campaign_mgmt.para3")}
                    </p>
                    <p className="leading-relaxed">
                      {t("structure.consulting.political.campaign_mgmt.para4")}
                    </p>
                  </div>
                </div>
              </div>

              {/* 2.4 Personal Branding */}
              <div className="mb-12 group">
                <div className="bg-card border border-border rounded-xl p-6 md:p-10 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                  <h4 className="text-xl md:text-2xl font-serif font-bold mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-sm flex-shrink-0">
                      2.4
                    </span>
                    {t(
                      "structure.consulting.political.personal_branding.title",
                    )}
                  </h4>
                  <div className="prose max-w-none text-muted-foreground space-y-4">
                    <p className="leading-relaxed">
                      {t(
                        "structure.consulting.political.personal_branding.para1",
                      )}
                    </p>
                    <p className="leading-relaxed">
                      {t(
                        "structure.consulting.political.personal_branding.para2",
                      )}
                    </p>
                    <p className="leading-relaxed">
                      {t(
                        "structure.consulting.political.personal_branding.para3",
                      )}
                    </p>
                    <p className="leading-relaxed">
                      {t(
                        "structure.consulting.political.personal_branding.para4",
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* 2.5 Political Communication Management */}
              <div className="mb-12 group">
                <div className="bg-card border border-border rounded-xl p-6 md:p-10 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                  <h4 className="text-xl md:text-2xl font-serif font-bold mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-sm flex-shrink-0">
                      2.5
                    </span>
                    {t("structure.consulting.political.communication.title")}
                  </h4>
                  <div className="prose max-w-none text-muted-foreground space-y-4">
                    <p className="leading-relaxed">
                      {t("structure.consulting.political.communication.para1")}
                    </p>
                    <p className="leading-relaxed">
                      {t("structure.consulting.political.communication.para2")}
                    </p>
                    <p className="leading-relaxed">
                      {t("structure.consulting.political.communication.para3")}
                    </p>
                    <p className="leading-relaxed">
                      {t("structure.consulting.political.communication.para4")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 border-t border-border bg-muted/30">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl font-serif font-bold mb-6">
              {t("services.cta.title")}
            </h2>
            <p className="text-lg mb-10 opacity-90 max-w-2xl mx-auto leading-relaxed">
              {t("services.cta.desc")}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded hover:opacity-90 transition-opacity"
            >
              {t("services.cta.btn")}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </section>
      </main>

      <Footer />
    </div>
  );
}
