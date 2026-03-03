"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useLocale } from "@/contexts/locale-context";

export default function CareersPage() {
  const { t } = useLocale();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 w-full">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
          {t("careers.title")}
        </h1>
        <p className="text-xl text-muted-foreground mb-16 max-w-3xl">
          {t("careers.subtitle")}
        </p>

        {/* Internship Section */}
        <section className="mb-20">
          <h2 className="font-serif text-3xl font-semibold mb-6">
            {t("careers.internship_title")}
          </h2>
          <div className="bg-card border border-border rounded-xl p-8 lg:p-10 shadow-sm">
            <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap mb-8">
              {t("careers.internship_desc")}
            </p>
            <div>
              <a
                href="/careers/apply?role=internship"
                className="inline-flex justify-center items-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded hover:opacity-90 transition-opacity"
              >
                Apply for Internship
              </a>
            </div>
          </div>
        </section>

        {/* Career Opportunities */}
        <section>
          <h2 className="font-serif text-3xl font-semibold mb-6">
            {t("careers.opportunities_title")}
          </h2>
          <div className="space-y-8">
            <div className="bg-card border border-border rounded-xl p-8 lg:p-10 shadow-sm">
              <h3 className="font-serif text-2xl font-bold mb-4">
                {t("careers.roles.1.title")}
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap mb-8">
                {t("careers.roles.1.desc")}
              </p>
              <div>
                <a
                  href={`/careers/apply?role=${encodeURIComponent(t("careers.roles.1.title") || "Statistician Coordinator")}`}
                  className="inline-flex justify-center items-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded hover:opacity-90 transition-opacity"
                >
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
