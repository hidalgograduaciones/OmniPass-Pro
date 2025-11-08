
import React from 'react';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Tooltip, Area, CartesianGrid } from 'recharts';
import { ChartData } from '../../types';
import { useLanguage } from '../../hooks/useLanguage';

interface AnalyticsChartProps {
    data: ChartData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
    const { t } = useLanguage();
    if (active && payload && payload.length) {
      return (
        <div className="bg-omni-gray p-4 border border-omni-gray-light rounded-lg shadow-lg">
          <p className="label font-bold text-white">{`${label}`}</p>
          <p className="intro text-omni-blue">{`${t('dashboard.chart.gemini')}: ${payload[0].value}`}</p>
          <p className="intro text-omni-gold">{`${t('dashboard.chart.openAI')}: ${payload[1].value}`}</p>
        </div>
      );
    }
    return null;
};

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorGemini" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00ffff" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#00ffff" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorOpenAI" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#d4af37" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#d4af37" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="#888888" />
          <YAxis stroke="#888888" />
          <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="gemini" stroke="#00ffff" fillOpacity={1} fill="url(#colorGemini)" />
          <Area type="monotone" dataKey="openAI" stroke="#d4af37" fillOpacity={1} fill="url(#colorOpenAI)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;
