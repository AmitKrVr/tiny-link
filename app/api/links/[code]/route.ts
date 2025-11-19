import { NextRequest, NextResponse } from "next/server";

import { deleteLinkByCode, getLinkByCode } from "@/lib/data/links";
import { codeParamSchema } from "@/lib/validation/link";
import { revalidateDashboard } from "@/app/actions/revalidate";
import {
    toSerializableLink,
} from "@/lib/types/link";
import { LinkError } from "@/lib/errors";

type RouteContext = {
    params: Promise<{ code: string }>;
};

export async function GET(_: NextRequest, context: RouteContext) {
    const { code } = await context.params;
    const validated = codeParamSchema.parse(code);
    const link = await getLinkByCode(validated);

    if (!link) {
        return NextResponse.json({ message: "Link not found" }, { status: 404 });
    }

    return NextResponse.json(toSerializableLink(link));
}

export async function DELETE(_: NextRequest, context: RouteContext) {
    try {
        const { code } = await context.params;
        const validated = codeParamSchema.parse(code);
        const link = await deleteLinkByCode(validated);

        await revalidateDashboard();

        return NextResponse.json(toSerializableLink(link));
    } catch (error) {
        if (error instanceof LinkError) {
            return NextResponse.json(
                { message: error.message },
                { status: error.status },
            );
        }

        return NextResponse.json(
            { message: "Unexpected error" },
            { status: 500 },
        );
    }
}