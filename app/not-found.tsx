import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
    return (
        <main className="app-shell flex min-h-[320px] items-center justify-center py-16">
            <div className="glass-panel space-y-5 rounded-3xl border border-white/30 bg-white/70 p-8 text-center text-slate-900 shadow-lg dark:border-white/10 dark:bg-white/5 dark:text-white">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900/5 text-slate-900 dark:bg-white/10 dark:text-white">
                    <Compass className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                    <h1 className="text-2xl font-semibold">Page not found</h1>
                    <p className="text-sm text-muted-foreground">
                        Looks like you ventured into uncharted territory. Double-check the URL or head
                        back to the dashboard.
                    </p>
                </div>
                <Link
                    href="/"
                    className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-slate-900/20 transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-900"
                >
                    Back to dashboard
                </Link>
            </div>
        </main>
    );
}
