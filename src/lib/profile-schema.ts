import { z } from "zod";

export const offerKeywordSchema = z.object({
  term: z.string().min(1),
  weight: z.number().min(0).max(1),
});

export const cvProfileSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, "slug: minuscules, chiffres et tirets uniquement"),
  offer: z.object({
    title: z.string().min(1),
    company: z.string().min(1),
    url: z.string().url().optional(),
    location: z.string().optional(),
    notes: z.string().optional(),
  }),
  headline: z.string().optional(),
  keywords: z.array(offerKeywordSchema).default([]),
  pin: z.array(z.string()).optional(),
  drop: z.array(z.string()).optional(),
  order: z.array(z.string()).optional(),
  limits: z
    .object({
      experiences: z.number().int().positive().optional(),
      projects: z.number().int().nonnegative().optional(),
      education: z.number().int().nonnegative().optional(),
      skillGroups: z.number().int().positive().optional(),
      bulletsPerItem: z.number().int().positive().optional(),
      skillsPerGroup: z.number().int().positive().optional(),
    })
    .optional(),
  density: z.number().min(0.85).max(1.15).optional(),
});

export type CvProfileInput = z.input<typeof cvProfileSchema>;
