
import React, { useState } from 'react';
import { Integration } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useLanguage } from '../../hooks/useLanguage';

interface IntegrationCardProps {
  integration: Integration;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({ integration }) => {
  const { t } = useLanguage();
  const [isConnected, setIsConnected] = useState(integration.isConnected);

  const handleToggleConnection = () => {
    setIsConnected(!isConnected);
  };

  return (
    <Card className="flex flex-col justify-between transition-all duration-300 hover:border-omni-blue hover:shadow-glow-blue hover:-translate-y-1">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-white">{integration.name}</h3>
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400' : 'bg-gray-500'}`}></div>
        </div>
        <p className="text-sm text-gray-400 mb-4 h-12">{integration.description}</p>
      </div>
      <Button 
        variant={isConnected ? 'ghost' : 'primary'} 
        onClick={handleToggleConnection}
        className="w-full mt-auto"
      >
        {isConnected ? t('integrations.manage') : t('integrations.connect')}
      </Button>
    </Card>
  );
};

export default IntegrationCard;
