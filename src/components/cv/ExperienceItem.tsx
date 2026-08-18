import type { ExperienceBlock, ScoredBullet } from "@/lib/types";
import { Bullets, EntryHead, Meta } from "./primitives";

export function ExperienceItem({ block, bullets }: { block: ExperienceBlock; bullets: ScoredBullet[] }) {
  const org = [block.orgLong ? `${block.org} (${block.orgLong})` : block.org, block.location]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className="cv-entry">
      <EntryHead start={block.start} end={block.end}>
        <h3 style={{ fontSize: "var(--t-item)", fontWeight: 700, lineHeight: "12pt", letterSpacing: "-0.01em" }}>
          {block.role}
          {block.contract ? (
            <>
              <span aria-hidden="true" style={{ color: "var(--color-faint)", fontWeight: 400 }}>{" — "}</span>
              <Meta size="7pt" uppercase>{block.contract}</Meta>
            </>
          ) : null}
        </h3>
      </EntryHead>

      <p style={{ marginTop: "1.5pt", lineHeight: "10pt" }}>
        <Meta size="8pt">{org}</Meta>
      </p>

      <Bullets items={bullets} />
    </article>
  );
}
