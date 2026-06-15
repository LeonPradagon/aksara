"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useLocale } from "@/contexts/locale-context";
import { Loader2 } from "lucide-react";
import "react-quill-new/dist/quill.snow.css"; // Required for Quill styles (align, indent, etc)
import api from "@/lib/api";

export default function CareersPage() {
  const { t } = useLocale();
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await api.get("/jobs?activeOnly=true");
        setJobs(response.data);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

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

        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center text-muted-foreground">
            <Loader2 className="w-10 h-10 animate-spin mb-4" />
            <p className="font-medium">Loading opportunities...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-muted border border-border rounded-xl p-10 text-center">
            <h3 className="font-serif text-2xl font-bold mb-3">No Open Positions</h3>
            <p className="text-muted-foreground">
              We currently do not have any open positions. Please check back later or follow our social media for updates.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {jobs.map((job) => (
              <section key={job.id} className="bg-card border border-border rounded-xl p-8 lg:p-10 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="font-serif text-3xl font-bold mb-2">
                      {job.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="font-semibold px-3 py-1 bg-primary/10 text-primary rounded-full">
                        {job.type || "Full-time"}
                      </span>
                      {job.location && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                          <span>{job.location}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="ql-snow">
                  <div 
                    className="frontend-quill ql-editor p-0 prose dark:prose-invert max-w-none text-muted-foreground mb-8 break-words prose-img:max-w-full prose-img:rounded-xl prose-video:max-w-full"
                    dangerouslySetInnerHTML={{ __html: job.description || "" }}
                  />
                </div>

                <div>
                  <a
                    href={`/careers/apply?role=${encodeURIComponent(job.title)}`}
                    className="inline-flex justify-center items-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded hover:opacity-90 transition-opacity"
                  >
                    Apply Now
                  </a>
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
