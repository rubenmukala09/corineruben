import { z } from "zod";

/**
 * Sanitization utilities for form inputs
 */

// Remove dangerous HTML/script tags
export const sanitizeHtml = (input: string): string => {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
};

// Trim and sanitize string input
export const sanitizeString = (input: string): string => {
  return sanitizeHtml(input.trim());
};

// Format phone number to (xxx) xxx-xxxx
export const formatPhoneNumber = (phone: string): string => {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return phone;
};

/**
 * Validation schemas using Zod
 */

// Phone validation - accepts various formats
export const phoneSchema = z.string()
  .trim()
  .min(10, "Phone number must be at least 10 digits")
  .max(20, "Phone number is too long")
  .regex(/^[\d\s\-\(\)\+\.]+$/, "Invalid phone number format")
  .transform(sanitizeString);

// Email validation with sanitization
export const emailSchema = z.string()
  .trim()
  .min(5, "Email is too short")
  .max(255, "Email is too long")
  .email("Invalid email address")
  .toLowerCase()
  .transform(sanitizeString);

// Name validation (2-100 characters)
export const nameSchema = z.string()
  .trim()
  .min(2, "Name must be at least 2 characters")
  .max(100, "Name must be less than 100 characters")
  .regex(/^[a-zA-Z\s\-'\.]+$/, "Name can only contain letters, spaces, hyphens, apostrophes, and periods")
  .transform(sanitizeString);

// Message/textarea validation
export const messageSchema = (minLength: number = 10, maxLength: number = 2000) => 
  z.string()
    .trim()
    .min(minLength, `Message must be at least ${minLength} characters`)
    .max(maxLength, `Message must be less than ${maxLength} characters`)
    .transform(sanitizeString);

// Subject validation
export const subjectSchema = z.string()
  .trim()
  .min(3, "Subject must be at least 3 characters")
  .max(200, "Subject must be less than 200 characters")
  .transform(sanitizeString);

// Location validation
export const locationSchema = z.string()
  .trim()
  .min(2, "Location must be at least 2 characters")
  .max(100, "Location must be less than 100 characters")
  .transform(sanitizeString);

// Amount validation
export const amountSchema = z.number()
  .min(5, "Minimum amount is $5")
  .max(1000000, "Maximum amount is $1,000,000");

// Veteran ID last 4 digits
export const veteranIdSchema = z.string()
  .trim()
  .length(4, "Must be exactly 4 digits")
  .regex(/^\d{4}$/, "Must contain only numbers")
  .transform(sanitizeString);

/**
 * Complete form schemas
 */

// Booking form schema
export const bookingFormSchema = z.object({
  fullName: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  message: messageSchema(0, 1000).optional(),
  preferredDates: z.string().trim().max(500).optional(),
  isVeteran: z.boolean().default(false),
  veteranType: z.string().optional(),
  veteranIdLast4: z.string().optional(),
}).refine((data) => {
  // If veteran, require veteran type and ID
  if (data.isVeteran) {
    return data.veteranType && data.veteranIdLast4 && /^\d{4}$/.test(data.veteranIdLast4);
  }
  return true;
}, {
  message: "Veteran type and 4-digit ID are required for veteran discount",
  path: ["veteranIdLast4"],
});

// Donation form schema
export const donationFormSchema = z.object({
  donor_name: nameSchema,
  email: emailSchema,
  phone: phoneSchema.optional(),
  message: messageSchema(0, 1000).optional(),
  amount: amountSchema,
  sponsor_info: z.string().trim().max(200).optional(),
  recipient_info: z.string().trim().max(200).optional(),
  company_name: z.string().trim().min(2).max(200).optional(),
});

// Contact form schema
export const contactFormSchema = z.object({
  fullName: nameSchema,
  email: emailSchema,
  phone: phoneSchema.optional(),
  subject: subjectSchema,
  message: messageSchema(20, 2000),
  hearAbout: z.string().trim().max(100).optional(),
  contactMethod: z.enum(["email", "phone", "either"]).default("email"),
});

// Testimonial form schema
export const testimonialFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  location: locationSchema,
  rating: z.number().min(1, "Please select a rating").max(5),
  story: messageSchema(20, 1000),
});

// Newsletter schema
export const newsletterSchema = z.object({
  email: emailSchema,
});
