import { Link as LinkGlyph, MousePointerClick } from "lucide-react";

import { getActiveLinks } from "@/lib/data/links";
import { buildShortUrl } from "@/lib/utils";
import { serializeLinks } from "@/lib/types/link";
import { AddLinkForm } from "@/components/AddLinkForm";
import { Header } from "@/components/Header";
import { LinksTable } from "@/components/LinksTable";
import { StatsHighlights } from "@/components/StatsHighlights";

export default async function DashboardPage() {
  const links = await getActiveLinks();
  const serializable = serializeLinks(links);
  const totalLinks = serializable.length;
  const totalClicks = serializable.reduce(
    (sum, link) => sum + link.totalClicks,
    0,
  );
  const statCards = [
    {
      label: "Short links",
      value: totalLinks.toString(),
      helper: totalLinks === 1 ? "live code" : "live codes",
      accent: "bg-primary/10 text-primary dark:bg-primary/20",
      icon: <LinkGlyph className="h-5 w-5" />,
    },
    {
      label: "Total clicks",
      value: totalClicks.toLocaleString(),
      helper: "total clicks",
      accent:
        "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-200",
      icon: <MousePointerClick className="h-5 w-5" />,
    },
  ];
  const highlight = serializable[0]
    ? {
      code: serializable[0].code,
      url: serializable[0].targetUrl,
      shortUrl: buildShortUrl(serializable[0].code),
      totalClicks: serializable[0].totalClicks,
      createdAt: serializable[0].createdAt,
      lastClickedAt: serializable[0].lastClickedAt,
    }
    : undefined;

  return (
    <main className="app-shell pb-16">
      <Header />
      <StatsHighlights stats={statCards} highlight={highlight} />
      <section className="grid gap-6 lg:grid-cols-[400px,1fr]">
        <AddLinkForm />
        <LinksTable initialLinks={serializable} />
      </section>
    </main>
  );
}
