import React, { useState, useEffect } from 'react';
import { QRTokenPayload, ValidationStatus } from '../../types';
import Button from '../ui/Button';
import { generateWelcomeMessage } from '../../services/geminiService';
import { useLanguage } from '../../hooks/useLanguage';

interface ValidationAuraProps {
  scanResult: QRTokenPayload;
  isDuplicate: boolean;
  onReset: () => void;
}

const ValidationAura: React.FC<ValidationAuraProps> = ({ scanResult, isDuplicate, onReset }) => {
  const { t } = useLanguage();
  const [welcomeMessage, setWelcomeMessage] = useState(t('scanner.generatingGreeting'));
  const [isLoading, setIsLoading] = useState(true);

  const status: ValidationStatus = isDuplicate ? 'Duplicate' : 'Valid';
  
  const auraConfig = {
    Valid: {
        Guest: { color: 'white', shadow: 'shadow-glow-white' },
        VIP: { color: 'omni-gold', shadow: 'shadow-glow-gold' },
        Speaker: { color: 'omni-blue', shadow: 'shadow-glow-blue' },
        Press: { color: 'purple-400', shadow: 'shadow-[0_0_15px_rgba(168,85,247,0.5)]' },
    },
    Duplicate: { color: 'red-500', shadow: 'shadow-glow-red' },
    Invalid: { color: 'red-500', shadow: 'shadow-glow-red' },
  };

  const currentRoleConfig = (() => {
    if (status === 'Valid') {
      return auraConfig.Valid[scanResult.role];
    }
    return auraConfig[status];
  })();

  const textColorClass = `text-${currentRoleConfig.color}`;
  const borderColorClass = `border-${currentRoleConfig.color}`;


  useEffect(() => {
    if (status === 'Valid') {
      setIsLoading(true);
      generateWelcomeMessage(scanResult.recipient, scanResult.eventName, scanResult.role)
        .then(setWelcomeMessage)
        .catch(() => setWelcomeMessage(`Welcome, ${scanResult.recipient}. Enjoy ${scanResult.eventName}!`))
        .finally(() => setIsLoading(false));
    } else {
        setIsLoading(false);
        setWelcomeMessage(t('scanner.duplicateMessage'));
    }
  }, [scanResult, status, t]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 animate-fade-in">
        <div className={`relative w-80 h-80 flex items-center justify-center rounded-full transition-all duration-500 ${currentRoleConfig.shadow} animate-pulse`}>
            <div className={`absolute inset-0 rounded-full border-2 ${borderColorClass} opacity-50`}></div>
            <div className={`absolute inset-2 rounded-full border ${borderColorClass} opacity-30`}></div>
            <div className="relative z-10 text-center bg-omni-black/50 p-8 rounded-lg">
                <p className={`text-3xl font-bold ${textColorClass} mb-2`}>{t(`statuses.${status.toLowerCase()}`).toUpperCase()}</p>
                <p className="text-xl font-semibold text-white">{scanResult.recipient}</p>
                <p className={`text-lg font-medium ${textColorClass}`}>{t(`roles.${scanResult.role.toLowerCase()}`)}</p>
            </div>
        </div>

        <div className="mt-12 text-center max-w-lg">
             <p className="text-xl text-gray-300 italic min-h-[56px]">
                {isLoading ? (
                    <span className="animate-pulse">{t('scanner.generatingGreeting')}</span>
                ) : (
                    `"${welcomeMessage}"`
                )}
            </p>
        </div>
        
        <div className="mt-12">
            <Button onClick={onReset} variant="primary">{t('scanner.scanNext')}</Button>
        </div>
        <style>{`
            @keyframes fade-in {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
            }
            .animate-fade-in {
                animation: fade-in 0.5s ease-out forwards;
            }
        `}</style>
    </div>
  );
};

export default ValidationAura;
