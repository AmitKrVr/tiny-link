"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
    BarChart3,
    Check,
    Copy,
    Loader2,
    MousePointerClick,
    Search,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { DeleteButton } from "@/components/DeleteButton";
import { useLinksStore } from "@/lib/stores/useLinksStore";
import type { SerializableLink } from "@/lib/types/link";

type LinksTableProps = {
    initialLinks?: SerializableLink[];
};

function formatDate(date: string | null) {
    if (!date) return "Never";
    return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export function LinksTable({ initialLinks = [] }: LinksTableProps) {
    const links = useLinksStore((state) => state.links);
    const loading = useLinksStore((state) => state.loading);
    const search = useLinksStore((state) => state.search);
    const error = useLinksStore((state) => state.error);
    const setLinks = useLinksStore((state) => state.setLinks);
    const setSearch = useLinksStore((state) => state.setSearch);
    const fetchLinks = useLinksStore((state) => state.fetchLinks);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [baseUrl] = useState(() => {
        const envBase = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "");
        if (envBase) return envBase;
        if (typeof window !== "undefined") {
            return window.location.origin.replace(/\/$/, "");
        }
        return "";
    });
    const hydratedInitial = useRef(false);

    useEffect(() => {
        if (hydratedInitial.current) {
            return;
        }

        if (initialLinks.length) {
            setLinks(initialLinks);
            hydratedInitial.current = true;
            return;
        }

        hydratedInitial.current = true;
        fetchLinks();
    }, [fetchLinks, initialLinks, setLinks]);

    const listToRender = links.length ? links : initialLinks;

    const filteredLinks = useMemo(() => {
        const term = search.trim().toLowerCase();
        if (!term) return listToRender;
        return listToRender.filter((link) => {
            const shortUrl = baseUrl ? `${baseUrl}/${link.code}` : `/${link.code}`;
            return (
                link.code.toLowerCase().includes(term) ||
                link.targetUrl.toLowerCase().includes(term) ||
                shortUrl.toLowerCase().includes(term)
            );
        });
    }, [baseUrl, listToRender, search]);

    const handleCopy = (code: string, linkId: string) => {
        const shortUrl = baseUrl ? `${baseUrl}/${code}` : `/${code}`;
        navigator.clipboard.writeText(shortUrl);
        setCopiedId(linkId);
        setTimeout(() => setCopiedId(null), 1800);
    };

    return (
        <div className="glass-panel h-full p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/30 pb-6 dark:border-white/10">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                        Live links
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                        Workspace inventory
                    </p>
                </div>
                <div className="relative w-full max-w-xs">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search code or URL"
                        className="h-11 rounded-full border-white/40 bg-white/70 pl-11 text-sm font-medium text-slate-900 placeholder:text-muted-foreground/70 shadow-inner dark:border-white/10 dark:bg-white/5 dark:text-white"
                    />
                </div>
            </div>

            <div className="mt-6">
                {error && (
                    <div className="mb-4 rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-400/40 dark:bg-red-500/10 dark:text-red-100">
                        {error}
                    </div>
                )}
                {loading ? (
                    <div className="flex items-center justify-center py-16 text-muted-foreground">
                        <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                        Fetching links…
                    </div>
                ) : filteredLinks.length === 0 ? (
                    <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-white/30 px-6 py-12 text-center text-muted-foreground dark:border-white/10">
                        <BarChart3 className="h-10 w-10 text-muted-foreground/70" />
                        <div>
                            <p className="text-lg font-semibold text-slate-900 dark:text-white">
                                {search ? "No matches yet" : "No links yet"}
                            </p>
                            <p className="text-sm">
                                {search
                                    ? "Try a different query or clear the filter."
                                    : "Create your first TinyLink to see it appear here."}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredLinks.map((link) => {
                            const isCopied = copiedId === link.id;
                            const shortUrl = baseUrl ? `${baseUrl}/${link.code}` : `/${link.code}`;
                            return (
                                <article
                                    key={link.id}
                                    className="rounded-3xl border border-white/40 bg-white/70 p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg dark:border-white/10 dark:bg-white/5"
                                >
                                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                                        <div className="min-w-0 space-y-2">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <span className="inline-flex items-center rounded-full bg-slate-900 px-4 py-1 text-sm font-semibold text-white dark:bg-white dark:text-slate-900">
                                                    /{link.code}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => handleCopy(link.code, link.id)}
                                                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${isCopied
                                                        ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-500/10 dark:text-emerald-200"
                                                        : "border-white/40 text-muted-foreground hover:border-white/70 dark:border-white/10"
                                                        }`}
                                                >
                                                    {isCopied ? (
                                                        <>
                                                            <Check className="h-3.5 w-3.5" />
                                                            Copied
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Copy className="h-3.5 w-3.5" />
                                                            {shortUrl}
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                            <p className="truncate text-sm text-muted-foreground">
                                                {link.targetUrl}
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap gap-4 text-sm">
                                            <div className="rounded-2xl border border-white/30 bg-white/70 px-4 py-3 text-slate-900 shadow-inner dark:border-white/10 dark:bg-white/5 dark:text-white">
                                                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                                                    Clicks
                                                </p>
                                                <p className="mt-1 text-2xl font-semibold">
                                                    {link.totalClicks.toLocaleString()}
                                                </p>
                                            </div>
                                            <div className="min-w-[120px]">
                                                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                                                    Created
                                                </p>
                                                <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                                                    {formatDate(link.createdAt)}
                                                </p>
                                            </div>
                                            <div className="min-w-[120px]">
                                                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                                                    Last click
                                                </p>
                                                <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                                                    {formatDate(link.lastClickedAt)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-5 flex flex-wrap items-center gap-3">
                                        <a
                                            href={`/code/${link.code}`}
                                            className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/70 sm:px-4 py-2 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/10 dark:text-white"
                                        >
                                            <BarChart3 className="h-4 w-4" />
                                            View stats
                                        </a>
                                        <a
                                            href={shortUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-slate-900/30 transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-900"
                                        >
                                            <MousePointerClick className="h-4 w-4" />
                                            Open link
                                        </a>
                                        <DeleteButton code={link.code} />
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
