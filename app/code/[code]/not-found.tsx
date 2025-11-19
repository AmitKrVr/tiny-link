import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function LinkNotFound() {
    return (
        <div className="app-shell flex min-h-[320px] items-center justify-center">
            <div className="glass-panel space-y-5 rounded-3xl border border-white/30 bg-white/70 p-8 text-center text-slate-900 shadow-lg dark:border-white/10 dark:bg-white/5 dark:text-white">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-200">
                    <AlertTriangle className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                    <h1 className="text-2xl font-semibold">Stats not found</h1>
                    <p className="text-sm text-muted-foreground">
                        We couldn&apos;t find analytics for this short code. It may have been deleted or never existed.
                    </p>
                </div>
                <Link
                    href="/"
                    className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-slate-900/20 transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-900"
                >
                    Back to dashboard
                </Link>
            </div>
        </div>
    );
}

