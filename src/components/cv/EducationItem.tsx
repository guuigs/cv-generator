import type { EducationBlock } from "@/lib/types";
import { EntryHead, Meta } from "./primitives";

export function EducationItem({ block }: { block: EducationBlock }) {
  return (
    <article className="cv-entry">
      <EntryHead start={block.start} end={block.end}>
        <h3 style={{ fontSize: "var(--t-item)", fontWeight: 700, lineHeight: "12pt", letterSpacing: "-0.01em" }}>
          {block.degree}
          <span aria-hidden="true" style={{ color: "var(--color-faint)", fontWeight: 400 }}>{"\u00a0\u00a0|\u00a0\u00a0"}</span>
          <Meta size="8pt">{block.school}</Meta>
          {block.tag ? (
            <>
              <span aria-hidden="true" style={{ color: "var(--color-faint)", fontWeight: 400 }}>{"\u00a0\u00a0·\u00a0\u00a0"}</span>
              <Meta size="7pt" uppercase>{block.tag}</Meta>
            </>
          ) : null}
        </h3>
      </EntryHead>
    </article>
  );
}
