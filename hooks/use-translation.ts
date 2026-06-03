'use client';

import { useCallback } from 'react';
import { useAppStore } from '@/lib/store/app-store';
import { translations } from '@/lib/i18n/translations';

export function useTranslation() {
  const language = useAppStore((state) => state.language);
  const setLanguage = useAppStore((state) => state.setLanguage);

  const t = useCallback(
    (key: string): string => {
      const translation = translations[language]?.[key];
      if (translation) return translation;
      
      // Fallback to English
      const fallback = translations.en?.[key];
      if (fallback) return fallback;
      
      // Return key if no translation found
      return key;
    },
    [language]
  );

  return { t, language, setLanguage };
}
