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

  // Queue in Axiom buffer — caller must await flushLogs() before returning
  // so all logs for a request are sent in one ordered batch.
  if (axiom) {
    axiom.ingest(dataset, [entry]);
  }
}

/** Flush all queued log entries to Axiom. Call once per request handler. */
export async function flushLogs(): Promise<void> {
  if (axiom) {
    await axiom.flush().catch(() => {});
  }
}
