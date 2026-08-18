import { notFound } from "next/navigation";
import Link from "next/link";
import { Cv } from "@/components/cv/Cv";
import { PageGuard } from "@/components/PageGuard";
import { PrintButton } from "@/components/PrintButton";
import { SelectionPanel } from "@/components/SelectionPanel";
import { listProfileSlugs, loadProfile } from "@/lib/profiles";
import { selectCv } from "@/lib/select";

export function generateStaticParams() {
  return listProfileSlugs().map((slug) => ({ slug }));
}

export default async function CvPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!listProfileSlugs().includes(slug)) notFound();

  const model = selectCv(loadProfile(slug));

  return (
    <main style={{ display: "flex", gap: "32px", padding: "32px", alignItems: "flex-start", justifyContent: "center" }}>
      <div className="no-print" style={{ width: "300px", flex: "none", position: "sticky", top: "32px" }}>
        <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
          <PrintButton />
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.06em",
              textTransform: "uppercase", border: "1px solid #c9c5be", color: "#3a3a3a",
              padding: "7px 12px", borderRadius: "5px", textDecoration: "none",
            }}
          >
            Profils
          </Link>
        </div>
        <SelectionPanel model={model} />
      </div>

      <Cv model={model} />
      <PageGuard />
    </main>
  );
}
