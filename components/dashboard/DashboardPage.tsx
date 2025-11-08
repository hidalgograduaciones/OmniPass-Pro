
import React from 'react';
import StatCard from './StatCard';
import AnalyticsChart from './AnalyticsChart';
import QuickAccess from './QuickAccess';
import { MOCK_STATS, MOCK_CHART_DATA } from '../../constants';
import Card from '../ui/Card';
import { useLanguage } from '../../hooks/useLanguage';

const DashboardPage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_STATS.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
            <h2 className="text-xl font-bold text-white mb-4">{t('dashboard.apiUsage')}</h2>
            <AnalyticsChart data={MOCK_CHART_DATA} />
        </Card>
        <QuickAccess />
      </div>
    </div>
  );
};

export default DashboardPage;
