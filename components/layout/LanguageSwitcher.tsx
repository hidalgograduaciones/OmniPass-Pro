import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const buttonClasses = "px-3 py-1 text-sm font-bold rounded-md transition-all duration-200";
  const activeClasses = "text-omni-blue shadow-glow-blue bg-omni-blue/10";
  const inactiveClasses = "text-gray-400 hover:bg-omni-gray";

  return (
    <div className="flex items-center space-x-1 bg-omni-gray-dark p-1 rounded-lg border border-omni-gray">
      <button 
        onClick={() => setLanguage('es')}
        className={`${buttonClasses} ${language === 'es' ? activeClasses : inactiveClasses}`}
        aria-pressed={language === 'es'}
      >
        ES
      </button>
      <button 
        onClick={() => setLanguage('en')}
        className={`${buttonClasses} ${language === 'en' ? activeClasses : inactiveClasses}`}
        aria-pressed={language === 'en'}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
