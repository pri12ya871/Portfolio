import { useEffect } from 'react';

const DEFAULT = {
  title: 'Priya Sharma — Software Engineer & Frontend Developer',
  description:
    'Portfolio of Priya Sharma — B.Tech CSE graduate specializing in React, Node.js, full-stack development, AI integration, and open-source contributions.',
  keywords:
    'Priya Sharma, Software Engineer, Frontend Developer, Full Stack Developer, React, Node.js, Portfolio, SDE, KubeStellar',
  url: 'https://priyasharma.dev',
  image: '/og-image.png',
};

/**
 * Lightweight SEO head manager — no extra library needed.
 * Mutates <head> meta tags directly; call once per page if needed.
 */
export default function SEO({ title, description, keywords, url, image } = {}) {
  useEffect(() => {
    const t  = title       || DEFAULT.title;
    const d  = description || DEFAULT.description;
    const k  = keywords    || DEFAULT.keywords;
    const u  = url         || DEFAULT.url;
    const og = image       || DEFAULT.image;

    document.title = t;

    const set = (sel, attr, val) => {
      let el = document.querySelector(sel);
      if (!el) { el = document.createElement('meta'); document.head.appendChild(el); }
      el.setAttribute(attr, val);
    };

    set('meta[name="description"]',         'name',    'description');
    set('meta[name="description"]',         'content', d);
    set('meta[name="keywords"]',            'name',    'keywords');
    set('meta[name="keywords"]',            'content', k);
    set('meta[property="og:title"]',        'property','og:title');
    set('meta[property="og:title"]',        'content', t);
    set('meta[property="og:description"]',  'property','og:description');
    set('meta[property="og:description"]',  'content', d);
    set('meta[property="og:url"]',          'property','og:url');
    set('meta[property="og:url"]',          'content', u);
    set('meta[property="og:image"]',        'property','og:image');
    set('meta[property="og:image"]',        'content', og);
    set('meta[property="og:type"]',         'property','og:type');
    set('meta[property="og:type"]',         'content', 'website');
    set('meta[name="twitter:card"]',        'name',    'twitter:card');
    set('meta[name="twitter:card"]',        'content', 'summary_large_image');
    set('meta[name="twitter:title"]',       'name',    'twitter:title');
    set('meta[name="twitter:title"]',       'content', t);
    set('meta[name="twitter:description"]', 'name',    'twitter:description');
    set('meta[name="twitter:description"]', 'content', d);
    set('meta[name="twitter:image"]',       'name',    'twitter:image');
    set('meta[name="twitter:image"]',       'content', og);
  }, [title, description, keywords, url, image]);

  return null;
}
