import { PrismaClient } from "@prisma/client";
import { translations } from "../lib/translations";

const prisma = new PrismaClient();

async function main() {
  const enMembers: any = translations.en.team.members;
  const idMembers: any = translations.id.team.members;

  // The hardcoded photos from app/team/page.tsx
  const photos: Record<string, string> = {
    adri_wanto: "/tim/picture1.jpg",
    shafwatul_bary: "/tim/Picture2.jpg",
    alfiandri: "/tim/Picture3.jpg",
    ady_muzwardi: "/tim/Picture4.jpg",
    toto_sugiarto: "/tim/Picture5.png",
    virdika_rizky_utama: "/tim/Picture6.png",
    fx_yoga_duwarto: "/tim/Picture7.jpg",
    yandi_hermawandi: "/tim/Picture8.jpg",
    arif_rahmat: "/tim/Picture9.png",
    imamati_zikra: "/tim/Imamati.jpg",
  };

  let order = 0;
  for (const [key, enData] of Object.entries(enMembers)) {
    const data: any = enData;
    const idData: any = idMembers[key];
    const type = key === "adri_wanto" ? "CEO" : "ASSOCIATE";
    const photoUrl = photos[key] || null;

    // Check if exists
    const exists = await prisma.teamMember.findFirst({
      where: { name: data.name },
    });

    if (!exists) {
      await prisma.teamMember.create({
        data: {
          name: data.name,
          titleEn: data.title,
          titleId: idData.title,
          shortBioEn: data.short_bio || null,
          shortBioId: idData.short_bio || null,
          bioEn: data.bio,
          bioId: idData.bio,
          photoUrl: photoUrl,
          type: type,
          order: order++,
        },
      });
      console.log(`Created: ${data.name}`);
    } else {
      console.log(`Skipped existing: ${data.name}`);
    }
  }

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
