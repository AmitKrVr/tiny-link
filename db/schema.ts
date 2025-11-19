import {
    boolean,
    index,
    integer,
    pgTable,
    text,
    timestamp,
    uuid,
} from "drizzle-orm/pg-core";

export const links = pgTable(
    "links",
    {
        id: uuid("id").defaultRandom().primaryKey(),
        code: text("code").notNull().unique(),
        targetUrl: text("target_url").notNull(),
        totalClicks: integer("total_clicks").default(0).notNull(),
        createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
        lastClickedAt: timestamp("last_clicked_at", { mode: "date" }),
        isDeleted: boolean("is_deleted").default(false).notNull(),
    },
    (table) => [index("links_code_idx").on(table.code)],
);

export type Link = typeof links.$inferSelect;
export type NewLink = typeof links.$inferInsert;

