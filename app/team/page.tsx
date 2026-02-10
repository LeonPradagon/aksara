"use client";

import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArrowRight } from "lucide-react";

export default function TeamPage() {
  const leadership = [
    {
      name: "Andi Pratama",
      title: "CEO & Managing Director",
      photo: "/team/ceo.jpg",
      bio: "Andi brings over 20 years of experience spanning government service, international organisations, and strategic consulting. He previously served in senior advisory roles at the Ministry of Finance and the World Bank Indonesia office, where he led policy reform initiatives across multiple sectors. Under his leadership, ACRC has grown into a trusted partner for government agencies, SOEs, and private sector clients seeking rigorous analysis and practical recommendations.",
    },
    {
      name: "Dr. Ratna Wijayanti",
      title: "Director of Research",
      photo: "/team/director-research.jpg",
      bio: "Ratna oversees ACRC's research agenda and ensures the quality and methodological rigour of all analytical outputs. With a doctorate in Political Science from the University of Indonesia and research fellowships at leading international think tanks, she brings deep expertise in governance, institutional analysis, and policy evaluation. Her work has been published in leading academic journals and cited by policymakers across the region.",
    },
    {
      name: "Budi Santoso",
      title: "Director of Consulting",
      photo: "/team/director-consulting.jpg",
      bio: "Budi leads ACRC's consulting practice, managing client engagements and ensuring delivery of actionable strategic advice. His career spans political campaigns, corporate government relations, and public affairs consulting. He has advised multiple gubernatorial and legislative campaigns and helped major corporations navigate Indonesia's regulatory environment. His practical experience complements the firm's research capabilities.",
    },
  ];

  const researchersByExpertise = [
    {
      expertise: "Defence & Security",
      members: [
        { name: "Col. (Ret.) Hendra Wijaya", title: "Senior Defence Analyst" },
        { name: "Dr. Siti Aminah", title: "Security Researcher" },
      ],
    },
    {
      expertise: "Politics & Governance",
      members: [
        { name: "Dr. Achmad Suryanto", title: "Senior Political Analyst" },
        { name: "Maya Kusuma, M.A.", title: "Governance Researcher" },
      ],
    },
    {
      expertise: "Economy & Business",
      members: [
        { name: "Rini Hartono, S.E., M.Phil", title: "Senior Economist" },
        { name: "Yudi Pratama, M.B.A.", title: "Business Analyst" },
      ],
    },
    {
      expertise: "Government Relations & Regulatory Affairs",
      members: [
        { name: "Dewi Anggraini", title: "Senior GR Consultant" },
        { name: "Bambang Setiawan", title: "Regulatory Affairs Specialist" },
      ],
    },
    {
      expertise: "Campaigns & Communications",
      members: [
        { name: "Lia Permatasari", title: "Campaign Strategist" },
        { name: "Rizki Mahendra", title: "Communications Consultant" },
      ],
    },
  ];

  const advisoryBoard = [
    {
      name: "Gen. (Ret.) Sutanto",
      background: "Former Chief of Indonesian National Police and Ambassador",
    },
    {
      name: "Prof. Dr. Rizal Sukma",
      background: "Former Ambassador to the UK and Executive Director of CSIS",
    },
    {
      name: "Dr. Engagement Anwar",
      background: "Former Deputy Secretary to the Vice President",
    },
    {
      name: "Ibu Shinta Widjaja Kamdani",
      background: "Business leader and former APINDO Chairperson",
    },
    {
      name: "Dr. Engagement Ekonomi",
      background: "Former World Bank Lead Economist for Indonesia",
    },
    {
      name: "Bapak Andi Mallarangeng",
      background: "Former Minister of Youth and Sports Affairs",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-6xl md:text-7xl font-bold text-foreground mb-6">
            Our Team
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl leading-relaxed">
            ACRC is a compact and focused group of professionals with experience
            across government, international organisations, political campaigns,
            and the private sector. Our team combines analytical rigour with
            practical experience to deliver insights that matter.
          </p>
        </div>
      </section>

      {/* Leadership */}
      <section
        id="leadership"
        className="py-16 md:py-24 border-b border-border scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-5xl font-bold text-foreground mb-4">
            Leadership Board
          </h2>
          <p className="text-lg text-muted-foreground mb-12 leading-relaxed max-w-3xl">
            ACRC's leadership team brings decades of combined experience in
            policy research, government service, and strategic consulting.
          </p>

          <div className="space-y-12">
            {leadership.map((member, index) => (
              <div
                key={member.name}
                className={`flex flex-col ${index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-8 items-start`}
              >
                {/* Photo */}
                <div className="w-full md:w-1/3 flex-shrink-0">
                  <div className="aspect-[4/5] rounded-lg bg-muted overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-serif text-6xl font-bold text-muted-foreground/30">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="flex-1">
                  <h3 className="font-serif text-3xl font-bold text-foreground mb-2">
                    {member.name}
                  </h3>
                  <p className="text-primary font-semibold text-lg mb-6">
                    {member.title}
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Researchers & Consultants */}
      <section
        id="researchers"
        className="py-16 md:py-24 border-b border-border bg-muted/30 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-5xl font-bold text-foreground mb-4">
            Researchers & Consultants
          </h2>
          <p className="text-lg text-muted-foreground mb-12 leading-relaxed max-w-3xl">
            Our research and consulting team is organised by areas of expertise,
            combining academic training with practical policy and industry
            experience.
          </p>

          <div className="space-y-10">
            {researchersByExpertise.map((group) => (
              <div
                key={group.expertise}
                className="p-6 rounded-lg border border-border bg-card"
              >
                <h3 className="font-serif text-xl font-bold text-foreground mb-6 pb-4 border-b border-border">
                  {group.expertise}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.members.map((member) => (
                    <div key={member.name} className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
                        <span className="font-serif font-bold text-primary">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">
                          {member.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {member.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Board */}
      <section
        id="advisory"
        className="py-16 md:py-24 border-b border-border scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-5xl font-bold text-foreground mb-4">
            Senior Advisory Board
          </h2>
          <p className="text-lg text-muted-foreground mb-12 leading-relaxed max-w-4xl">
            ACRC’s Advisory Board consists of senior figures with long-standing
            experience in government, the military, diplomacy, economics, and
            communications. They provide strategic guidance on the firm’s
            direction and the quality of its outputs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advisoryBoard.map((member) => (
              <div
                key={member.name}
                className="p-6 rounded-lg border border-border bg-card hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-foreground flex-shrink-0 flex items-center justify-center">
                    <span className="font-serif font-bold text-background">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {member.background}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 border-b border-border bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Work With Us
          </h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Connect with our team to discuss your research, policy, or strategic
            consulting needs.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded hover:opacity-90 transition-opacity"
          >
            Contact Our Team
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
