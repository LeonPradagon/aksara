"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { X, Loader2 } from "lucide-react";
import { useLocale } from "@/contexts/locale-context";
import api from "@/lib/api";

type TeamMemberAPI = {
  id: string;
  name: string;
  title_en: string;
  title_id: string;
  short_bio_en: string | null;
  short_bio_id: string | null;
  bio_en: string;
  bio_id: string;
  photo_url: string | null;
  type: string;
  order: number;
};

type Member = {
  name: string;
  title: string;
  photo: string;
  shortBio?: string;
  bio: string;
};

export default function TeamPage() {
  const { t, locale } = useLocale();
  const [activeMember, setActiveMember] = useState<Member | null>(null);

  const [ceo, setCeo] = useState<Member | null>(null);
  const [associateResearch, setAssociateResearch] = useState<Member[]>([]);
  const [advisoryBoard, setAdvisoryBoard] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  // Lock scroll + ESC close
  useEffect(() => {
    if (!activeMember) return;

    document.body.style.overflow = "hidden";
    const esc = (e: KeyboardEvent) =>
      e.key === "Escape" && setActiveMember(null);

    window.addEventListener("keydown", esc);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", esc);
    };
  }, [activeMember]);

  // Fetch team members from API
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await api.get("/team");
        const membersData: TeamMemberAPI[] = response.data;
        
        // Helper to format API data to local Member struct
        const formatMember = (m: TeamMemberAPI): Member => ({
          name: m.name,
          title: locale === "en" ? m.title_en : m.title_id,
          photo: m.photo_url 
            ? (m.photo_url.startsWith("http") || m.photo_url.startsWith("/tim/") 
                ? m.photo_url 
                : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5342/api"}${m.photo_url}`) 
            : "/tim/default.jpg",
          shortBio: (locale === "en" ? m.short_bio_en : m.short_bio_id) || undefined,
          bio: locale === "en" ? m.bio_en : m.bio_id,
        });

        const ceoData = membersData.find(m => m.type === "CEO");
        if (ceoData) setCeo(formatMember(ceoData));

        const associatesData = membersData.filter(m => m.type === "ASSOCIATE");
        setAssociateResearch(associatesData.map(formatMember));

        const advisoryData = membersData.filter(m => m.type === "ADVISORY_BOARD");
        setAdvisoryBoard(advisoryData.map(formatMember));

      } catch (error) {
        console.error("Failed to fetch team members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [locale]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section className="py-24 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="font-serif text-6xl font-bold mb-6">
            {t("team.title")}
          </h1>
          <p className="text-muted-foreground text-xl max-w-3xl">
            {t("team.subtitle")}
          </p>
        </div>
      </section>

      {loading ? (
        <div className="py-24 flex flex-col items-center justify-center text-muted-foreground">
          <Loader2 className="w-10 h-10 animate-spin mb-4" />
          <p className="font-medium">Loading team members...</p>
        </div>
      ) : (
        <>
          {/* CEO */}
          {ceo && (
            <section id="leadership" className="py-24 border-b">
              <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-14 items-center">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
                  <Image
                    src={ceo.photo}
                    alt={ceo.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h2 className="font-serif text-4xl font-bold mb-2">{ceo.name}</h2>
                  <p className="text-primary mb-4">{ceo.title}</p>

                  <p className="relative text-muted-foreground leading-relaxed mb-6 line-clamp-4 after:absolute after:bottom-0 after:left-0 after:h-12 after:w-full after:bg-gradient-to-t after:from-background after:to-transparent">
                    {ceo.shortBio}
                  </p>

                  <button
                    onClick={() => setActiveMember(ceo)}
                    className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                  >
                    {t("team.read_bio")}
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* ASSOCIATES */}
          {associateResearch.length > 0 && (
            <section id="researchers" className="py-24 bg-muted/30">
              <div className="max-w-7xl mx-auto px-4">
                <h2 className="font-serif text-4xl font-bold mb-12">
                  {t("team.associate_title")}
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                  {associateResearch.map((m) => (
                    <button
                      key={m.name}
                      onClick={() => setActiveMember(m)}
                      className="group rounded-xl overflow-hidden border bg-card hover:-translate-y-1 transition"
                    >
                      <div className="relative aspect-square">
                        <Image
                          src={m.photo}
                          alt={m.name}
                          fill
                          className="object-cover grayscale group-hover:grayscale-0 transition"
                        />
                      </div>

                      <div className="p-5 text-left">
                        <h3 className="font-semibold">{m.name}</h3>
                        <p className="text-sm text-muted-foreground">{m.title}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ADVISORY BOARD */}
          {advisoryBoard.length > 0 && (
            <section id="advisory" className="py-24 border-t">
              <div className="max-w-7xl mx-auto px-4">
                <h2 className="font-serif text-4xl font-bold mb-12">
                  {t("team.advisory_board_title") || "Advisory Board"}
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                  {advisoryBoard.map((m) => (
                    <button
                      key={m.name}
                      onClick={() => setActiveMember(m)}
                      className="group rounded-xl overflow-hidden border bg-card hover:-translate-y-1 transition"
                    >
                      <div className="relative aspect-square">
                        <Image
                          src={m.photo}
                          alt={m.name}
                          fill
                          className="object-cover grayscale group-hover:grayscale-0 transition"
                        />
                      </div>

                      <div className="p-5 text-left">
                        <h3 className="font-semibold">{m.name}</h3>
                        <p className="text-sm text-muted-foreground">{m.title}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* MODAL */}
      {activeMember && (
        <div
          onClick={() => setActiveMember(null)}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-background rounded-xl max-w-xl w-full shadow-xl"
          >
            <div className="p-6 border-b flex justify-between">
              <div>
                <h3 className="font-serif text-2xl font-bold">
                  {activeMember.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {activeMember.title}
                </p>
              </div>
              <button onClick={() => setActiveMember(null)}>
                <X />
              </button>
            </div>

            <div className="p-6 max-h-[60vh] overflow-y-auto whitespace-pre-line text-muted-foreground">
              {activeMember.bio}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
