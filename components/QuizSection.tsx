"use client";

import { useState, useRef, useEffect } from "react";
import { generateEventId, sendCAPIEvent } from "@/lib/capi";
import { useTranslations } from "next-intl";
import PrivacyModal from "./PrivacyModal";
import TermsModal from "./TermsModal";
import DisclaimerModal from "./DisclaimerModal";
import {
  type QuizAnswers,
  type LeadPayload,
  postLead,
  getVisitorIp,
  getTrustedFormValues,
  getMetaCookieValues,
  formatInquiryDate,
} from "@/lib/leadpost";
import { trackEvent } from "@/lib/fbq";
import { getVariantConfig } from "@/lib/variants";

type StepId = 1 | 2 | 3 | 4 | 5 | 6 | "ty";

interface OptionItem {
  label: string;
  sub?: string;
  dq?: boolean;
}

const PCT: Record<string, number> = {
  "1": 16, "2": 32, "3": 48, "4": 64, "5": 80, "6": 95, "ty": 100,
};
const TOTAL_STEPS = 6;

function validatePhone(v: string): boolean {
  const d = v.replace(/\D/g, "");
  if (d.length === 11 && d[0] === "1") return d[1] !== "0" && d[1] !== "1";
  if (d.length === 10) return d[0] !== "0" && d[0] !== "1";
  return false;
}

function formatPhoneInput(raw: string): string {
  const d = raw.replace(/\D/g, "").substring(0, 10);
  if (d.length >= 6) return `(${d.substring(0, 3)}) ${d.substring(3, 6)}-${d.substring(6)}`;
  if (d.length >= 3) return `(${d.substring(0, 3)}) ${d.substring(3)}`;
  return d;
}

export default function QuizSection({ locale }: { locale: string }) {
  const t = useTranslations("quiz");
  const { stateOptions } = getVariantConfig(locale);

  const [stepHistory, setStepHistory] = useState<StepId[]>([1]);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [tcpaChecked, setTcpaChecked] = useState(false);

  const wrapRef = useRef<HTMLDivElement>(null);
  const submittingRef = useRef(false);

  const currentStep = stepHistory[stepHistory.length - 1];
  const done = currentStep === "ty";
  const progressPct = PCT[String(currentStep)] ?? 95;
  const stepNum = typeof currentStep === "number" ? currentStep : null;

  useEffect(() => {
    getVisitorIp();
  }, []);

  function scrollToTop() {
    wrapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function goToStep(id: StepId) {
    setStepHistory((prev) => [...prev, id]);
    setTimeout(scrollToTop, 50);
  }

  function goBack() {
    setStepHistory((prev) => {
      if (prev.length <= 1) return prev;
      return prev.slice(0, -1);
    });
    setTimeout(scrollToTop, 50);
  }

  function selectOption(updates: Partial<QuizAnswers>, next: StepId) {
    setAnswers((prev) => ({ ...prev, ...updates }));
    // Fire SubmitApplication once on the very first quiz selection
    if (stepHistory.length === 1) {
      const eventId = generateEventId();
      trackEvent("SubmitApplication", {}, eventId);
      getVisitorIp().then((ip) => sendCAPIEvent("SubmitApplication", eventId, { ip }));
    }
    setTimeout(() => goToStep(next), 300);
  }

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submittingRef.current) return;

    const form = e.currentTarget;
    const fd = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement).value.trim();

    const name = fd("fullName");
    const email = fd("email");
    const phone = fd("phone");
    const state = fd("state");

    const errors: Record<string, string> = {};
    if (name.length < 3) errors.fullName = t("s6.errName");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = t("s6.errEmail");
    if (!validatePhone(phone)) errors.phone = t("s6.errPhone");
    if (!state) errors.state = t("s6.errState");
    if (!tcpaChecked) errors.tcpa = t("s6.errTcpa");

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    submittingRef.current = true;
    setSubmitting(true);

    try {
      const ip = await getVisitorIp();
      const tf = getTrustedFormValues();
      const { fbp, fbc } = getMetaCookieValues();

      const payload: LeadPayload = {
        Was_in_accident: answers.Was_in_accident ?? "",
        Accident_timeframe: answers.Accident_timeframe ?? "",
        At_fault: answers.At_fault ?? "",
        Was_injured: answers.Was_injured ?? "",
        Medical_treatment: answers.Medical_treatment ?? "",
        Has_lawyer: answers.Has_lawyer ?? "",
        find_out_exactly_what_you_owed: "",
        Accident_Details: "",
        Full_Name: name,
        Phone: phone,
        Email: email,
        street: "",
        city: "",
        State: state,
        zip_code: "",
        Page_URL: window.location.href,
        IP_Address: ip,
        Inquiry_date: formatInquiryDate(),
        TCPA_Consent: "Accepted",
        fbp,
        fbc,
        user_agent: navigator.userAgent,
        xxTrustedFormCertUrl: tf.xxTrustedFormCertUrl,
        xxTrustedFormPingUrl: tf.xxTrustedFormPingUrl,
        xxTrustedFormToken: tf.xxTrustedFormToken,
      };

      // Fire-and-forget — don't block CAPI on CRM latency
      postLead(payload).catch(() => {});

      const [firstName, ...rest] = name.split(" ");
      const lastName = rest.join(" ");
      const eventId = generateEventId();
      trackEvent("CompleteRegistration", {}, eventId);
      await sendCAPIEvent("CompleteRegistration", eventId, {
        email,
        phone,
        firstName,
        lastName,
        state,
        zipcode: "",
        city: "",
        ip,
      });

      goToStep("ty");
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  }

  return (
    <div className="shell" ref={wrapRef}>

      {/* TOP NAV */}
      <div className="topnav">
        <div className="logo">
          <div className="logo-icon">⚖️</div>
          {t("topnav.logo")}
        </div>
        <div className="live-badge">
          <span className="live-dot" />
          {t("topnav.badge")}
        </div>
      </div>

      {/* CARD */}
      <div className="card">

        {/* SOCIAL PROOF BAR */}
        <div className="sp-bar">
          <div className="sp-avatars">
            <div className="av av1">JM</div>
            <div className="av av2">TS</div>
            <div className="av av3">RL</div>
            <div className="av av4">KP</div>
          </div>
          <div className="sp-text">{t("socialProof.text")}</div>
        </div>

        {/* CARD HEADER */}
        <div className="card-hdr">
          <div className="eyebrow">{t("header.eyebrow")}</div>
          <div className="hdr-title">
            {t("header.title")}<em>{t("header.titleEm")}</em>
          </div>
          <div className="hdr-sub">
            {t("header.sub1")}<strong>{t("header.subStrong")}</strong>{t("header.sub2")}
          </div>
        </div>

        {/* PROGRESS */}
        {!done && (
          <div className="prog-wrap">
            <div className="prog-meta">
              <span className="prog-label">
                {stepNum
                  ? `${t("stepOf", { step: stepNum, total: TOTAL_STEPS })}`
                  : ""}
              </span>
              <span className="prog-pct">{progressPct}% {t("progressComplete")}</span>
            </div>
            <div className="prog-track">
              <div className="prog-fill" style={{ width: `${progressPct}%` }} />
            </div>
          </div>
        )}

        {/* CARD BODY */}
        <div className="card-body">

          {/* THANK YOU */}
          {done && (
            <div className="step ty-box">
              <div className="ty-icon">🎉</div>
              <div className="ty-title">{t("thankyou.title")}</div>
              <div className="ty-sub">{t("thankyou.sub")}</div>
              <div className="ty-steps">
                <div className="ty-step">
                  <div className="ty-num">1</div>
                  <div className="ty-step-text">
                    <strong>{t("thankyou.step1Title")}</strong>
                    <span>{t("thankyou.step1Body")}</span>
                  </div>
                </div>
                <div className="ty-step">
                  <div className="ty-num">2</div>
                  <div className="ty-step-text">
                    <strong>{t("thankyou.step2Title")}</strong>
                    <span>{t("thankyou.step2Body")}</span>
                  </div>
                </div>
                <div className="ty-step">
                  <div className="ty-num">3</div>
                  <div className="ty-step-text">
                    <strong>{t("thankyou.step3Title")}</strong>
                    <span>{t("thankyou.step3Body")}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 1 — Accident type */}
          {!done && currentStep === 1 && (
            <div className="step">
              <div className="q-title">{t("s1.question")}</div>
              <div className="q-hint">{t("s1.hint")}</div>
              <div className="opts">
                {(t.raw("s1.options") as OptionItem[]).map((opt, i) => (
                  <button
                    key={i}
                    className="opt"
                    onClick={() => selectOption({ Was_in_accident: opt.label }, 2)}
                  >
                    <div className="opt-check" />
                    <div className="opt-text">
                      <span className="opt-label">{opt.label}</span>
                      {opt.sub && <span className="opt-sub">{opt.sub}</span>}
                    </div>
                    <span className="opt-arrow">›</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2 — Timeframe */}
          {!done && currentStep === 2 && (
            <div className="step">
              <div className="q-title">{t("s2.question")}</div>
              <div className="q-hint">{t("s2.hint")}</div>
              <div className="opts">
                {(t.raw("s2.options") as OptionItem[]).map((opt, i) => (
                  <button
                    key={i}
                    className="opt"
                    onClick={() =>
                      selectOption(
                        { Accident_timeframe: opt.label },
                        3,
                      )
                    }
                  >
                    <div className="opt-check" />
                    <div className="opt-text">
                      <span className="opt-label">{opt.label}</span>
                      {opt.sub && <span className="opt-sub">{opt.sub}</span>}
                    </div>
                    <span className="opt-arrow">›</span>
                  </button>
                ))}
              </div>
              <button className="back-btn" onClick={goBack}>← {t("backBtn")}</button>
            </div>
          )}

          {/* STEP 3 — Medical treatment (also captures Was_injured) */}
          {!done && currentStep === 3 && (
            <div className="step">
              <div className="q-title">{t("s3.question")}</div>
              <div className="q-hint">{t("s3.hint")}</div>
              <div className="opts">
                {(t.raw("s3.options") as OptionItem[]).map((opt, i) => (
                  <button
                    key={i}
                    className="opt"
                    onClick={() =>
                      selectOption(
                        {
                          Medical_treatment: opt.label,
                          Was_injured: opt.dq
                            ? "No, I Wasn't Injured"
                            : "Yes, I Was Injured",
                        },
                        4,
                      )
                    }
                  >
                    <div className="opt-check" />
                    <div className="opt-text">
                      <span className="opt-label">{opt.label}</span>
                      {opt.sub && <span className="opt-sub">{opt.sub}</span>}
                    </div>
                    <span className="opt-arrow">›</span>
                  </button>
                ))}
              </div>
              <button className="back-btn" onClick={goBack}>← {t("backBtn")}</button>
            </div>
          )}

          {/* STEP 4 — Fault */}
          {!done && currentStep === 4 && (
            <div className="step">
              <div className="q-title">{t("s4.question")}</div>
              <div className="q-hint">{t("s4.hint")}</div>
              <div className="opts">
                {(t.raw("s4.options") as OptionItem[]).map((opt, i) => (
                  <button
                    key={i}
                    className="opt"
                    onClick={() =>
                      selectOption(
                        { At_fault: opt.label },
                        5,
                      )
                    }
                  >
                    <div className="opt-check" />
                    <div className="opt-text">
                      <span className="opt-label">{opt.label}</span>
                      {opt.sub && <span className="opt-sub">{opt.sub}</span>}
                    </div>
                    <span className="opt-arrow">›</span>
                  </button>
                ))}
              </div>
              <button className="back-btn" onClick={goBack}>← {t("backBtn")}</button>
            </div>
          )}

          {/* STEP 5 — Attorney */}
          {!done && currentStep === 5 && (
            <div className="step">
              <div className="q-title">{t("s5.question")}</div>
              <div className="q-hint">{t("s5.hint")}</div>
              <div className="opts">
                {(t.raw("s5.options") as OptionItem[]).map((opt, i) => (
                  <button
                    key={i}
                    className="opt"
                    onClick={() =>
                      selectOption(
                        { Has_lawyer: opt.label },
                        6,
                      )
                    }
                  >
                    <div className="opt-check" />
                    <div className="opt-text">
                      <span className="opt-label">{opt.label}</span>
                      {opt.sub && <span className="opt-sub">{opt.sub}</span>}
                    </div>
                    <span className="opt-arrow">›</span>
                  </button>
                ))}
              </div>
              <button className="back-btn" onClick={goBack}>← {t("backBtn")}</button>
            </div>
          )}

          {/* STEP 6 — Contact form */}
          {!done && currentStep === 6 && (
            <div className="step">
              <div className="qualify-box">
                <div className="qualify-icon-wrap">✅</div>
                <div>
                  <div className="qualify-title">{t("qualify.title")}</div>
                  <div className="qualify-sub">{t("qualify.sub")}</div>
                </div>
              </div>

              <form onSubmit={submitForm} noValidate>
                <div className="input-group">
                  <label className="input-label">{t("s6.fullName")}</label>
                  <input
                    className="input-field"
                    type="text"
                    name="fullName"
                    placeholder={t("s6.fullNamePh")}
                    autoComplete="name"
                    style={fieldErrors.fullName ? { borderColor: "var(--danger)" } : undefined}
                    onChange={() => setFieldErrors((p) => ({ ...p, fullName: "" }))}
                  />
                  {fieldErrors.fullName && (
                    <span className="error-msg show">{fieldErrors.fullName}</span>
                  )}
                </div>

                <div className="input-group">
                  <label className="input-label">{t("s6.email")}</label>
                  <input
                    className="input-field"
                    type="email"
                    name="email"
                    placeholder={t("s6.emailPh")}
                    autoComplete="email"
                    style={fieldErrors.email ? { borderColor: "var(--danger)" } : undefined}
                    onChange={() => setFieldErrors((p) => ({ ...p, email: "" }))}
                  />
                  {fieldErrors.email && (
                    <span className="error-msg show">{fieldErrors.email}</span>
                  )}
                </div>

                <div className="input-group">
                  <label className="input-label">{t("s6.phone")}</label>
                  <div
                    className="phone-wrap"
                    style={fieldErrors.phone ? { borderColor: "var(--danger)" } : undefined}
                  >
                    <span className="phone-prefix">🇺🇸 +1</span>
                    <input
                      className="phone-input"
                      type="tel"
                      name="phone"
                      placeholder="(555) 000-0000"
                      autoComplete="tel"
                      maxLength={14}
                      onChange={(e) => {
                        e.target.value = formatPhoneInput(e.target.value);
                        setFieldErrors((p) => ({ ...p, phone: "" }));
                      }}
                    />
                  </div>
                  {fieldErrors.phone && (
                    <span className="error-msg show">{fieldErrors.phone}</span>
                  )}
                </div>

                <div className="input-group">
                  <label className="input-label">{t("s6.state")}</label>
                  <select
                    className="input-field"
                    name="state"
                    defaultValue=""
                    style={
                      fieldErrors.state
                        ? { borderColor: "var(--danger)", cursor: "pointer" }
                        : { cursor: "pointer" }
                    }
                    onChange={() => setFieldErrors((p) => ({ ...p, state: "" }))}
                  >
                    <option value="">{t("s6.statePh")}</option>
                    {stateOptions.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                  {fieldErrors.state && (
                    <span className="error-msg show">{fieldErrors.state}</span>
                  )}
                </div>

                <label className={`tcpa-check${fieldErrors.tcpa ? " tcpa-check--error" : ""}`}>
                  <input
                    type="checkbox"
                    checked={tcpaChecked}
                    onChange={(e) => {
                      setTcpaChecked(e.target.checked);
                      setFieldErrors((p) => ({ ...p, tcpa: "" }));
                    }}
                  />
                  <span className="tcpa">
                    {t("s6.tcpaPre")}{" "}
                    <span onClick={(e) => e.stopPropagation()}><PrivacyModal /></span>
                    {" "}{t("s6.tcpaAnd")}{" "}
                    <span onClick={(e) => e.stopPropagation()}><TermsModal /></span>
                    {" "}{t("s6.tcpaPost")}
                  </span>
                </label>
                {fieldErrors.tcpa && (
                  <span className="error-msg show">{fieldErrors.tcpa}</span>
                )}

                <button type="submit" className="cta-btn" disabled={submitting}>
                  <span className="cta-lock">🔒</span>
                  {submitting ? t("s6.submittingBtn") : t("s6.submitBtn")}
                </button>
              </form>

              <button className="back-btn" onClick={goBack}>← {t("backBtn")}</button>
            </div>
          )}

        </div>{/* /card-body */}

        {/* TRUST STRIP — hidden on thank-you */}
        {!done && (
          <div className="trust-strip">
            <div className="trust-item">{t("trustStrip.t1")}</div>
            <div className="trust-item">{t("trustStrip.t2")}</div>
            <div className="trust-item trust-item--img">
              <img src="/trustedform.jpeg" alt="TrustedForm Certified" className="trust-tf-img" />
            </div>
            <div className="trust-item">{t("trustStrip.t4")}</div>
          </div>
        )}

      </div>{/* /card */}

      {/* FOOTER */}
      <div className="footer-disclaimer">
        <p>{t("footer.disclaimer")}</p>
        <div className="footer-links">
          <PrivacyModal />
          <span className="footer-sep">·</span>
          <TermsModal />
          <span className="footer-sep">·</span>
          <DisclaimerModal />
        </div>
        <div className="footer-copy">{t("footer.copy")}</div>
      </div>

    </div>
  );
}
