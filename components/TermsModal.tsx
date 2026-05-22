'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function TermsModal() {
  const t  = useTranslations('terms');
  const ft = useTranslations('footer');
  const [open, setOpen] = useState(false);

  const s1Defs    = t.raw('s1Defs')    as string[];
  const s2RestList = t.raw('s2RestList') as string[];
  const s6List    = t.raw('s6List')    as string[];

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
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', padding: 0 }}
      >
        {ft('terms')}
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

              {/* Use of Service */}
              <div className="modal-section">
                <div className="modal-section-title">{t('s2Title')}</div>

                <div className="modal-sub-title">{t('s2EligTitle')}</div>
                <p className="modal-text">{t('s2EligBody')}</p>

                <div className="modal-divider" />

                <div className="modal-sub-title">{t('s2PurpTitle')}</div>
                <p className="modal-text">{t('s2PurpBody')}</p>

                <div className="modal-divider" />

                <div className="modal-sub-title">{t('s2AccTitle')}</div>
                <p className="modal-text">{t('s2AccBody')}</p>

                <div className="modal-divider" />

                <div className="modal-sub-title">{t('s2RestTitle')}</div>
                <p className="modal-text">{t('s2RestIntro')}</p>
                <ul className="modal-list">
                  {s2RestList.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>

              {/* Submitting Claims */}
              <div className="modal-section">
                <div className="modal-section-title">{t('s3Title')}</div>

                <div className="modal-sub-title">{t('s3AccTitle')}</div>
                <p className="modal-text">{t('s3AccBody')}</p>

                <div className="modal-divider" />

                <div className="modal-sub-title">{t('s3EligTitle')}</div>
                <p className="modal-text" style={{ marginBottom: 0 }}>{t('s3EligBody')}</p>
              </div>

              {/* Payment */}
              <div className="modal-section">
                <div className="modal-section-title">{t('s4Title')}</div>
                <p className="modal-text" style={{ marginBottom: 0 }}>{t('s4Body')}</p>
              </div>

              {/* IP */}
              <div className="modal-section">
                <div className="modal-section-title">{t('s5Title')}</div>
                <p className="modal-text" style={{ marginBottom: 0 }}>{t('s5Body')}</p>
              </div>

              {/* Liability */}
              <div className="modal-section">
                <div className="modal-section-title">{t('s6Title')}</div>
                <p className="modal-text">{t('s6Intro')}</p>
                <ul className="modal-list">
                  {s6List.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>

              {/* Disclaimer */}
              <div className="modal-section">
                <div className="modal-section-title">{t('s7Title')}</div>
                <p className="modal-text" style={{ marginBottom: 0 }}>{t('s7Body')}</p>
              </div>

              {/* Applicable Law */}
              <div className="modal-section">
                <div className="modal-section-title">{t('s8Title')}</div>
                <p className="modal-text" style={{ marginBottom: 0 }}>{t('s8Body')}</p>
              </div>

              {/* Changes */}
              <div className="modal-section">
                <div className="modal-section-title">{t('s9Title')}</div>
                <p className="modal-text" style={{ marginBottom: 0 }}>{t('s9Body')}</p>
              </div>

              {/* Marketing Partner */}
              <div className="modal-section">
                <div className="modal-section-title">{t('s10Title')}</div>
                {t('s10Body').split('\n').map((line, i) => (
                  <p className="modal-text" style={{ marginBottom: 0 }} key={i}>{line}</p>
                ))}
              </div>

              {/* Contact */}
              <div className="modal-section">
                <div className="modal-section-title">{t('s11Title')}</div>
                <p className="modal-text">{t('s11Body')}</p>
                <div className="modal-contact-email">{t('s11Email')}</div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
