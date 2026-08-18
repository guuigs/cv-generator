import type { ProjectBlock, ScoredBullet } from "@/lib/types";
import { Bullets, EntryHead, Meta } from "./primitives";

export function ProjectItem({ block, bullets }: { block: ProjectBlock; bullets: ScoredBullet[] }) {
  return (
    <article className="cv-entry">
      <EntryHead start={block.year}>
        <h3 style={{ fontSize: "var(--t-item)", fontWeight: 700, lineHeight: "12pt", letterSpacing: "-0.01em" }}>
          {block.title}
          {block.subtitle ? (
            <>
              <span aria-hidden="true" style={{ color: "var(--color-faint)", fontWeight: 400 }}>{" — "}</span>
              {block.subtitle}
            </>
          ) : null}
        </h3>
      </EntryHead>

      {block.url ? (
        <p style={{ marginTop: "1.5pt", lineHeight: "10pt" }}>
          <Meta size="8pt">{block.url.replace(/^https?:\/\//, "")}</Meta>
        </p>
      ) : null}

      <Bullets items={bullets} />
    </article>
  );
}
