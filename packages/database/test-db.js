const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log(
    'Testing connection to DATABASE_URL:',
    process.env.DATABASE_URL ? '[set]' : '[not set]'
  );
  try {
    const users = await prisma.user.findMany({ take: 5 });
    console.log(
      'Found users (up to 5):',
      users.map((u) => ({ id: u.id, email: u.email }))
    );
    const count = await prisma.user.count();
    console.log('Total users count:', count);
  } catch (err) {
    console.error('Error querying DB:', err && err.message ? err.message : err);
    process.exitCode = 2;
  } finally {
    await prisma.$disconnect();
  }
}

main();
