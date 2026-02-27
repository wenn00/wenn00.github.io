import zh from './zh.json';
import en from './en.json';

const translations: Record<string, Record<string, unknown>> = { zh, en };

export type Lang = 'zh' | 'en';

export function getLang(): Lang {
  if (typeof window !== 'undefined') {
    return (localStorage.getItem('lang') as Lang) || 'zh';
  }
  return 'zh';
}

export function setLang(lang: Lang): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('lang', lang);
    window.location.reload();
  }
}

export function t(key: string, lang?: Lang): string {
  const currentLang = lang ?? getLang();
  const keys = key.split('.');
  let value: unknown = translations[currentLang];
  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }
  return typeof value === 'string' ? value : key;
}

export function tArray(key: string, lang?: Lang): string[] {
  const currentLang = lang ?? getLang();
  const keys = key.split('.');
  let value: unknown = translations[currentLang];
  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = (value as Record<string, unknown>)[k];
    } else {
      return [];
    }
  }
  return Array.isArray(value) ? value as string[] : [];
}

export function tData<T>(key: string, lang?: Lang): T {
  const currentLang = lang ?? getLang();
  const keys = key.split('.');
  let value: unknown = translations[currentLang];
  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = (value as Record<string, unknown>)[k];
    } else {
      return [] as unknown as T;
    }
  }
  return value as T;
}
