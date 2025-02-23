
import { z } from 'zod';

export const certificateSchema = z.object({
  certificateName: z.string(),
  certificateDate: z.string().transform((val) => new Date(val)),
  certificateIssuer: z.string(),
  certificateImageUrl: z.string().optional(),
  certificateNumber: z.string(),
  issueDate: z.string().transform((val) => new Date(val)),
  expiryDate: z.string().transform((val) => new Date(val)).optional(),
  isValid: z.boolean().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

export const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  role: z.enum(['admin', 'manager', 'user'], {
    errorMap: () => ({ message: 'Invalid role' })
  }).default('user'),
  avatar: z.string(),
  employeeId: z.string().min(1, 'Employee ID is required'),
  hourlyRate: z.number().min(20, 'Hourly rate must be a positive number'),
  certificates: z.array(certificateSchema)
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;