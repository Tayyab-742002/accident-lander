/**
 * Lead submission to LeadProsper CRM.
 *
 * All webhook config lives here so the component stays clean.
 * Change WEBHOOK_URL or the LP params when switching campaigns.
 */

const WEBHOOK_URL = "https://api.leadprosper.io/direct_post/";

const LP_PARAMS = {
  lp_campaign_id: "31984",
  lp_supplier_id: "109790",
  lp_key: "75o1ukjm1a61oo",
  lp_action: "",
  lp_subid1: "",
  lp_subid2: "",
} as const;

/* ── quiz answer keys (step index → API field) ─────────────── */

export interface QuizAnswers {
  Was_in_accident: string; // step 1
  Accident_timeframe: string; // step 2
  At_fault: string; // step 3
  Was_injured: string; // step 4
  Medical_treatment: string; // step 5
  Has_lawyer: string; // step 6
  Accident_Details: string; // step 7 (story)
}

export interface ContactFields {
  Full_Name: string;
  Phone: string;
  Email: string;
  street: string;
  city: string;
  State: string;
  zip_code: string;
}

export interface LeadPayload extends QuizAnswers, ContactFields {
  Page_URL: string;
  IP_Address: string;
  Inquiry_date: string;
  TCPA_Consent: string;
  fbp: string;
  fbc: string;
  user_agent: string;
  xxTrustedFormCertUrl: string;
  xxTrustedFormPingUrl: string;
  xxTrustedFormToken: string;
}

/* ── helpers ────────────────────────────────────────────────── */

/** Fetch visitor IP – best-effort, returns '' on failure. */
let cachedIp: string | null = null;

export async function getVisitorIp(): Promise<string> {
  if (cachedIp !== null) return cachedIp;
  // Try two providers in parallel, take whichever responds first
  try {
    const result = await Promise.any([
      fetch("https://api.ipify.org?format=json", { signal: AbortSignal.timeout(3000) })
        .then((r) => r.json()).then((d) => d.ip as string),
      fetch("https://api.my-ip.io/v2/ip.json", { signal: AbortSignal.timeout(3000) })
        .then((r) => r.json()).then((d) => d.ip as string),
    ]);
    cachedIp = result ?? "";
  } catch {
    cachedIp = "";
  }
  return cachedIp!;
}

/** Read TrustedForm hidden fields injected by their script. */
export function getTrustedFormValues() {
  const cert =
    document.querySelector<HTMLInputElement>(
      'input[name="xxTrustedFormCertUrl"]',
    )?.value ?? "";
  const ping =
    document.querySelector<HTMLInputElement>(
      'input[name="xxTrustedFormPingUrl"]',
    )?.value ?? "";
  const token =
    document.querySelector<HTMLInputElement>('input[name="xxTrustedFormToken"]')
      ?.value ?? "";
  return {
    xxTrustedFormCertUrl: cert,
    xxTrustedFormPingUrl: ping,
    xxTrustedFormToken: token,
  };
}

/** Read Meta cookies for webhook passthrough fields. */
export function getMetaCookieValues(): { fbp: string; fbc: string } {
  const cookies = Object.fromEntries(
    document.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .filter(Boolean)
      .map((cookie) => {
        const [key, ...rest] = cookie.split("=");
        return [decodeURIComponent(key), decodeURIComponent(rest.join("="))];
      }),
  );

  return {
    fbp: cookies._fbp ?? "",
    fbc: cookies._fbc ?? "",
  };
}

/** Format current date as MM/DD/YYYY (matches LeadProsper example). */
export function formatInquiryDate(): string {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}

/* ── main post ──────────────────────────────────────────────── */

export interface PostResult {
  ok: boolean;
  status: "ACCEPTED" | "DUPLICATED" | "ERROR" | "NETWORK_ERROR";
  message: string;
}

export async function postLead(payload: LeadPayload): Promise<PostResult> {
  // Build form-urlencoded body (more reliable across CORS setups)
  const body = new URLSearchParams({
    ...LP_PARAMS,
    ...payload,
  });

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    const data = await res.json();

    if (data.status === "ACCEPTED") {
      return { ok: true, status: "ACCEPTED", message: "" };
    }

    return {
      ok: false,
      status: data.status ?? "ERROR",
      message: data.message ?? "Lead was not accepted.",
    };
  } catch (err) {
    return {
      ok: false,
      status: "NETWORK_ERROR",
      message: err instanceof Error ? err.message : "Network error.",
    };
  }
}
