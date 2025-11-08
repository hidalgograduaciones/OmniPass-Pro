
import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useLanguage } from '../../hooks/useLanguage';

const QuickAccess: React.FC = () => {
    const { t } = useLanguage();
    const actions = [
        { labelKey: 'dashboard.generateInvitation', variant: 'primary' as const },
        { labelKey: 'dashboard.connectService', variant: 'secondary' as const },
        { labelKey: 'dashboard.viewLogs', variant: 'ghost' as const },
        { labelKey: 'dashboard.createAutomation', variant: 'ghost' as const },
    ];
  return (
    <Card>
      <h2 className="text-xl font-bold text-white mb-4">{t('dashboard.quickAccess')}</h2>
      <div className="space-y-4">
        {actions.map(action => (
            <Button 
                key={action.labelKey} 
                variant={action.variant} 
                className="w-full"
                onClick={() => alert(`${t(action.labelKey)} clicked!`)}
            >
                {t(action.labelKey)}
            </Button>
        ))}
      </div>
    </Card>
  );
};

export default QuickAccess;
