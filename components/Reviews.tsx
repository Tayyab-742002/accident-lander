'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function Reviews() {
  const t = useTranslations('reviews');
  const items = t.raw('items') as Array<{ text: string; reviewer: string }>;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 4000);
    return () => clearInterval(id);
  }, [items.length]);

  return (
    <div className="social-proof">
      <div className="sp-label">{t('label')}</div>
      <div className="carousel-wrap">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {items.map((item, i) => (
            <div className="review-card" key={i}>
              <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              <div className="review-text">{item.text}</div>
              <div className="reviewer">{item.reviewer}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="carousel-dots">
        {items.map((_, i) => (
          <div
            key={i}
            className={`dot${i === index ? ' active' : ''}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
