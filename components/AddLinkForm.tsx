"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Link2, Loader2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useLinksStore } from "@/lib/stores/useLinksStore";
import { createLinkSchema, type CreateLinkInput } from "@/lib/validation/link";
import { buildShortUrl } from "@/lib/utils";

export function AddLinkForm() {
    const form = useForm<CreateLinkInput>({
        resolver: zodResolver(createLinkSchema),
        defaultValues: {
            url: "",
            code: "",
        },
    });
    const { createLink } = useLinksStore();
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [message, setMessage] = useState("");
    const isSubmitting = form.formState.isSubmitting;

    const handleSubmit = async (values: CreateLinkInput) => {
        setStatus("idle");
        setMessage("");
        const payload: CreateLinkInput = {
            url: values.url.trim(),
            code: values.code?.trim() ? values.code.trim() : undefined,
        };

        try {
            const created = await createLink(payload);
            if (!created) {
                throw new Error("Failed to create short link");
            }

            setStatus("success");
            setMessage(`Short link ready: ${buildShortUrl(created.code)}`);
            form.reset();
        } catch (error) {
            const fallback =
                error instanceof Error
                    ? error.message
                    : "Failed to create short link";
            setStatus("error");
            setMessage(fallback);
        }
    };

    const successIconVisible = useMemo(
        () => status === "success" && !!message,
        [status, message],
    );

    const alertStyles =
        status === "success"
            ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-500/10 dark:text-emerald-200"
            : "border-red-300 bg-red-50 text-red-700 dark:border-red-400/30 dark:bg-red-500/10 dark:text-red-200";

    return (
        <div
            id="create-link"
            className="glass-panel relative overflow-hidden p-6 sm:p-8"
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.18),_transparent_45%)] opacity-70"
            />
            <div className="relative space-y-8">
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10">
                        <Link2 className="h-4 w-4" />
                        Create link
                    </div>
                    <div>
                        <p className="text-2xl font-semibold text-slate-900 dark:text-white">
                            Generate a branded TinyLink
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Drop a long URL, pick an optional slug, and ship it instantly.
                        </p>
                    </div>
                </div>

                <Form {...form}>
                    <form className="space-y-5" onSubmit={form.handleSubmit(handleSubmit)}>
                        <FormField
                            control={form.control}
                            name="url"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
                                        Target URL
                                    </FormLabel>
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="url"
                                                placeholder="https://example.com/launch-campaign"
                                                className="h-12 rounded-2xl border-white/40 bg-white/80 text-base font-medium text-slate-900 placeholder:text-muted-foreground/70 shadow-inner dark:border-white/15 dark:bg-white/10 dark:text-white"
                                            />
                                        </FormControl>
                                        {successIconVisible && (
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-emerald-500 p-1 text-white">
                                                <Check className="h-4 w-4" strokeWidth={3} />
                                            </span>
                                        )}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <FormLabel className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
                                            Custom code
                                        </FormLabel>
                                        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                                            (optional)
                                        </span>
                                    </div>
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="text"
                                                placeholder="launch-2025"
                                                className="h-12 rounded-2xl border-white/40 bg-white/80 text-base font-medium text-slate-900 placeholder:text-muted-foreground/70 shadow-inner pr-12 dark:border-white/15 dark:bg-white/10 dark:text-white"
                                            />
                                        </FormControl>
                                        <Sparkles className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {message && (
                            <div className={`rounded-2xl border px-4 py-3 text-sm font-medium ${alertStyles}`}>
                                {message}
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="group h-12 w-full rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-base font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:-translate-y-0.5 disabled:opacity-60"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Creating short link…
                                </>
                            ) : (
                                <>
                                    Launch link
                                    <Sparkles className="h-4 w-4 transition group-hover:rotate-12" />
                                </>
                            )}
                        </Button>
                    </form>
                </Form>

                <div className="rounded-2xl border border-white/30 bg-white/60 p-4 text-sm text-muted-foreground shadow-inner dark:border-white/10 dark:bg-white/5">
                    💡 <span className="font-semibold text-slate-900 dark:text-white">Pro tip:</span>{" "}
                    Leave the code empty to autogenerate a random, high-entropy slug.
                </div>
            </div>
        </div>
    );
}