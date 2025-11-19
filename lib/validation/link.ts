import { z } from "zod";

const codeRegex = /^[A-Za-z0-9]{6,8}$/;

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
            message: "Custom codes must be 6–8 characters using only letters and numbers",
        }),
});

export const codeParamSchema = z
    .string()
    .trim()
    .regex(codeRegex, "Code must be 6–8 characters using only letters and numbers");

export type CreateLinkInput = z.infer<typeof createLinkSchema>;

