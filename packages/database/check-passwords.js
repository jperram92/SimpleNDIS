const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    where: { email: { in: ['test+1@example.com', 'test+2@example.com'] } },
  });
  for (const u of users) {
    console.log({ id: u.id, email: u.email, hasPassword: !!u.password });
  }
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
