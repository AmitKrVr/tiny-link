"use client";

import { Loader2, Trash } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useLinksStore } from "@/lib/stores/useLinksStore";

type DeleteButtonProps = {
    code: string;
};

export function DeleteButton({ code }: DeleteButtonProps) {
    const { deleteLink } = useLinksStore();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        const confirmed = window.confirm(
            `Delete short link "${code}"? This cannot be undone.`,
        );
        if (!confirmed) return;

        setLoading(true);
        try {
            await deleteLink(code);
            toast.success("Link deleted", {
                description: `/${code} removed`,
            });
        } catch (error) {
            const fallback =
                error instanceof Error ? error.message : "Failed to delete link";
            toast.error("Delete failed", { description: fallback });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            disabled={loading}
            className="text-muted-foreground hover:text-destructive"
        >
            {loading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
                <Trash className="h-3.5 w-3.5" />
            )}
            Delete
        </Button>
    );
}

