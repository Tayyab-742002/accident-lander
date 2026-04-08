'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';

const TOTAL_STEPS = 8;

export default function QuizSection() {
  const t = useTranslations('quiz');
  const [currentStep, setCurrentStep] = useState(1);
  const [done, setDone] = useState(false);
  const [storyError, setStoryError] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});

  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLTextAreaElement>(null);

  const progressPct = Math.round((currentStep / TOTAL_STEPS) * 100);

  function scrollToQuiz() {
    cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function goToStep(n: number) {
    setCurrentStep(n);
    setTimeout(scrollToQuiz, 50);
  }

  function selectOption(nextStep: number) {
    setTimeout(() => goToStep(nextStep), 300);
  }

  function validateStory() {
    const val = storyRef.current?.value.trim() ?? '';
    if (!val) {
      setStoryError(true);
      storyRef.current?.focus();
      return;
    }
    setStoryError(false);
    goToStep(8);
  }

  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fields = ['firstName', 'lastName', 'phone', 'email', 'street', 'city', 'state', 'zip'];
    const errors: Record<string, boolean> = {};
    let firstInvalid: HTMLElement | null = null;

    for (const field of fields) {
      const el = form.elements.namedItem(field) as HTMLInputElement | HTMLSelectElement;
      if (!el.value.trim()) {
        errors[field] = true;
        if (!firstInvalid) firstInvalid = el;
      }
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      firstInvalid?.focus();
      return;
    }

    setFieldErrors({});
    setDone(true);
    setTimeout(scrollToQuiz, 50);
  }

  const stepLabel = t('stepLabel', { current: currentStep, total: TOTAL_STEPS });

  return (
    <div className="quiz-bg" ref={wrapRef}>
    <div className="quiz-wrap" ref={cardRef}>
      <div className="step-indicator">
        <div className="step-bar">
          <div
            className="step-bar-fill"
            style={{ width: done ? '100%' : `${progressPct}%` }}
          />
        </div>
        <div className="step-count">
          {done ? t('complete') : stepLabel}
        </div>
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
            <div className="ty-title">{t('thankyou.title')}</div>
            <p className="ty-sub">
              {t('thankyou.sub')}
            </p>
            <div style={{ marginTop: 18, background: '#E8F7EF', borderRadius: 10, padding: 16, textAlign: 'left' }}>
              <p style={{ fontSize: 13, color: '#0F5E35', fontWeight: 700, marginBottom: 5 }}>
                {t('thankyou.nextTitle')}
              </p>
              <p style={{ fontSize: 13, color: '#157040', lineHeight: 1.6 }}>
                {t('thankyou.nextBody')}
              </p>
            </div>
          </div>
        )}

        {/* STEP 1 */}
        {!done && currentStep === 1 && (
          <div className="step">
            <div className="question-label">{t('s1.label')}</div>
            <div className="question-text">{t('s1.question')}</div>
            <div className="question-hint">{t('s1.hint')}</div>
            <div className="options">
              {(t.raw('s1.options') as string[]).map((opt, i) => (
                <button key={i} className="option-btn" onClick={() => selectOption(2)}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {!done && currentStep === 2 && (
          <div className="step">
            <div className="question-label">{t('s2.label')}</div>
            <div className="question-text">{t('s2.question')}</div>
            <div className="options">
              {(t.raw('s2.options') as string[]).map((opt, i) => (
                <button key={i} className="option-btn" onClick={() => selectOption(3)}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {!done && currentStep === 3 && (
          <div className="step">
            <div className="question-label">{t('s3.label')}</div>
            <div className="question-text">{t('s3.question')}</div>
            <div className="options">
              {(t.raw('s3.options') as string[]).map((opt, i) => (
                <button key={i} className="option-btn" onClick={() => selectOption(4)}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {!done && currentStep === 4 && (
          <div className="step">
            <div className="question-label">{t('s4.label')}</div>
            <div className="question-text">{t('s4.question')}</div>
            <div className="options">
              {(t.raw('s4.options') as string[]).map((opt, i) => (
                <button key={i} className="option-btn" onClick={() => selectOption(5)}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 5 */}
        {!done && currentStep === 5 && (
          <div className="step">
            <div className="question-label">{t('s5.label')}</div>
            <div className="question-text">{t('s5.question')}</div>
            <div className="question-hint">{t('s5.hint')}</div>
            <div className="options">
              {(t.raw('s5.options') as string[]).map((opt, i) => (
                <button key={i} className="option-btn" onClick={() => selectOption(6)}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 6 */}
        {!done && currentStep === 6 && (
          <div className="step">
            <div className="question-label">{t('s6.label')}</div>
            <div className="question-text">{t('s6.question')}</div>
            <div className="options">
              {(t.raw('s6.options') as string[]).map((opt, i) => (
                <button key={i} className="option-btn" onClick={() => selectOption(7)}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 7 — Story */}
        {!done && currentStep === 7 && (
          <div className="step">
            <div className="question-label">{t('s7.label')}</div>
            <div className="question-text">
              {t('s7.question')} <span style={{ color: 'var(--red)' }}>*</span>
            </div>
            <div className="question-hint">
              {t('s7.hint')} <em>{t('s7.hintExample')}</em>
            </div>
            <textarea
              ref={storyRef}
              className="story-input"
              placeholder={t('s7.placeholder')}
              style={storyError ? { borderColor: '#D63030' } : undefined}
              onChange={() => storyError && setStoryError(false)}
            />
            {storyError && (
              <div style={{
                color: 'var(--red)',
                fontSize: 12,
                fontWeight: 700,
                marginTop: 6,
                padding: '8px 12px',
                background: '#FDEAEA',
                borderRadius: 8,
                borderLeft: '3px solid var(--red)',
              }}>
                {t('s7.errorMsg')}
              </div>
            )}
            <button className="next-btn" onClick={validateStory}>
              {t('s7.continueBtn')}
            </button>
          </div>
        )}

        {/* STEP 8 — Contact form */}
        {!done && currentStep === 8 && (
          <div className="step">
            <div className="question-label">{t('s8.label')}</div>
            <div className="question-text">{t('s8.question')}</div>
            <div style={{ background: '#E8F7EF', borderRadius: 10, padding: '12px 14px', marginBottom: 16 }}>
              <p style={{ fontSize: 13, color: '#0F5E35', lineHeight: 1.55, fontWeight: 600 }}>
                {t('s8.qualifyBox')}
              </p>
            </div>

            <form onSubmit={submitForm} noValidate>
              <div className="form-group">
                <label className="form-label">{t('s8.firstName')}</label>
                <input
                  className="form-input"
                  type="text"
                  name="firstName"
                  placeholder={t('s8.firstNamePh')}
                  style={fieldErrors.firstName ? { borderColor: '#D63030' } : undefined}
                  onChange={() => setFieldErrors(p => ({ ...p, firstName: false }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label">{t('s8.lastName')}</label>
                <input
                  className="form-input"
                  type="text"
                  name="lastName"
                  placeholder={t('s8.lastNamePh')}
                  style={fieldErrors.lastName ? { borderColor: '#D63030' } : undefined}
                  onChange={() => setFieldErrors(p => ({ ...p, lastName: false }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label">{t('s8.phone')}</label>
                <input
                  className="form-input"
                  type="tel"
                  name="phone"
                  placeholder={t('s8.phonePh')}
                  style={fieldErrors.phone ? { borderColor: '#D63030' } : undefined}
                  onChange={() => setFieldErrors(p => ({ ...p, phone: false }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label">{t('s8.email')}</label>
                <input
                  className="form-input"
                  type="email"
                  name="email"
                  placeholder={t('s8.emailPh')}
                  style={fieldErrors.email ? { borderColor: '#D63030' } : undefined}
                  onChange={() => setFieldErrors(p => ({ ...p, email: false }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label">{t('s8.street')}</label>
                <input
                  className="form-input"
                  type="text"
                  name="street"
                  placeholder={t('s8.streetPh')}
                  style={fieldErrors.street ? { borderColor: '#D63030' } : undefined}
                  onChange={() => setFieldErrors(p => ({ ...p, street: false }))}
                />
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">{t('s8.city')}</label>
                  <input
                    className="form-input"
                    type="text"
                    name="city"
                    placeholder={t('s8.cityPh')}
                    style={fieldErrors.city ? { borderColor: '#D63030' } : undefined}
                    onChange={() => setFieldErrors(p => ({ ...p, city: false }))}
                  />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">{t('s8.state')}</label>
                  <select
                    className="form-input"
                    name="state"
                    style={{ cursor: 'pointer', ...(fieldErrors.state ? { borderColor: '#D63030' } : {}) }}
                    onChange={() => setFieldErrors(p => ({ ...p, state: false }))}
                    defaultValue=""
                  >
                    <option value="">{t('s8.statePh')}</option>
                    <option>Alabama</option>
                    <option>Arizona</option>
                    <option>California</option>
                    <option>Colorado</option>
                    <option>Florida</option>
                    <option>Georgia</option>
                    <option>Illinois</option>
                    <option>Nevada</option>
                    <option>North Carolina</option>
                    <option>Oklahoma</option>
                    <option>Oregon</option>
                    <option>Tennessee</option>
                    <option>Texas</option>
                    <option>Utah</option>
                    <option>Washington</option>
                    <option>New York</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">{t('s8.zip')}</label>
                <input
                  className="form-input"
                  type="text"
                  name="zip"
                  placeholder={t('s8.zipPh')}
                  maxLength={10}
                  style={fieldErrors.zip ? { borderColor: '#D63030' } : undefined}
                  onChange={() => setFieldErrors(p => ({ ...p, zip: false }))}
                />
              </div>

              <button type="submit" className="submit-btn">
                {t('s8.submitBtn')}
                <span className="sub">{t('s8.submitSub')}</span>
              </button>
            </form>

            <div className="trust-row">
              <div className="trust-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="#1B8A4C" strokeWidth="2">
                  <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" />
                </svg>
                {t('s8.trust1')}
              </div>
              <div className="trust-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="#1B8A4C" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12,6 12,12 16,14" />
                </svg>
                {t('s8.trust2')}
              </div>
              <div className="trust-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="#1B8A4C" strokeWidth="2">
                  <polyline points="20,6 9,17 4,12" />
                </svg>
                {t('s8.trust3')}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
    </div>
  );
}
