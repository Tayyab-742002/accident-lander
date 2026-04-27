"use client";

import { useState, useRef, useEffect } from "react";
import { generateEventId, sendCAPIEvent } from "@/lib/capi";
import { useTranslations } from "next-intl";
import PrivacyModal from "./PrivacyModal";
import TermsModal from "./TermsModal";
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

const TOTAL_STEPS = 8;

export default function QuizSection({ locale }: { locale: string }) {
  const t = useTranslations("quiz");
  const { stateOptions } = getVariantConfig(locale);
  const [currentStep, setCurrentStep] = useState(1);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [storyError, setStoryError] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});

  /* ── quiz answer tracking ─────────────────────────────────── */
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});

  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLTextAreaElement>(null);

  const progressPct = Math.round((currentStep / TOTAL_STEPS) * 100);

  /* Pre-fetch visitor IP as early as possible */
  useEffect(() => {
    getVisitorIp();
  }, []);

  function scrollToQuiz() {
    cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function goToStep(n: number) {
    setCurrentStep(n);
    setTimeout(scrollToQuiz, 50);
  }

  /**
   * Store the selected option text and advance to the next step.
   * `answerKey` maps 1:1 to the LeadProsper API field name.
   */
  function selectOption(
    answerKey: keyof QuizAnswers,
    value: string,
    nextStep: number,
  ) {
    setAnswers((prev) => ({ ...prev, [answerKey]: value }));
    // Fire once on first quiz interaction (step 1 → step 2)
    if (nextStep === 2) {
      const eventId = generateEventId();
      trackEvent("SubmitApplication", {}, eventId);
      getVisitorIp().then((ip) => {
        sendCAPIEvent("SubmitApplication", eventId, { ip });
      });
    }
    setTimeout(() => goToStep(nextStep), 300);
  }

  function validateStory() {
    const val = storyRef.current?.value.trim() ?? "";
    if (!val) {
      setStoryError(true);
      storyRef.current?.focus();
      return;
    }
    setStoryError(false);
    setAnswers((prev) => ({ ...prev, Accident_Details: val }));
    goToStep(8);
  }

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fields = ["fullName", "phone", "email", "city", "state", "zip"];
    const errors: Record<string, boolean> = {};
    let firstInvalid: HTMLElement | null = null;

    for (const field of fields) {
      const el = form.elements.namedItem(field) as
        | HTMLInputElement
        | HTMLSelectElement;
      const val = el.value.trim();
      if (!val) {
        errors[field] = true;
        if (!firstInvalid) firstInvalid = el;
        continue;
      }
      if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        errors[field] = true;
        if (!firstInvalid) firstInvalid = el;
      }
      if (field === "phone") {
        const digits = val.replace(/\D/g, "");
        if (digits.length < 10) {
          errors[field] = true;
          if (!firstInvalid) firstInvalid = el;
        }
      }
      if (field === "zip" && !/^\d{5}(-\d{4})?$/.test(val)) {
        errors[field] = true;
        if (!firstInvalid) firstInvalid = el;
      }
    }

    const consentEl = form.elements.namedItem(
      "consent",
    ) as HTMLInputElement | null;
    const consentChecked = consentEl?.checked ?? false;

    if (!consentChecked) {
      errors["consent"] = true;
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      firstInvalid?.focus();
      return;
    }

    setFieldErrors({});
    setSubmitting(true);

    /* ── Assemble the full lead payload ─────────────────────── */
    const fd = (name: string) =>
      (
        form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement
      ).value.trim();

    const ip = await getVisitorIp();
    const tf = getTrustedFormValues();
    const { fbp, fbc } = getMetaCookieValues();

    const payload: LeadPayload = {
      /* quiz answers */
      Was_in_accident: answers.Was_in_accident ?? "",
      Accident_timeframe: answers.Accident_timeframe ?? "",
      At_fault: answers.At_fault ?? "",
      Was_injured: answers.Was_injured ?? "",
      Medical_treatment: answers.Medical_treatment ?? "",
      Has_lawyer: answers.Has_lawyer ?? "",
      Accident_Details: answers.Accident_Details ?? "",

      /* contact form */
      Full_Name: fd("fullName"),
      Phone: fd("phone"),
      Email: fd("email"),
      street: "",
      city: fd("city"),
      State: fd("state"),
      zip_code: fd("zip"),

      /* auto-collected */
      Page_URL: window.location.href,
      IP_Address: ip,
      Inquiry_date: formatInquiryDate(),
      TCPA_Consent: consentChecked ? "Accepted" : "Declined",
      fbp,
      fbc,
      user_agent: navigator.userAgent,

      /* TrustedForm */
      xxTrustedFormCertUrl: tf.xxTrustedFormCertUrl,
      xxTrustedFormPingUrl: tf.xxTrustedFormPingUrl,
      xxTrustedFormToken: tf.xxTrustedFormToken,
    };

    try {
      await postLead(payload);
    } catch {
      // Silently continue — we always show the thank-you screen.
      // If the CRM rejects, the team can debug in LeadProsper.
    }

    const [firstName, ...rest] = fd("fullName").trim().split(" ");
    const lastName = rest.join(" ");
    const eventId = generateEventId();
    trackEvent("CompleteRegistration", {}, eventId);
    await sendCAPIEvent("CompleteRegistration", eventId, {
      email: fd("email"),
      phone: fd("phone"),
      firstName,
      lastName,
      state: fd("state"),
      zipcode: fd("zip"),
      city: fd("city"),
      ip,
    });
    setSubmitting(false);
    setDone(true);
    setTimeout(scrollToQuiz, 50);
  }

  const stepLabel = t("stepLabel", {
    current: currentStep,
    total: TOTAL_STEPS,
  });

  return (
    <div className="quiz-bg" ref={wrapRef}>
      <div className="quiz-wrap" ref={cardRef}>
        <div className="step-indicator">
          <div className="step-bar">
            <div
              className="step-bar-fill"
              style={{ width: done ? "100%" : `${progressPct}%` }}
            />
          </div>
          <div className="step-count">{done ? t("complete") : stepLabel}</div>
        </div>

        <div id="quiz">
          {/* THANK YOU */}
          {done && (
            <div className="thankyou">
              <div className="ty-icon">
                <svg viewBox="0 0 24 24">
                  <polyline points="20,6 9,17 4,12" />
                </svg>
              </div>
              <div className="ty-title">{t("thankyou.title")}</div>
              <p className="ty-sub">{t("thankyou.sub")}</p>
              <div
                style={{
                  marginTop: 18,
                  background: "#E8F7EF",
                  borderRadius: 10,
                  padding: 16,
                  textAlign: "left",
                }}
              >
                <p
                  style={{
                    fontSize: 13,
                    color: "#0F5E35",
                    fontWeight: 700,
                    marginBottom: 5,
                  }}
                >
                  {t("thankyou.nextTitle")}
                </p>
                <p style={{ fontSize: 13, color: "#157040", lineHeight: 1.6 }}>
                  {t("thankyou.nextBody")}
                </p>
              </div>
            </div>
          )}

          {/* STEP 1 — Accident type */}
          {!done && currentStep === 1 && (
            <div className="step">
              <div className="question-label">{t("s1.label")}</div>
              <div className="question-text">{t("s1.question")}</div>
              <div className="question-hint">{t("s1.hint")}</div>
              <div className="options">
                {(t.raw("s1.options") as string[]).map((opt, i) => (
                  <button
                    key={i}
                    className="option-btn"
                    onClick={() => selectOption("Was_in_accident", opt, 2)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2 — Timeframe */}
          {!done && currentStep === 2 && (
            <div className="step">
              <div className="question-label">{t("s2.label")}</div>
              <div className="question-text">{t("s2.question")}</div>
              <div className="options">
                {(t.raw("s2.options") as string[]).map((opt, i) => (
                  <button
                    key={i}
                    className="option-btn"
                    onClick={() => selectOption("Accident_timeframe", opt, 3)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3 — Fault */}
          {!done && currentStep === 3 && (
            <div className="step">
              <div className="question-label">{t("s3.label")}</div>
              <div className="question-text">{t("s3.question")}</div>
              <div className="options">
                {(t.raw("s3.options") as string[]).map((opt, i) => (
                  <button
                    key={i}
                    className="option-btn"
                    onClick={() => selectOption("At_fault", opt, 4)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4 — Injured */}
          {!done && currentStep === 4 && (
            <div className="step">
              <div className="question-label">{t("s4.label")}</div>
              <div className="question-text">{t("s4.question")}</div>
              <div className="options">
                {(t.raw("s4.options") as string[]).map((opt, i) => (
                  <button
                    key={i}
                    className="option-btn"
                    onClick={() => selectOption("Was_injured", opt, 5)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5 — Medical treatment */}
          {!done && currentStep === 5 && (
            <div className="step">
              <div className="question-label">{t("s5.label")}</div>
              <div className="question-text">{t("s5.question")}</div>
              <div className="question-hint">{t("s5.hint")}</div>
              <div className="options">
                {(t.raw("s5.options") as string[]).map((opt, i) => (
                  <button
                    key={i}
                    className="option-btn"
                    onClick={() => selectOption("Medical_treatment", opt, 6)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 6 — Has lawyer */}
          {!done && currentStep === 6 && (
            <div className="step">
              <div className="question-label">{t("s6.label")}</div>
              <div className="question-text">{t("s6.question")}</div>
              <div className="options">
                {(t.raw("s6.options") as string[]).map((opt, i) => (
                  <button
                    key={i}
                    className="option-btn"
                    onClick={() => selectOption("Has_lawyer", opt, 7)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 7 — Story */}
          {!done && currentStep === 7 && (
            <div className="step">
              <div className="question-label">{t("s7.label")}</div>
              <div className="question-text">
                {t("s7.question")}{" "}
                <span style={{ color: "var(--red)" }}>*</span>
              </div>
              <div className="question-hint">
                {t("s7.hint")} <em>{t("s7.hintExample")}</em>
              </div>
              <textarea
                ref={storyRef}
                className="story-input"
                placeholder={t("s7.placeholder")}
                style={storyError ? { borderColor: "#D63030" } : undefined}
                onChange={() => storyError && setStoryError(false)}
              />
              {storyError && (
                <div
                  style={{
                    color: "var(--red)",
                    fontSize: 12,
                    fontWeight: 700,
                    marginTop: 6,
                    padding: "8px 12px",
                    background: "#FDEAEA",
                    borderRadius: 8,
                    borderLeft: "3px solid var(--red)",
                  }}
                >
                  {t("s7.errorMsg")}
                </div>
              )}
              <button className="next-btn" onClick={validateStory}>
                {t("s7.continueBtn")}
              </button>
            </div>
          )}

          {/* STEP 8 — Contact form */}
          {!done && currentStep === 8 && (
            <div className="step">
              <div className="question-label">{t("s8.label")}</div>
              {/* <div className="question-text">{t("s8.question")}</div> */}
              {/* <div
                style={{
                  background: "#E8F7EF",
                  borderRadius: 10,
                  padding: "12px 14px",
                  marginBottom: 16,
                }}
              >
                <p
                  style={{
                    fontSize: 13,
                    color: "#0F5E35",
                    lineHeight: 1.55,
                    fontWeight: 600,
                  }}
                >
                  {t("s8.qualifyBox")}
                </p>
              </div> */}

              <form onSubmit={submitForm} noValidate>
                <div className="form-group">
                  <label className="form-label">{t("s8.fullName")}</label>
                  <input
                    className="form-input"
                    type="text"
                    name="fullName"
                    placeholder={t("s8.fullNamePh")}
                    style={
                      fieldErrors.fullName
                        ? { borderColor: "#D63030" }
                        : undefined
                    }
                    onChange={() =>
                      setFieldErrors((p) => ({ ...p, fullName: false }))
                    }
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{t("s8.phone")}</label>
                  <input
                    className="form-input"
                    type="tel"
                    name="phone"
                    placeholder={t("s8.phonePh")}
                    style={
                      fieldErrors.phone ? { borderColor: "#D63030" } : undefined
                    }
                    onChange={() =>
                      setFieldErrors((p) => ({ ...p, phone: false }))
                    }
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{t("s8.email")}</label>
                  <input
                    className="form-input"
                    type="email"
                    name="email"
                    placeholder={t("s8.emailPh")}
                    style={
                      fieldErrors.email ? { borderColor: "#D63030" } : undefined
                    }
                    onChange={() =>
                      setFieldErrors((p) => ({ ...p, email: false }))
                    }
                  />
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">{t("s8.city")}</label>
                    <input
                      className="form-input"
                      type="text"
                      name="city"
                      placeholder={t("s8.cityPh")}
                      style={
                        fieldErrors.city
                          ? { borderColor: "#D63030" }
                          : undefined
                      }
                      onChange={() =>
                        setFieldErrors((p) => ({ ...p, city: false }))
                      }
                    />
                  </div>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">{t("s8.state")}</label>
                    <select
                      className="form-input"
                      name="state"
                      style={{
                        cursor: "pointer",
                        ...(fieldErrors.state
                          ? { borderColor: "#D63030" }
                          : {}),
                      }}
                      onChange={() =>
                        setFieldErrors((p) => ({ ...p, state: false }))
                      }
                      defaultValue=""
                    >
                      <option value="">{t("s8.statePh")}</option>
                      {stateOptions.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">{t("s8.zip")}</label>
                  <input
                    className="form-input"
                    type="text"
                    name="zip"
                    placeholder={t("s8.zipPh")}
                    maxLength={10}
                    style={
                      fieldErrors.zip ? { borderColor: "#D63030" } : undefined
                    }
                    onChange={() =>
                      setFieldErrors((p) => ({ ...p, zip: false }))
                    }
                  />
                </div>

                <div
                  className={`consent-wrap ${fieldErrors.consent ? "error" : ""}`}
                >
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    // defaultChecked
                    className="consent-checkbox"
                    onChange={() =>
                      setFieldErrors((p) => ({ ...p, consent: false }))
                    }
                  />
                  <div className="consent-text">
                    <label htmlFor="consent">{t("s8.consentPre")}</label>
                    <PrivacyModal />
                    {t("s8.consentAnd")}
                    <TermsModal />
                    {t("s8.consentPost")}
                  </div>
                </div>
                {fieldErrors.consent && (
                  <div
                    className="error-msg"
                    style={{ marginTop: -4, marginBottom: 12 }}
                  >
                    {t("s8.consentError")}
                  </div>
                )}

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={submitting}
                >
                  {submitting ? t("s8.submittingBtn") : t("s8.submitBtn")}
                  {/* {!submitting && (
                    <span className="sub">{t("s8.submitSub")}</span>
                  )} */}
                </button>
              </form>

              <div className="trust-row">
                <div className="trust-item">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1B8A4C"
                    strokeWidth="2"
                  >
                    <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" />
                  </svg>
                  {t("s8.trust1")}
                </div>
                <div className="trust-item">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1B8A4C"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12,6 12,12 16,14" />
                  </svg>
                  {t("s8.trust2")}
                </div>
                <div className="trust-item">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1B8A4C"
                    strokeWidth="2"
                  >
                    <polyline points="20,6 9,17 4,12" />
                  </svg>
                  {t("s8.trust3")}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
