import { z } from "zod";

const codeRegex = /^[A-Za-z0-9_-]+$/;

export const createLinkSchema = z.object({
    url: z
        .url("Enter a valid URL")
        .trim()
        .max(2048, "URL is too long"),
    code: z
        .string()
        .trim()
        .optional()
        .refine((value) => !value || codeRegex.test(value), {
            message: "Use only letters, numbers, underscores, or dashes",
        })
        .refine((value) => !value || (value.length >= 3 && value.length <= 32), {
            message: "Custom codes must be 3–32 characters",
        }),
});

export const codeParamSchema = z
    .string()
    .trim()
    .min(3, "Code is required")
    .max(64, "Code is too long");

export type CreateLinkInput = z.infer<typeof createLinkSchema>;

