"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

type CopyButtonProps = {
    value: string;
};

export function CopyButton({ value }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
    };

    useEffect(() => {
        if (!copied) return;
        const timeout = setTimeout(() => setCopied(false), 1500);
        return () => clearTimeout(timeout);
    }, [copied]);

    return (
        <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition ${copied
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-border text-muted-foreground hover:bg-muted"
                }`}
        >
            {copied ? (
                <>
                    <Check className="h-3.5 w-3.5" />
                    Copied
                </>
            ) : (
                <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy
                </>
            )}
        </button>
    );
}

