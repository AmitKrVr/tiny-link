import type { Link } from "@/db/schema";

export type SerializableLink = Omit<
    Link,
    "createdAt" | "lastClickedAt"
> & {
    createdAt: string;
    lastClickedAt: string | null;
};

export function toSerializableLink(link: Link): SerializableLink {
    return {
        ...link,
        createdAt: link.createdAt.toISOString(),
        lastClickedAt: link.lastClickedAt
            ? link.lastClickedAt.toISOString()
            : null,
    };
}

export function serializeLinks(links: Link[]): SerializableLink[] {
    return links.map(toSerializableLink);
}

