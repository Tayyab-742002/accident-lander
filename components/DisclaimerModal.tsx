'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';

export default function DisclaimerModal() {
  const t  = useTranslations('disclaimer');
  const ft = useTranslations('footer');
  const [open, setOpen] = useState(false);

  const sections = t.raw('sections') as Array<{ title: string; body: string }>;

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
        {ft('disclaimerLink')}
      </button>

      {open && createPortal(
        <div
          className="modal-overlay"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div className="modal-panel">

            {/* Header */}
            <div className="modal-header">
              <div className="modal-header-text">
                <div className="modal-title">{t('title')}</div>
              </div>
              <button className="modal-close" onClick={() => setOpen(false)} aria-label={t('close')}>
                ✕
              </button>
            </div>

            {/* Scrollable body */}
            <div className="modal-body-wrap">
              {sections.map((section, i) => (
                <div className="modal-section" key={i}>
                  <div className="modal-section-title">{section.title}</div>
                  <p className="modal-text" style={{ marginBottom: 0 }}>{section.body}</p>
                </div>
              ))}
            </div>

          </div>
        </div>,
        document.body
      )}
    </>
  );
}
