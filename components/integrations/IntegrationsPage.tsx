
import React from 'react';
import { MOCK_INTEGRATIONS } from '../../constants';
import IntegrationCard from './IntegrationCard';
import { useLanguage } from '../../hooks/useLanguage';

const IntegrationsPage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div>
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-white">{t('integrations.title')}</h2>
            <p className="text-gray-400 mt-1">{t('integrations.description')}</p>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MOCK_INTEGRATIONS.map((integration) => (
          <IntegrationCard key={integration.name} integration={integration} />
        ))}
      </div>
    </div>
  );
};

export default IntegrationsPage;
