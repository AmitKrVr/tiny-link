"use client";

import { ArrowUpRight, ExternalLink, TrendingUp } from "lucide-react";

type StatTile = {
    label: string;
    value: string;
    helper: string;
    icon: React.ReactNode;
    accent: string;
};

type FeaturedLink = {
    code: string;
    url: string;
    shortUrl: string;
    totalClicks: number;
    createdAt: string;
    lastClickedAt: string | null;
};

type StatsHighlightsProps = {
    stats: StatTile[];
    highlight?: FeaturedLink;
};

function formatDate(date: string | null) {
    if (!date) return "Never";
    return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

function truncate(str: string, length: number) {
    return str.length > length ? `${str.substring(0, length)}…` : str;
}

export function StatsHighlights({ stats, highlight }: StatsHighlightsProps) {
    return (
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <div className="glass-panel p-6 sm:p-8">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                            Live performance
                        </p>
                        <p className="mt-1 text-2xl font-semibold text-slate-900 dark:text-white">
                            Campaign pulse
                        </p>
                    </div>
                    <span className="pill text-[11px] leading-none text-muted-foreground">
                        <TrendingUp className="h-3.5 w-3.5" />
                        refreshed just now
                    </span>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {stats.map((stat) => (
                        <article key={stat.label} className="stat-card group">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                                        {stat.label}
                                    </p>
                                    <p className="mt-2 text-4xl font-semibold text-slate-900 dark:text-white">
                                        {stat.value}
                                    </p>
                                </div>
                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.accent}`}
                                >
                                    {stat.icon}
                                </div>
                            </div>
                            <p className="mt-4 text-sm text-muted-foreground">{stat.helper}</p>
                        </article>
                    ))}
                </div>
            </div>

            <article
                id="links"
                className="glass-panel relative overflow-hidden p-6 sm:p-8"
            >
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),_transparent_45%)] opacity-60"
                />
                <div className="relative space-y-6">
                    {highlight ? (
                        <>
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="pill text-[11px] leading-none text-muted-foreground">
                                    spotlight link
                                </span>
                                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-300">
                                    +{highlight.totalClicks.toLocaleString()} clicks
                                </span>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-3xl font-semibold text-slate-900 dark:text-white">
                                    /{highlight.code}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {truncate(highlight.url, 80)}
                                </p>
                            </div>
                            <dl className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                                <div className="rounded-2xl border border-white/40 bg-white/70 px-4 py-3 shadow-sm dark:border-white/10 dark:bg-white/5">
                                    <dt className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                                        Created
                                    </dt>
                                    <dd className="mt-1 text-base font-semibold text-slate-900 dark:text-white">
                                        {formatDate(highlight.createdAt)}
                                    </dd>
                                </div>
                                <div className="rounded-2xl border border-white/40 bg-white/70 px-4 py-3 shadow-sm dark:border-white/10 dark:bg-white/5">
                                    <dt className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                                        Last click
                                    </dt>
                                    <dd className="mt-1 text-base font-semibold text-slate-900 dark:text-white">
                                        {formatDate(highlight.lastClickedAt)}
                                    </dd>
                                </div>
                            </dl>
                            <div className="flex flex-wrap gap-3">
                                <a
                                    href={`/code/${highlight.code}`}
                                    className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/70 px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-white/10 dark:text-white"
                                >
                                    View stats
                                    <ArrowUpRight className="h-4 w-4" />
                                </a>
                                <a
                                    href={highlight.shortUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/30 transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-900"
                                >
                                    Visit link
                                    <ExternalLink className="h-4 w-4" />
                                </a>
                            </div>
                        </>
                    ) : (
                        <div className="space-y-5">
                            <span className="pill text-[11px] leading-none text-muted-foreground">
                                Getting started
                            </span>
                            <h3 className="text-3xl font-semibold text-slate-900 dark:text-white">
                                Launch your first highlight
                            </h3>
                            <p className="text-base text-muted-foreground">
                                Create a short URL to activate this panel with realtime click
                                breakdowns and timeline insights.
                            </p>
                            <a
                                href="#create-link"
                                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:-translate-y-0.5"
                            >
                                Build a link
                                <ArrowUpRight className="h-4 w-4" />
                            </a>
                        </div>
                    )}
                </div>
            </article>
        </section>
    );
}