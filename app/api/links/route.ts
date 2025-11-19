import { NextResponse } from "next/server";

import { createShortLink, getActiveLinks } from "@/lib/data/links";
import { createLinkSchema } from "@/lib/validation/link";
import { revalidateDashboard } from "@/app/actions/revalidate";
import {
    serializeLinks,
    toSerializableLink,
} from "@/lib/types/link";
import { LinkError } from "@/lib/errors";

export async function GET() {
    const data = await getActiveLinks();
    return NextResponse.json(serializeLinks(data));
}

export async function POST(request: Request) {
    try {
        const json = await request.json();
        const payload = createLinkSchema.parse(json);
        const created = await createShortLink({
            url: payload.url,
            code: payload.code,
        });

        await revalidateDashboard();

        return NextResponse.json(toSerializableLink(created), { status: 201 });
    } catch (error) {
        if (error instanceof LinkError) {
            return NextResponse.json(
                { message: error.message },
                { status: error.status },
            );
        }

        if (error instanceof Error) {
            return NextResponse.json(
                { message: error.message },
                { status: 400 },
            );
        }

        return NextResponse.json(
            { message: "Unexpected error" },
            { status: 500 },
        );
    }
}

