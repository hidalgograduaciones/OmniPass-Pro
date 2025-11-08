
import React from 'react';
import { Stat } from '../../types';
import Card from '../ui/Card';
import { useLanguage } from '../../hooks/useLanguage';

const StatCard: React.FC<Stat> = ({ titleKey, value, change, changeType }) => {
  const { t } = useLanguage();
  const isIncrease = changeType === 'increase';
  const changeColor = isIncrease ? 'text-green-400' : 'text-red-400';

  return (
    <Card className="border-l-4 border-omni-gold transition-transform duration-300 hover:-translate-y-1 hover:shadow-glow-gold">
      <p className="text-sm text-gray-400">{t(titleKey)}</p>
      <div className="flex items-end justify-between mt-2">
        <p className="text-3xl font-bold text-white">{value}</p>
        <div className={`flex items-center text-sm font-semibold ${changeColor}`}>
          {isIncrease ? '▲' : '▼'}
          <span className="ml-1">{change}</span>
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
