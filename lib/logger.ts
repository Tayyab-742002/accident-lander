import { Axiom } from "@axiomhq/js";

const axiom =
  process.env.AXIOM_TOKEN && process.env.AXIOM_DATASET
    ? new Axiom({ token: process.env.AXIOM_TOKEN })
    : null;

const dataset = process.env.AXIOM_DATASET ?? "lander-logs";

type LogLevel = "info" | "warn" | "error";

export function log(level: LogLevel, data: Record<string, unknown>) {
  const entry = { level, ts: new Date().toISOString(), ...data };

  if (level === "error") console.error(JSON.stringify(entry));
  else if (level === "warn") console.warn(JSON.stringify(entry));
  else console.log(JSON.stringify(entry));

  // Also send to Axiom for persistent storage (fire-and-forget)
  if (axiom) {
    axiom.ingest(dataset, [entry]);
    axiom.flush().catch(() => {});
  }
}
