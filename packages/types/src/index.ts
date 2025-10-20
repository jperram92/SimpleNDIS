// Shared TypeScript types
export type Version = string;

export interface User {
  id: string;
  name?: string | null;
  email: string;
  emailVerified?: Date | null;
  image?: string | null;
  password?: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
