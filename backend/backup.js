const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  const articles = await prisma.article.findMany();
  const comments = await prisma.comment.findMany();
  const contactInquiries = await prisma.contactInquiry.findMany();
  const careerApplications = await prisma.careerApplication.findMany();

  const backupData = {
    users,
    articles,
    comments,
    contactInquiries,
    careerApplications
  };

  fs.writeFileSync('db_backup.json', JSON.stringify(backupData, null, 2));
  console.log('Database backup successfully saved to db_backup.json');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
