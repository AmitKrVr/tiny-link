import { notFound } from "next/navigation";
import { NextResponse } from "next/server";

import { incrementLinkMetrics } from "@/lib/data/links";
import { codeParamSchema } from "@/lib/validation/link";
import { LinkError } from "@/lib/errors";

type PageProps = {
    params: Promise<{ code: string }>;
};

export default async function RedirectPage({ params }: PageProps) {
    const { code } = await params;
    const validated = codeParamSchema.parse(code);

    try {
        const link = await incrementLinkMetrics(validated);
        return NextResponse.redirect(link.targetUrl, { status: 302 });
    } catch (error) {
        if (error instanceof LinkError && error.status === 404) {
            notFound();
        }

        throw error;
    }
}

