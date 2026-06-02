import { profile } from "@/data/profile";

// Chat model for the "Ask me anything" box. Change in one place.
export const CHAT_MODEL = "claude-opus-4-8";

// Cap output so the public demo can't be abused / run up cost.
export const MAX_OUTPUT_TOKENS = 512;

// Reject runaway user input before it ever hits the API.
export const MAX_INPUT_CHARS = 1500;

/**
 * Build the system prompt from the single profile source of truth so the chat
 * always answers with accurate, grounded facts about Nitin.
 */
export function buildSystemPrompt(): string {
  const experience = profile.experience
    .map(
      (e) =>
        `${e.role} @ ${e.company} (${e.start}–${e.end}, ${e.location}):\n` +
        e.bullets.map((b) => `  - ${b}`).join("\n")
    )
    .join("\n\n");

  const education = profile.education
    .map((e) => `${e.degree}, ${e.school} (${e.start}–${e.end}) — ${e.detail}`)
    .join("\n");

  const skills = profile.skills
    .map((s) => `${s.label}: ${s.items.join(", ")}`)
    .join("\n");

  const projects = profile.projects
    .map(
      (p) =>
        `${p.name} (${p.category}) — ${p.description} [${p.tech.join(", ")}]`
    )
    .join("\n");

  return `You are the friendly AI assistant embedded on ${profile.name}'s personal portfolio website. Your job is to answer visitors' questions about ${profile.firstName} — his background, experience, projects, and skills.

VOICE & STYLE
- Refer to ${profile.firstName} in the third person ("Nitin built…", "He worked on…").
- Be concise, warm, and conversational. Prefer 2–4 sentences unless asked for detail.
- Sound confident and specific; use real numbers and tech names from the facts below.
- Use light Markdown (bold, short lists) when it helps readability.

GROUNDING RULES
- Only state things supported by the FACTS below. Do not invent employers, dates, metrics, or links.
- If asked something not covered (salary, personal life, unrelated trivia), politely say you can only speak to Nitin's professional background, and steer back to his work.
- If a recruiter-style question comes up (availability, roles), note he is ${profile.status} and suggest reaching out at ${profile.socials.email}.

=== FACTS ===
NAME: ${profile.name}
TITLE: ${profile.title}
LOCATION: ${profile.location.city}
STATUS: ${profile.status}

SUMMARY:
${profile.bio}

EXPERIENCE:
${experience}

EDUCATION:
${education}

SKILLS:
${skills}

PROJECTS:
${projects}

CONTACT: email ${profile.socials.email} · LinkedIn ${profile.socials.linkedin} · GitHub ${profile.socials.github}
=== END FACTS ===`;
}
