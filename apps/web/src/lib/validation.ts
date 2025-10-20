import { z } from 'zod';

// Email validation schema
export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Invalid email format')
  .max(254, 'Email is too long')
  .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format');

// Password validation schema (OWASP compliant)
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password is too long')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    'Password must contain at least one lowercase letter, one uppercase letter, and one number'
  );

// Login credentials schema
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

// Registration schema (if needed later)
export const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

// Sanitization functions
export const sanitizeEmail = (email: string): string => {
  return email.trim().toLowerCase();
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

// Rate limiting helpers
export const isRateLimited = (
  attempts: number[],
  windowMs: number = 15 * 60 * 1000, // 15 minutes
  maxAttempts: number = 5
): boolean => {
  const now = Date.now();
  const recentAttempts = attempts.filter((attempt) => now - attempt < windowMs);
  return recentAttempts.length >= maxAttempts;
};

// CSRF token generation
export const generateCSRFToken = (): string => {
  return crypto.randomUUID();
};

// Input validation middleware
export const validateInput = <T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: string[] } => {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  return {
    success: false,
    errors: result.error.errors.map((err) => err.message),
  };
};
