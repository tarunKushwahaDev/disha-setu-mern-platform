'use client';

import { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useAppStore } from '@/lib/store/app-store';
import { languages, type Language } from '@/lib/i18n/translations';
import { cn } from '@/lib/utils';

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const language = useAppStore((state) => state.language);
  const setLanguage = useAppStore((state) => state.setLanguage);

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-lg',
          'bg-card border border-border',
          'hover:bg-accent/50 transition-colors',
          'text-sm font-medium'
        )}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4 text-primary" />
        <span className="hidden sm:inline">{currentLang.nativeName}</span>
        <span className="sm:hidden">{currentLang.code.toUpperCase()}</span>
        <ChevronDown className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 mt-2 w-48 py-2 bg-card border border-border rounded-lg shadow-lg z-50">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={cn(
                  'w-full px-4 py-2 text-left hover:bg-accent/50 transition-colors',
                  'flex items-center justify-between',
                  language === lang.code && 'bg-primary/10 text-primary'
                )}
              >
                <span className="font-medium">{lang.nativeName}</span>
                <span className="text-muted-foreground text-sm">{lang.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
