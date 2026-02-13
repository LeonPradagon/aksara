"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { X } from "lucide-react";
import { useLocale } from "@/contexts/locale-context";

type Member = {
  name: string;
  title: string;
  photo: string;
  shortBio?: string;
  bio: string;
};

export default function TeamPage() {
  const { t } = useLocale();
  const [activeMember, setActiveMember] = useState<Member | null>(null);

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

  /* ================= CEO ================= */
  const ceo: Member = {
    name: t("team.members.adri_wanto.name"),
    title: t("team.members.adri_wanto.title"),
    photo: "/tim/picture1.jpg",
    shortBio: t("team.members.adri_wanto.short_bio"),
    bio: t("team.members.adri_wanto.bio"),
  };

  const associateResearch: Member[] = [
    {
      name: t("team.members.shafwatul_bary.name"),
      title: t("team.members.shafwatul_bary.title"),
      photo: "/tim/Picture2.jpg",
      bio: t("team.members.shafwatul_bary.bio"),
    },
    {
      name: t("team.members.alfiandri.name"),
      title: t("team.members.alfiandri.title"),
      photo: "/tim/Picture3.jpg",
      bio: t("team.members.alfiandri.bio"),
    },
    {
      name: t("team.members.ady_muzwardi.name"),
      title: t("team.members.ady_muzwardi.title"),
      photo: "/tim/Picture4.jpg",
      bio: t("team.members.ady_muzwardi.bio"),
    },
    {
      name: t("team.members.toto_sugiarto.name"),
      title: t("team.members.toto_sugiarto.title"),
      photo: "/tim/Picture5.png",
      bio: t("team.members.toto_sugiarto.bio"),
    },
    {
      name: t("team.members.virdika_rizky_utama.name"),
      title: t("team.members.virdika_rizky_utama.title"),
      photo: "/tim/Picture6.png",
      bio: t("team.members.virdika_rizky_utama.bio"),
    },
    {
      name: t("team.members.fx_yoga_duwarto.name"),
      title: t("team.members.fx_yoga_duwarto.title"),
      photo: "/tim/Picture7.jpg",
      bio: t("team.members.fx_yoga_duwarto.bio"),
    },
    {
      name: t("team.members.yandi_hermawandi.name"),
      title: t("team.members.yandi_hermawandi.title"),
      photo: "/tim/Picture8.jpg",
      bio: t("team.members.yandi_hermawandi.bio"),
    },
    {
      name: t("team.members.arif_rahmat.name"),
      title: t("team.members.arif_rahmat.title"),
      photo: "/tim/Picture9.png",
      bio: t("team.members.arif_rahmat.bio"),
    },
  ];

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

      {/* CEO */}
      <section className="py-24 border-b">
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

      {/* ASSOCIATES */}
      <section className="py-24 bg-muted/30">
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
