import type { CvModel } from "@/lib/types";
import { CvHeader } from "./CvHeader";
import { Section } from "./Section";
import { SkillGroup } from "./SkillGroup";
import { ExperienceItem } from "./ExperienceItem";
import { ProjectItem } from "./ProjectItem";
import { EducationItem } from "./EducationItem";

/**
 * Assemblage final. Ce composant ne décide de rien : il reçoit un `CvModel`
 * déjà sélectionné et se contente de le mettre en page.
 */
export function Cv({ model }: { model: CvModel }) {
  const { identity, headline, skillGroups, experiences, projects, education } = model;
  const density = model.profile.density ?? 1;

  return (
    <article className="cv-page" style={{ ["--density" as string]: String(density) }}>
      <CvHeader identity={identity} headline={headline} />

      {skillGroups.length > 0 ? (
        <div
          style={{
            marginTop: "var(--gap-section)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap: "7pt",
            rowGap: "10pt",
            alignItems: "start",
          }}
        >
          {skillGroups.map((g) => (
            <SkillGroup key={g.block.id} group={g.block} skills={g.skills} />
          ))}
        </div>
      ) : null}

      {experiences.length > 0 ? (
        <Section title="Expériences professionnelles" mark="star6">
          {experiences.map((e) => (
            <ExperienceItem key={e.block.id} block={e.block} bullets={e.bullets} />
          ))}
        </Section>
      ) : null}

      {projects.length > 0 ? (
        <Section title="Projets personnels et académiques" mark="sparkle">
          {projects.map((p) => (
            <ProjectItem key={p.block.id} block={p.block} bullets={p.bullets} />
          ))}
        </Section>
      ) : null}

      {education.length > 0 ? (
        <Section title="Formations" mark="triangle" gap="4pt">
          {education.map((e) => (
            <EducationItem key={e.block.id} block={e.block} />
          ))}
        </Section>
      ) : null}
    </article>
  );
}
