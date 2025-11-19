import { create } from "zustand";

import { api, getApiErrorMessage } from "@/lib/http";
import type { SerializableLink } from "@/lib/types/link";
import type { CreateLinkInput } from "@/lib/validation/link";

type LinksState = {
    links: SerializableLink[];
    loading: boolean;
    error?: string;
    search: string;
    setLinks: (links: SerializableLink[]) => void;
    fetchLinks: () => Promise<void>;
    createLink: (data: CreateLinkInput) => Promise<SerializableLink | undefined>;
    deleteLink: (code: string) => Promise<void>;
    setSearch: (value: string) => void;
};

export const useLinksStore = create<LinksState>((set, get) => ({
    links: [],
    loading: false,
    search: "",
    setLinks(links) {
        set({ links });
    },
    async fetchLinks() {
        set({ loading: true, error: undefined });
        try {
            const { data } = await api.get<SerializableLink[]>("/links");
            set({ links: data });
        } catch (error) {
            console.error(error);
            set({ error: "Failed to load links" });
        } finally {
            set({ loading: false });
        }
    },
    async createLink(payload) {
        set({ error: undefined });
        try {
            const { data } = await api.post<SerializableLink>("/links", payload);
            set({ links: [data, ...get().links] });
            return data;
        } catch (error) {
            const message = getApiErrorMessage(error, "Failed to create link");
            console.error(error);
            set({ error: message });
            throw new Error(message);
        }
    },
    async deleteLink(code) {
        set({ error: undefined });
        try {
            await api.delete(`/links/${code}`);
            set({ links: get().links.filter((link) => link.code !== code) });
        } catch (error) {
            const message = getApiErrorMessage(error, "Failed to delete link");
            console.error(error);
            set({ error: message });
            throw new Error(message);
        }
    },
    setSearch(value) {
        set({ search: value });
    },
}));

