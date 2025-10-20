const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
};

const prisma = new PrismaClient();

async function main() {
  // Create test users
  const testPassword = await hashPassword('TestPassword123!');
  const adminPassword = await hashPassword('AdminPassword123!');

  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      password: testPassword,
      role: 'SUPPORT_WORKER',
    },
  });

  const adminTest = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin Test',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  const userPassword = await hashPassword('user123');

  const admin = await prisma.user.upsert({
    where: { email: 'admin@ndis.com' },
    update: {},
    create: {
      email: 'admin@ndis.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  const supportWorker = await prisma.user.upsert({
    where: { email: 'support@ndis.com' },
    update: {},
    create: {
      email: 'support@ndis.com',
      name: 'Support Worker',
      password: userPassword,
      role: 'SUPPORT_WORKER',
    },
  });

  const finance = await prisma.user.upsert({
    where: { email: 'finance@ndis.com' },
    update: {},
    create: {
      email: 'finance@ndis.com',
      name: 'Finance User',
      password: userPassword,
      role: 'FINANCE',
    },
  });

  const scheduler = await prisma.user.upsert({
    where: { email: 'scheduler@ndis.com' },
    update: {},
    create: {
      email: 'scheduler@ndis.com',
      name: 'Scheduler User',
      password: userPassword,
      role: 'SCHEDULER',
    },
  });

  console.log('Seed data created:', {
    testUser,
    adminTest,
    admin,
    supportWorker,
    finance,
    scheduler,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
