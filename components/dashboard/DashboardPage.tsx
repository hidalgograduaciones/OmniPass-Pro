
import React, { useState, useCallback } from 'react';
import StatCard from './StatCard';
import AnalyticsChart from './AnalyticsChart';
import RealtimeActivity from './RealtimeActivity';
import { MOCK_STATS, MOCK_CHART_DATA } from '../../constants';
import Card from '../ui/Card';
import { useLanguage } from '../../hooks/useLanguage';

const DashboardPage: React.FC = () => {
  const { t } = useLanguage();
  const [stats, setStats] = useState(MOCK_STATS);

  const handleGuestCheckIn = useCallback(() => {
    setStats(prevStats => {
      const guestsCheckedInStat = prevStats.find(s => s.titleKey === 'dashboard.stats.guestsCheckedIn');
      if (!guestsCheckedInStat) return prevStats;

      const currentValue = parseInt(guestsCheckedInStat.value.replace(/,/g, ''), 10);
      const newValue = currentValue + 1;

      return prevStats.map(stat => 
        stat.titleKey === 'dashboard.stats.guestsCheckedIn'
        ? { ...stat, value: newValue.toLocaleString() }
        : stat
      );
    });
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
            <h2 className="text-xl font-bold text-white mb-4">{t('dashboard.apiUsage')}</h2>
            <AnalyticsChart data={MOCK_CHART_DATA} />
        </Card>
        <RealtimeActivity onGuestCheckIn={handleGuestCheckIn} />
      </div>
    </div>
  );
};

export default DashboardPage;