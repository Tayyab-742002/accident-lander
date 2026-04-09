'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function PrivacyModal() {
  const t  = useTranslations('privacyPolicy');
  const ft = useTranslations('footer');
  const [open, setOpen] = useState(false);

  const s1Defs        = t.raw('s1Defs')        as string[];
  const s2PersonalList = t.raw('s2PersonalList') as string[];
  const s2UseList     = t.raw('s2UseList')     as string[];

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', font: 'inherit', padding: 0 }}
      >
        {ft('privacy')}
      </button>

      {open && (
        <div
          className="modal-overlay"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div className="modal-panel">

            {/* Header */}
            <div className="modal-header">
              <div className="modal-header-text">
                <div className="modal-title">{t('title')}</div>
                <div className="modal-date">{t('lastUpdated')}</div>
              </div>
              <button className="modal-close" onClick={() => setOpen(false)} aria-label={t('close')}>
                ✕
              </button>
            </div>

            {/* Scrollable body */}
            <div className="modal-body-wrap">

              {t('intro').split('\n\n').map((p, i) => (
                <p className="modal-intro" key={i}>{p}</p>
              ))}

              {/* Interpretation & Definitions */}
              <div className="modal-section">
                <div className="modal-section-title">{t('s1Title')}</div>

                <div className="modal-sub-title">{t('s1InterpTitle')}</div>
                <p className="modal-text">{t('s1InterpBody')}</p>

                <div className="modal-divider" />

                <div className="modal-sub-title">{t('s1DefsTitle')}</div>
                <p className="modal-text">{t('s1DefsIntro')}</p>
                <ul className="modal-list">
                  {s1Defs.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>

              {/* Collection & Use */}
              <div className="modal-section">
                <div className="modal-section-title">{t('s2Title')}</div>

                <div className="modal-sub-title">{t('s2PersonalTitle')}</div>
                <p className="modal-text">{t('s2PersonalBody')}</p>
                <ul className="modal-list">
                  {s2PersonalList.map((item, i) => <li key={i}>{item}</li>)}
                </ul>

                <div className="modal-divider" />

                <div className="modal-sub-title">{t('s2UsageTitle')}</div>
                <p className="modal-text">{t('s2UsageBody')}</p>

                <div className="modal-divider" />

                <div className="modal-sub-title">{t('s2CookiesTitle')}</div>
                <p className="modal-text">{t('s2CookiesBody')}</p>

                <div className="modal-divider" />

                <div className="modal-sub-title">{t('s2UseTitle')}</div>
                <p className="modal-text">{t('s2UseIntro')}</p>
                <ul className="modal-list">
                  {s2UseList.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>

              {/* Retention */}
              <div className="modal-section">
                <div className="modal-section-title">{t('s3Title')}</div>
                <p className="modal-text" style={{ marginBottom: 0 }}>{t('s3Body')}</p>
              </div>

              {/* Security */}
              <div className="modal-section">
                <div className="modal-section-title">{t('s4Title')}</div>
                <p className="modal-text" style={{ marginBottom: 0 }}>{t('s4Body')}</p>
              </div>

              {/* Children */}
              <div className="modal-section">
                <div className="modal-section-title">{t('s5Title')}</div>
                <p className="modal-text" style={{ marginBottom: 0 }}>{t('s5Body')}</p>
              </div>

              {/* Changes */}
              <div className="modal-section">
                <div className="modal-section-title">{t('s6Title')}</div>
                <p className="modal-text" style={{ marginBottom: 0 }}>{t('s6Body')}</p>
              </div>

              {/* Contact */}
              <div className="modal-section">
                <div className="modal-section-title">{t('s7Title')}</div>
                <p className="modal-text">{t('s7Body')}</p>
                <div className="modal-contact-email">{t('s7Email')}</div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
