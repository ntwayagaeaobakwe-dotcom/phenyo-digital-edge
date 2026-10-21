import { z } from "zod";
import { FORM_SERVICE_OPTIONS } from "@/data/portfolio-data";

export const CONTACT_SOURCE_PATHS = [
  "/",
  "/services/web-design",
  "/services/website-redesign",
  "/services/custom-web-development",
] as const;

const normalizedName = z
  .string()
  .trim()
  .min(2, "Please enter your full name (at least 2 characters)")
  .max(150, "Please keep your name under 150 characters")
  .transform((value) => value.replace(/\s+/g, " "));

const normalizedEmail = z
  .string()
  .trim()
  .email("Please enter a valid email address")
  .max(254, "Please use an email address under 255 characters")
  .transform((value) => value.toLowerCase());

const selectedService = z
  .string()
  .refine((value) => (FORM_SERVICE_OPTIONS as readonly string[]).includes(value), {
    message: "Please select a listed service",
  });

const normalizedMessage = z
  .string()
  .trim()
  .min(10, "Please describe your requirement in at least 10 characters")
  .max(5000, "Please keep your project description under 5,000 characters")
  .transform((value) => value.replace(/\r\n?/g, "\n").replace(/\0/g, ""));

export const contactFormSchema = z.object({
  name: normalizedName,
  email: normalizedEmail,
  service: selectedService,
  message: normalizedMessage,
  companyWebsite: z.string().max(200).optional(),
});

export const contactSubmissionSchema = contactFormSchema.extend({
  submissionId: z.string().uuid(),
  industryContext: z.string().trim().max(300).nullable(),
  sourcePath: z.enum(CONTACT_SOURCE_PATHS),
});

export type ContactFormValues = z.input<typeof contactFormSchema>;
export type ValidatedContactFormValues = z.output<typeof contactFormSchema>;
export type ContactSubmission = z.infer<typeof contactSubmissionSchema>;
