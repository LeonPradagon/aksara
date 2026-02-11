"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { X } from "lucide-react";

type Member = {
  name: string;
  title: string;
  photo: string;
  shortBio?: string;
  bio: string;
};

export default function TeamPage() {
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
    name: "Adri Wanto, PhD",
    title: "CEO & Executive Director",
    photo: "/tim/picture1.jpg",
    shortBio: `Adri Wanto, PhD is an Indonesia-focused researcher whose work bridges political sociology and political Islam, especially where identity, law, and local institutions shape real-world outcomes. He brings long experience in policy-relevant research, public-facing writing, and field-informed analysis across Indonesia. Professionally, Adri spent over a decade at RSIS/NTU Singapore and later completed his PhD at the University of Hamburg, focusing on Shari’ah law, matrilineal systems, and agrarian conflict in Minangkabau.`,

    bio: `Adri Wanto, PhD is an Indonesia-focused researcher whose work bridges political sociology, Political Islam, especially where identity, law, and local institutions shape real-world outcomes. He bringing long experience in policy-relevant research, public-facing writing, and field-informed analysis across Indonesia. Professionally, Adri spent over a decade at RSIS/NTU Singapore, serving as an Associate Research Fellow in the Indonesia Programme (2007–2019) and later undertaking consultancy work for the same programme (2020–2021). He also has teaching experience as a lecturer in International Relations at Universitas Maritim Raja Ali Haji (2020–2021), as well as earlier research and academic roles in Jakarta.

Adri completed his PhD training at the University of Hamburg (2018–2024), in the Department of Sociology and Anthropology. His dissertation examines the intersection of Shari’ah law, matrilineal systems, and agrarian conflict in Minangkabau, with a particular focus on why language matters in the way conflict and legitimacy are negotiated. Earlier, he earned an MSc in Asian Studies from RSIS, Nanyang Technological University (2009–2011), and holds two bachelor’s degrees: International Relations (University of Prof. Dr. Moestopo Beragama) and Philosophy and Religion (University of Paramadina).

Before his commitment as a Executive Director at ACRC, Adri was an independent researcher where he conducts research on a wide range of Indonesia-related issues since 2021. He also serves as a Member of the Advisory Board at the Gerbang Nusantara Foundation, an education-focused institution in Tanjungpinang, Riau Islands (2016–present). These roles reflect a consistent commitment to producing analysis that is grounded, readable, and useful for decision-makers and the wider public.

Adri’s writing has appeared in peer-reviewed journals and edited volumes, with recurring themes including the relationship between Shari’ah and adat in Minangkabau, political Islam and party politics, and Indonesian electoral identity dynamics. He has also published widely in policy and public commentary formats—particularly through RSIS Commentaries and outlets such as The Jakarta Post—covering issues ranging from elections and religious contestation to governance challenges and socio-economic issues.

In addition to his role as an Executive Director, Adri will contribute to research projects that require careful interpretation of institutions, public narratives, and local political realities. He is especially well-suited for assignments where Indonesia’s political life cannot be understood only through headlines, but must be read through history, social structure, and the everyday language people use to justify authority and contestation of political power.`,
  };

  const associateResearch: Member[] = [
    {
      name: "Dr. Shafwatul Bary",
      title: "Research Associate",
      photo: "/tim/picture2.jpg",
      bio: `Dr. Shafwatul Bary (Tuangku Imam El-Imrany), S.I.Q., S.Ag., M.A., is a scholar and educator with strong expertise in Qur’anic studies, Islamic hermeneutics, and classical Islamic texts. He joins our team as an Associate Research, bringing a rare combination of academic rigor, deep pesantren-based scholarship, and practical experience in public intellectual work. He is also affiliated with Pondok Pesantren Nurul Yaqin Ringan-ringan, West Sumatra, where he serves in multiple capacities, including Deputy Leader of the pesantren and Director of Ma’had Aly Nurul Yaqin. Alongside these leadership duties, he is active as a teacher of kitab kuning (classical Islamic texts), reflecting a long-standing commitment to traditional Islamic learning and the discipline of close textual reading.

Shafwatul’s academic background spans both Islamic higher education and contemporary humanities methods. He completed undergraduate studies at STAIPIQ West Sumatera, earned his Master’s degree at UIN Sunan Kalijaga Yogyakarta, and his doctoral degree at UIN Imam Bonjol, Padang. This trajectory places him in a strong position to connect classical scholarship with modern academic debates, especially on how interpretation is formed, transmitted, and contested in real social settings.

A key strength he brings to research work is methodological seriousness in interpretation. His published and ongoing academic interests include the use of hermeneutics—particularly the approach associated with Friedrich D.E. Schleiermacher—as a method for Qur’anic interpretation, with case discussions on themes such as sincerity, jilbab, sayyarah, and guidance (al-huda). He has also written on the dynamics and influence of Qur’anic exegesis within dakwah contexts in Malaysia, showing an ability to study how religious meaning travels through institutions, media, and public discourse. Another research strand engages Sufistic hermeneutics and the literature of tarekat, including manuscript-based work on Syattariyah traditions in Minangkabau.

Shafwatul Bary’s research interests make him especially valuable for projects that require both strong philological competence and sensitivity to lived religious practice. In our team, Shafwatul will contribute to projects that require grounded textual competence, careful interpretation, a strong feel for Indonesia’s Islamic intellectual landscape, and Islamic organisations and political networks. His profile fits research assignments ranging political Islam and the public life of religious ideas.`,
    },
    {
      name: "Dr. Alfiandri",
      title: "Research Associate",
      photo: "/tim/picture3.jpg",
      bio: `Dr. Alfiandri, S.Sos., M.Si. is a public administration scholar and practitioner whose work sits at the intersection of governance, public policy, and maritime-oriented institutional development. He joins our team as a Research Associate, bringing more than a decade of experience across academia, government advisory roles, and applied research, particularly in the context of Indonesia’s maritime provinces and border-facing governance challenges.

Dr. Alfiandri completed his Doctorate (S3) in Administrative Science at Universitas Indonesia, graduating in 2023. He previously earned a Master’s degree in Administrative Science with a concentration in Human Resource Administration and Development from Universitas Riau (2009), and his undergraduate degree in Public Administration from Universitas Islam Riau (2004). This academic pathway has equipped him with a strong grounding in institutional analysis, governance design, and the practical realities of public sector capacity building—skills that translate naturally into research and consulting work.

Alongside his academic career, he has built substantial experience advising public institutions. Notably, he served as Special Staff at the Public Relations Bureau of Indonesia’s Ministry of Defense (2021–2025). More recently, he has also been listed as Special Staff to the Commander of the Army Command and Staff School (Seskoad) in 2025, indicating exposure to defense-sector institutional environments and strategic communication needs. In the same year, he contributed as an expert team member in several applied settings, including the preparation of training programs (DIKLAT) for a maritime camp under Kogabwilhan I, and advisory roles linked to legal and regional government institutions in Bintan and Kepulauan Riau.

In our team, Dr. Alfiandri will support research and analytical outputs related to public sector governance, institutional reform, policy implementation, and maritime-border governance, combining academic discipline with hands-on experience in government-facing work. His profile fits assignments that demand careful reasoning, grounded field understanding, and writing that remains clear, responsible, and useful for decision-makers.`,
    },
    {
      name: "Dr. Ady Muzwardi",
      title: "Research Associate",
      photo: "/tim/picture4.jpg",
      bio: `Dr. Ady Muzwardi is a scholar and applied policy professional whose work focuses on governance, investment and regional development, and maritime-border dynamics in Indonesia. He joins our team as a Research Associate, contributing a mix of academic depth and hands-on consulting experience—particularly in the Riau Islands and Indonesia’s strategic border and free-trade zones.

Dr. Ady holds a PhD in International Relations from Universitas Padjadjaran (completed in 2023). He previously earned a Master’s degree in Government Affairs and Administration (Universitas Muhammadiyah Yogyakarta, 2015) and a Bachelor’s degree in International Relations (Universitas Muhammadiyah Yogyakarta, 2005). This academic foundation equips him to connect political and institutional analysis with practical development questions, including how investment policy, infrastructure planning, and local governance shape outcomes on the ground.

A core strength in his profile is sustained engagement with policy-relevant research and advisory work. His consulting portfolio includes assignments for a range of public institutions, including BP Batam, Indonesia’s Ministry of Investment/BKPM, and multiple local government agencies in Batam, Tanjungpinang, Bintan, Natuna, Lingga, and the Province of Kepulauan Riau. His work has covered projects such as investment opportunity mapping in port infrastructure, drafting and supporting regional regulations and academic papers, tourism and creative economy planning, land value zone analysis in the Batam FTZ, and feasibility studies for public services and regionally-owned enterprises. Across these engagements, he has frequently served as a team leader or expert consultant, reflecting both technical capability and the trust to manage complex deliverables under deadlines.

Dr. Ady is also an active contributor to academic and public discourse. His publications span topics such as stakeholder dynamics in port and free-trade zone development, maritime connectivity in border areas, collaborative governance for investment attraction, network governance, and government responsiveness in crisis contexts. He has also written policy commentary and analysis pieces, including work published through the ISEAS – Yusof Ishak Institute, demonstrating an ability to communicate research to wider audiences without losing analytical discipline.

In our team, Dr. Ady will support research outputs that require clear institutional analysis, strong policy literacy, and practical understanding of investment and regional development, especially in maritime provinces, border communities, and special economic/free-trade zone environments. His role will strengthen our capacity to produce research that is academically grounded, evidence-based, and directly useful for decision-makers.`,
    },
    {
      name: "Dr. Toto Sugiarto",
      title: "Research Associate",
      photo: "/tim/picture5.png",
      bio: `Dr. Toto Sugiarto, M.Hum is a political and social researcher with a rare combination of philosophical depth, long experience in electoral governance work, and two decades of applied political research and survey leadership. He joins our team as a Research Associate, strengthening our capacity to produce analysis that is conceptually solid, empirically careful, and written in a way that remains readable for public and policy audiences.

Toto completed his doctoral degree in Philosophy at the University of Indonesia (2023), with a dissertation on Pancasila socio-democracy. He previously earned an M.Hum. in Philosophy from STF Driyarkara (2006), writing on Immanuel Kant’s ideas of self-interest and universal morality under the supervision of Prof. Dr. Franz Magnis-Suseno. Earlier, he trained in Informatics Engineering (S.Kom., 1999) with a thesis on TCP/IP networks. This background matters in practice: it gives him strong conceptual tools for interpreting Indonesian democracy and state ideology, while also making him comfortable with the technical and data-facing side of modern research.

Professionally, Toto has been active in Indonesia’s democracy and election ecosystem for many years. He has been involved in participatory election oversight work with Bawaslu since 2012, including socialization programs across regions and roles in working groups and selection committees for provincial and district/city Bawaslu leadership. He has also been active in various activities linked to KPU since 2022, reflecting continued engagement with election management institutions and the practical realities of electoral integrity.

Alongside this work, Toto has built a long career as a political analyst and research leader. He has worked with institutions such as Exposit Strategic (political analyst, 2017–present) and PSIK-Indonesia (researcher, 2017–present), and previously served as Senior Researcher at PARA Syndicate (2014–2016). A major part of his professional formation took place at Soegeng Sarjadi Syndicate (SSS), where he progressed from researcher (2000–2008) to Executive Director (2008–2014). Throughout this period, he led or supervised a series of significant studies and surveys on elections, party politics, political configurations, democracy indicators, political Islam, and national policy—often in collaboration with institutional partners, including international stakeholders.

Toto is also an experienced educator. He has taught at Universitas Paramadina (since 2009) and PTIQ (since 2018), covering courses such as Pancasila, citizenship, ethics, logic, political philosophy, media law, media monitoring, and opinion/feature writing. This combination of teaching and research shows in his style: he can handle complex ideas, but he is used to explaining them clearly and systematically.

His publications include journal articles on Pancasila socio-democracy and contemporary challenges in a networked society, as well as contributions to Bawaslu publications and multiple edited books. He has also written extensively for major Indonesian newspapers and journals.

Within our team, Toto will focus on research related to democracy, elections, political communication, governance, and the evolving meaning of Pancasila in Indonesia’s public life, linking field realities with strong conceptual framing.`,
    },
    {
      name: "Virdika Rizky Utama",
      title: "Research Associate",
      photo: "/tim/picture6.png",
      bio: `Virdika Rizky Utama, M.A. joins our team as a Research Associate, bringing a strong track record in political analysis and international relations research. With experience spanning academia, think-tank research, and journalism, he is well placed to support rigorous research projects that require both sharp analysis and clear communication.

Virdika earned an M.A. in Political Science from Shanghai Jiao Tong University (taught fully in English), where his master’s thesis examined Indonesia’s multilateral religious diplomacy through a case study of Nahdlatul Ulama (NU). He completed his undergraduate degree in History Education at the State University of Jakarta, writing a thesis on the role of intellectual groups in Indonesia’s democracy movement in the 1990s. This combination of training gives him a useful perspective: he is comfortable reading politics through history, while also working with contemporary policy debates and international affairs.

Professionally, Virdika currently teaches International Relations as an Adjunct Lecturer at President University, delivering courses in English and developing course materials aligned with current trends in global politics, security, and diplomacy. Alongside teaching, he works as a Research Assistant at the S. Rajaratnam School of International Studies (RSIS), where he has conducted both desk and field research on China–Indonesia relations across strategic, economic, and political dimensions.

In this role, he has contributed directly to English-language policy reports, prepared research updates, and supported internal briefings—work that demands precision, speed, and the discipline to keep analysis evidence-based. Virdika also has long-standing experience as a Political Researcher at PARA Syndicate (2019–present), where he produces a monthly policy bulletin on Indonesian politics, writes analytical pieces on politics, history, and geopolitics, and contributes to periodic policy reviews.

Earlier in his career, he worked in journalism at Narasi TV and Gatra Weekly Magazine, including research and verification work for Mata Najwa and broader reporting on politics, law, and national affairs. That newsroom background still shows in his research style: he is attentive to sources, careful with claims, and knows how to write for real audiences rather than for academic insiders.

His research interests cover China’s politics and foreign policy, Global South dynamics, democracy in Southeast Asia, public and religious diplomacy, and political Islam in Indonesia. He has presented work at international forums, including conferences on Southeast Asian political thought and Indo-Pacific digital complexity. He is also an active writer, with publications ranging from books to peer-reviewed and policy outlets, reflecting a consistent commitment to producing and sharing ideas across different formats.

As part of our research team, Virdika will contribute to projects that sit at the intersection of Indonesian domestic politics and international developments, with particular attention to Indonesia–China relations, political Islam, and shifts in regional and global order.`,
    },
    {
      name: "FX Yoga Duwarto",
      title: "Research Associate",
      photo: "/tim/picture7.jpg",
      bio: `FX Yoga Duwarto is a senior technology professional and policy researcher with more than 35 years of experience spanning Information Technology, electronic engineering, radio communications, and complex systems integration. He joins our team as a Research Associate, bringing a rare combination of deep technical grounding and a strong track record in writing and research on public and energy policy.

Yoga’s career is rooted in building and managing large, mission-critical systems across industries where reliability and operational continuity matter. Over a 25-year tenure at PT Delta Djakarta Tbk, he served as IT Manager and led the development of IT infrastructure for a new factory in Bekasi. This work included integrating industrial PLC-based machinery systems across core production processes, from brewery operations through packaging, an environment where IT must connect seamlessly with industrial control systems and factory operations.

He also played a central role in enterprise-wide digital transformation through the implementation and operational management of SAP/R3 ERP across modules, including responsibility for SAP Basis and operating system management. In parallel, he managed a broad set of productivity and technical applications—ranging from advanced MS Office usage to CAD workflows, supporting day-to-day decision-making and operational planning across the company.

Earlier in his career, Yoga spent seven years at PT Freeport Indonesia as a supervisor under the MIS department. There, he helped develop early-stage computerization and data/voice communications infrastructure for mining operations. His responsibilities included operating and managing communication network infrastructure such as VSAT, microwave links, PABX systems, and mini-computers, as well as guiding transitions from manual processes to more modern operating environments, including HP-UX and Windows. His work supported information needs across multiple sites and regions, connecting operations and decision-makers in locations that included Jakarta, Tembagapura, New Orleans, Singapore, and Cairns.

Beyond these major roles, Yoga has held a range of relevant positions across banking, manufacturing, building systems, and engineering. His experience includes national-scale infrastructure responsibilities at Bank Rakyat Indonesia (Central Office), work on industrial plant infrastructure using Alsthom PLC, leadership as Operations Director in elevator manufacturing and maintenance, and R&D work developing digital elevator controller hardware, supporting the transition from electronic to fully digital control systems.

Since 2015, Yoga has also been active as a writer and researcher focused on public and energy policy, complementing his technical expertise with an applied interest in how policy choices shape infrastructure, security, and national development priorities. He brings strong skills in networking and security, radio communication, PLC systems, SAP (Basis and ABAP exposure), CAD (AutoCAD), and Unix/Windows environments, supported by leadership and team-based work across both business and socio-political organizations.

In our team, Yoga will contribute especially to research and analysis related to technology, critical infrastructure, digital transformation, industrial systems, energy-policy questions, and cyber security issues, offering a practical, systems-level perspective grounded in decades of real operational responsibility.`,
    },
    {
      name: "Yandi Hermawandi",
      title: "Research Associate",
      photo: "/tim/picture8.jpg",
      bio: `Yandi Hermawandi, M.A. is a political economy analyst, lecturer, and public commentator with long experience researching Indonesia’s political dynamics, state–society relations, and the communication strategies that shape public debate. He joins our team as a Research Associate, bringing a strong blend of academic grounding, policy-facing experience, and an established record of writing and media engagement.

Yandi earned his Master’s degree in Political Economy from Universitas Nasional (2009–2012) and completed his undergraduate training in International Relations at Universitas Paramadina (2003–2007). His educational path also includes formative years in Islamic boarding school environments—both Gontor Darussalam and Persatuan Islam 99 Garut—which helped build the discipline of careful reading, structured argument, and public speaking that later became central to his professional work.

Professionally, Yandi has been active as an Analyst and Political Observer at Nation State Institute Indonesia (2018–present). In parallel, he has built a substantial academic career as a lecturer and researcher at Universitas Garut (UNIGA) since 2012, teaching subjects such as industrial relations, political communication, and public relations, while also supervising undergraduate theses. He also teaches at Universitas Terbuka since 2020, covering topics including Indonesian political power, conflict resolution, and Indonesia’s political system. His earlier teaching posts include Paramadina University and UIN Bandung, reflecting broad experience across Indonesian higher education settings.

Yandi’s background also includes direct exposure to national policy and parliamentary work. He served as expert staff to a member of Indonesia’s House of Representatives (DPR RI) (2010–2011), giving him practical familiarity with legislative processes, political negotiation, and the realities of policymaking. Earlier, he worked in publishing as a managing editor and in research roles at The Lead Institute and Paramadina’s research directorate, experience that sharpened his ability to manage sources, structure long-form analysis, and produce readable outputs under deadlines.

He has published in journals on themes such as neoliberal political economy, political and marketing communication, and religion in public life, and he has written widely for newspapers and online outlets. He is also frequently quoted in media as a political analyst, including coverage by major national outlets and international references. In addition, he has extensive experience as a speaker, moderator, trainer, and organizer for seminars, webinars, and public discussions, work that reflects both subject mastery and strong communication skills.

Within our team, Yandi will contribute to research projects that require clear political reading, disciplined argumentation, and strong narrative explanation, particularly on Indonesia’s electoral politics, party competition, political communication, and the broader political economy shaping public policy choices.`,
    },
    {
      name: "Arif Rahmat",
      title: "Research Associate",
      photo: "/tim/picture9.png",
      bio: `Arif Rahmat, S.H., M.H. is a lawyer and legal researcher whose work spans criminal law, civil litigation, constitutional issues, and corporate legal practice. He joins our team as a Research Associate, bringing a practical understanding of how legal risks emerge in real disputes, how institutions respond under pressure, and how to translate complex case material into clear, usable analysis for decision-makers.

Arif has built his professional foundation inside law firms, working on matters that require both careful reasoning and steady execution. Since October 2022, he has served as an Advocate, handling tasks such as investigation, mediation, negotiation, and advocacy, including representing clients in court proceedings. This experience gives him a grounded feel for procedure, evidence, and the “human side” of disputes—how conflicts escalate, how parties negotiate, and what actually moves a case toward resolution.

Earlier in his career, Arif worked as a Junior Associate Lawyer (October 2017–September 2021), with responsibilities that included preparing legal opinions, conducting legal due diligence, and managing legal correspondence. That period sharpened his corporate and advisory capabilities, particularly the discipline of reviewing documents closely, identifying legal exposure, and writing recommendations that are concise but defensible.

Academically, Arif holds a Master of Laws (M.H.) from Andalas University (2019–2021). He also completed professional advocate training through PKPA/PERADI (2016). His profile combines the habits of scholarship, structured argument, careful sourcing, and clarity in writing, with the practical instincts that come from working on active cases. Beyond formal roles, Arif has been active in professional and organizational settings, including involvement in Legal Research and Development (PERMAHI Padang), and he is listed as the founder of FASIH, reflecting initiative in building platforms for learning and collaboration.

In our research team, Arif will support projects that require legal mapping, regulatory analysis, case-based assessment, and clear written outputs, especially where legal questions intersect with governance, institutional decision-making, or business considerations. He works in Indonesian and English, and is comfortable producing professional documents using standard productivity tools. His approach is simple: legal problems do not always require complicated language; often they require careful reading, clean logic, and solutions that can actually be implemented.`,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section className="py-24 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="font-serif text-6xl font-bold mb-6">Our Team</h1>
          <p className="text-muted-foreground text-xl max-w-3xl">
            Researchers and practitioners bridging policy, politics, and
            real-world impact.
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
              Read full bio →
            </button>
          </div>
        </div>
      </section>

      {/* ASSOCIATES */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-serif text-4xl font-bold mb-12">
            Associate Research
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
