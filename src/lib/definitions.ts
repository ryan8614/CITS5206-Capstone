
import { z } from 'zod'

export const SignupFormSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Username must be at least 2 characters long.' })
    .trim(),
  email: z
    .string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
})

export const SigninFormSchema = z.object({
  username: z.string().min(2, { message: 'Username must be at least 2 characters long.' }).trim(),
  password: z.string().min(1, { message: 'Password cannot be empty.' }).trim(), 
});

export type FormState = {
  message: string | null
  errors: {
    name?: string[]
    email?: string[]
    username?: string[]
    password?: string[]
  }
}

// Session payload
export type SessionPayload = {
  userId: string;
  expiresAt: Date;
  role?: string; // Optional role information
};
