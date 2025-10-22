const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const plain = 'Password123!';
  const hash = await bcrypt.hash(plain, 12);
  console.log('Generated hash:', hash);

  const emails = ['test+1@example.com', 'test+2@example.com'];
  for (const email of emails) {
    const res = await prisma.user.updateMany({ where: { email }, data: { password: hash } });
    console.log(`Updated ${email}: matched ${res.count}`);
  }

  await prisma.$disconnect();
  console.log('Done. Password for both users is:', plain);
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
