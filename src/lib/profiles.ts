import fs from "node:fs";
import path from "node:path";
import type { CvProfile } from "./types";
import { cvProfileSchema } from "./profile-schema";

const PROFILES_DIR = path.join(process.cwd(), "profiles");

export function listProfileSlugs(): string[] {
  if (!fs.existsSync(PROFILES_DIR)) return [];
  return fs
    .readdirSync(PROFILES_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""))
    .sort();
}

export function loadProfile(slug: string): CvProfile {
  const file = path.join(PROFILES_DIR, `${slug}.json`);
  if (!fs.existsSync(file)) throw new Error(`[cv] Profil introuvable : profiles/${slug}.json`);
  const raw: unknown = JSON.parse(fs.readFileSync(file, "utf8"));
  const parsed = cvProfileSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(
      `[cv] profiles/${slug}.json invalide :\n` +
        parsed.error.issues.map((i) => `  - ${i.path.join(".") || "(racine)"} : ${i.message}`).join("\n"),
    );
  }
  if (parsed.data.slug !== slug) {
    throw new Error(`[cv] profiles/${slug}.json : le champ "slug" vaut "${parsed.data.slug}".`);
  }
  return parsed.data as CvProfile;
}

export function loadAllProfiles(): CvProfile[] {
  return listProfileSlugs().map(loadProfile);
}
