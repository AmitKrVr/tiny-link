import Link from "next/link";
import { notFound } from "next/navigation";

import { getLinkByCode } from "@/lib/data/links";
import { codeParamSchema } from "@/lib/validation/link";
import { buildShortUrl, formatDate } from "@/lib/utils";
import { CopyButton } from "@/components/CopyButton";
import { ArrowLeft } from "lucide-react";

type PageProps = {
    params: Promise<{ code: string }>;
};

export default async function LinkStatsPage({ params }: PageProps) {
    const { code } = await params;
    const validated = codeParamSchema.parse(code);
    const link = await getLinkByCode(validated);

    if (!link) {
        notFound();
    }

    const shortUrl = buildShortUrl(link.code);

    return (
        <div className="app-shell">
            <div>
                <Link
                    href="/"
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary px-3 py-2 rounded-md hover:bg-slate-200"
                >
                    <ArrowLeft size={17} /> Back to dashboard
                </Link>
            </div>

            <div className="rounded-3xl border border-border bg-white/80 p-8 shadow-sm backdrop-blur dark:bg-neutral-900/60">
                <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium uppercase tracking-widest text-primary">
                        Stats
                    </p>
                    <h1 className="text-3xl font-semibold text-foreground md:text-4xl">
                        /{link.code}
                    </h1>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <p className="text-sm text-muted-foreground">{link.targetUrl}</p>
                        <div>
                            <CopyButton value={shortUrl} />
                        </div>
                    </div>
                </div>

                <dl className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <Stat label="Total Clicks" value={link.totalClicks.toString()} />
                    <Stat label="Last Clicked" value={formatDate(link.lastClickedAt)} />
                    <Stat label="Created" value={formatDate(link.createdAt)} />
                </dl>
            </div>
        </div>
    );
}

type StatProps = {
    label: string;
    value: string;
};

function Stat({ label, value }: StatProps) {
    return (
        <div className="rounded-2xl border border-border bg-white/70 p-4 shadow-sm dark:bg-neutral-900/50">
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {label}
            </dt>
            <dd className="mt-2 text-xl font-semibold text-foreground">{value}</dd>
        </div>
    );
}

