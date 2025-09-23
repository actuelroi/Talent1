// src/types/registrationSchema.ts
import { z } from "zod";

export const companyInfoSchema = z.object({
  companyName: z.string().min(1, "Company name is required").max(100),
  companySize: z.enum([
    "SIZE_1_10",
    "SIZE_11_50",
    "SIZE_51_200",
    "SIZE_201_500",
    "SIZE_501_1000",
    "SIZE_1000_PLUS",
  ]),
  industry: z.string().min(1, "Industry is required"),
  website: z.string().url().optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
  city: z.string().optional().or(z.literal("")),
  postalCode: z.string().optional().or(z.literal("")),
  country: z.string().min(1, "Country is required").default("France"), // ✅ Explicitly required
});

export const accountInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)/, "Password must contain letters and numbers"),
  confirmPassword: z.string(),
  jobTitle: z.string().optional().or(z.literal("")),
  department: z.string().optional().or(z.literal("")),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const planSchema = z.object({
  plan: z.enum(["starter", "pro", "enterprise"]),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
  agreePrivacy: z.boolean().refine((val) => val === true, {
    message: "You must accept the privacy policy",
  }),
  receiveNewsletter: z.boolean().default(true),
});

export const completeRegistrationSchema = z.object({
  company: companyInfoSchema,
  account: accountInfoSchema,
  plan: planSchema,
});

export type RegistrationFormData = z.infer<typeof completeRegistrationSchema>;