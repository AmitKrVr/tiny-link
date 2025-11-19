"use server";

import { and, desc, eq, sql } from "drizzle-orm";

import { links } from "@/db/schema";
import { db } from "@/lib/db";
import { generateShortCode } from "@/lib/utils";
import { LinkError } from "@/lib/errors";

const MAX_RANDOM_ATTEMPTS = 8;

export async function getActiveLinks() {
    return db
        .select()
        .from(links)
        .where(eq(links.isDeleted, false))
        .orderBy(desc(links.createdAt));
}

export async function getLinkByCode(code: string, includeDeleted = false) {
    return db.query.links.findFirst({
        where: (table, { eq }) =>
            includeDeleted
                ? eq(table.code, code)
                : and(eq(table.code, code), eq(table.isDeleted, false)),
    });
}

async function ensureCodeIsUnique(code: string) {
    const existing = await getLinkByCode(code, true);
    if (existing) {
        throw new LinkError("Custom code already exists. Please try different one", 409);
    }
}

export async function createShortLink(input: {
    url: string;
    code?: string | null;
}) {
    const normalizedUrl = input.url.trim();
    const providedCode = input.code?.trim();

    let finalCode = providedCode;

    if (finalCode) {
        await ensureCodeIsUnique(finalCode);
    } else {
        let attempts = 0;
        let generated: string | null = null;

        while (attempts < MAX_RANDOM_ATTEMPTS) {
            const candidate = generateShortCode();
            const exists = await getLinkByCode(candidate, true);

            if (!exists) {
                generated = candidate;
                break;
            }

            attempts += 1;
        }

        if (!generated) {
            throw new LinkError("Failed to generate a unique code", 500);
        }

        finalCode = generated;
    }

    const rows = await db
        .insert(links)
        .values({
            code: finalCode,
            targetUrl: normalizedUrl,
        })
        .returning();

    return rows[0];
}

export async function deleteLinkByCode(code: string) {
    const rows = await db
        .update(links)
        .set({
            isDeleted: true,
        })
        .where(and(eq(links.code, code), eq(links.isDeleted, false)))
        .returning();

    if (!rows.length) {
        throw new LinkError("Short link not found", 404);
    }

    return rows[0];
}

export async function incrementLinkMetrics(code: string) {
    const rows = await db
        .update(links)
        .set({
            totalClicks: sql`${links.totalClicks} + 1`,
            lastClickedAt: new Date(),
        })
        .where(and(eq(links.code, code), eq(links.isDeleted, false)))
        .returning();

    if (!rows.length) {
        throw new LinkError("Short link not found", 404);
    }

    return rows[0];
}

