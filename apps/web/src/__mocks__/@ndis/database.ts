/* eslint-disable @typescript-eslint/no-explicit-any */
export const prisma = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

export const version = '1.0.0';
