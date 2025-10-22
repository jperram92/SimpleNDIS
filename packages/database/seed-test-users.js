const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding 2 test users...');

  const usersData = [
    { email: `test+1+${Date.now()}@example.com`, name: 'Test User 1' },
    { email: `test+2+${Date.now()}@example.com`, name: 'Test User 2' },
  ];

  for (const u of usersData) {
    const user = await prisma.user.create({ data: u });
    console.log('Created user', user.id, user.email);
    const session = await prisma.session.create({
      data: {
        sessionToken: `sess-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        userId: user.id,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day
      },
    });
    console.log('Created session', session.id);
  }

  console.log('Seeding complete');
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
