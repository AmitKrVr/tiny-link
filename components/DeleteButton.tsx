"use client";

import { useState } from "react";
import { Loader2, Trash } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useLinksStore } from "@/lib/stores/useLinksStore";

type DeleteButtonProps = {
    code: string;
};

export function DeleteButton({ code }: DeleteButtonProps) {
    const { deleteLink } = useLinksStore();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await deleteLink(code);
            toast.success("Link deleted", {
                description: `/${code} removed`,
            });
            setOpen(false);
        } catch (error) {
            const fallback =
                error instanceof Error ? error.message : "Failed to delete link";
            toast.error("Delete failed", { description: fallback });
        } finally {
            setLoading(false);
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={(value) => !loading && setOpen(value)}>
            <AlertDialogTrigger asChild>
                <Button
                    variant="destructive"
                    size="sm"
                    className="cursor-pointer transition hover:-translate-y-0.5"
                >
                    <Trash className="h-3.5 w-3.5" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete short link</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently remove <span className="font-semibold">/{code}</span> and
                        any associated analytics. This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={(event) => {
                            event.preventDefault();
                            void handleDelete();
                        }}
                        disabled={loading}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Delete link
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}