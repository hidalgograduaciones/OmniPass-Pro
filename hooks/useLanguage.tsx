import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';

type Translations = { [key: string]: any };

interface LanguageContextType {
  language: 'en' | 'es';
  setLanguage: (language: 'en' | 'es') => void;
  t: (key: string, params?: { [key: string]: string | number }) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<'en' | 'es'>('es');
  const [translations, setTranslations] = useState<{ [key: string]: Translations } | null>(null);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const [enRes, esRes] = await Promise.all([
          fetch('./i18n/en.json'),
          fetch('./i18n/es.json')
        ]);
        if (!enRes.ok || !esRes.ok) {
          throw new Error('Failed to fetch translation files');
        }
        const en = await enRes.json();
        const es = await esRes.json();
        setTranslations({ en, es });
      } catch (error) {
        console.error("Could not load translations:", error);
      }
    };
    loadTranslations();
  }, []);

  useEffect(() => {
    // This effect runs after translations are loaded
    if (!translations) return;

    const savedLang = localStorage.getItem('omni-lang') as 'en' | 'es' | null;
    if (savedLang) {
      setLanguageState(savedLang);
    } else {
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'en') {
        setLanguageState('en');
      } else {
        setLanguageState('es'); // Default to Spanish for 'es' and others
      }
    }
  }, [translations]);

  const setLanguage = (lang: 'en' | 'es') => {
    localStorage.setItem('omni-lang', lang);
    setLanguageState(lang);
  };

  const t = useCallback((key: string, params?: { [key: string]: string | number }) => {
    if (!translations) return key;

    const langTranslations = translations[language];
    if (!langTranslations) return key;

    const keys = key.split('.');
    let result: any = langTranslations;
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        return key; // Return key if not found
      }
    }
    
    let strResult = String(result);

    if (params) {
      Object.keys(params).forEach(pKey => {
        strResult = strResult.replace(`{{${pKey}}}`, String(params[pKey]));
      });
    }

    return strResult;
  }, [language, translations]);
  
  // Render nothing until translations are loaded to prevent Flash of Untranslated Content.
  if (!translations) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
