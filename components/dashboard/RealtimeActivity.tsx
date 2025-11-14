import React, { useState, useEffect } from 'react';
import { ActivityLog, GuestRole, ValidationStatus } from '../../types';
import Card from '../ui/Card';
import { useSocket } from '../../hooks/useSocket';
import { useLanguage } from '../../hooks/useLanguage';

interface RealtimeActivityProps {
  onGuestCheckIn: () => void;
}

const roleColorMap: { [key in GuestRole]: string } = {
  Guest: 'text-gray-300',
  VIP: 'text-omni-gold',
  Speaker: 'text-omni-blue',
  Press: 'text-purple-400',
};

const statusIconMap: { [key in ValidationStatus]: string } = {
    Valid: '✅',
    Duplicate: '⚠️',
    Invalid: '❌',
}

const RealtimeActivity: React.FC<RealtimeActivityProps> = ({ onGuestCheckIn }) => {
  const { t } = useLanguage();
  const { socket } = useSocket();
  const [activities, setActivities] = useState<ActivityLog[]>([]);

  useEffect(() => {
    if (!socket) return;

    const handleQrScanned = (data: { payload: any, timestamp: number, isDuplicate: boolean }) => {
      const newActivity: ActivityLog = {
        id: data.payload.id,
        recipient: data.payload.recipient,
        eventName: data.payload.eventName,
        role: data.payload.role,
        status: data.isDuplicate ? 'Duplicate' : 'Valid',
        timestamp: data.timestamp,
      };
      
      setActivities(prev => [newActivity, ...prev.slice(0, 9)]);

      if (!data.isDuplicate) {
        onGuestCheckIn();
      }
    };
    
    socket.on('qrScanned', handleQrScanned);

    return () => {
      socket.off('qrScanned', handleQrScanned);
    };
  }, [socket, onGuestCheckIn]);

  return (
    <Card className="h-full flex flex-col">
      <h2 className="text-xl font-bold text-white mb-4">{t('dashboard.realtimeActivity.title')}</h2>
      {activities.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-gray-500 italic">
          {t('dashboard.realtimeActivity.waiting')}
        </div>
      ) : (
        <ul className="space-y-3 overflow-y-auto pr-2">
          {activities.map((activity) => (
            <li key={`${activity.id}-${activity.timestamp}`} className="flex items-start space-x-3 p-2 rounded-lg bg-omni-gray-light/50 animate-fade-in-down">
              <span className="text-xl">{statusIconMap[activity.status]}</span>
              <div>
                <p className="font-semibold text-white">
                  {activity.recipient}
                </p>
                <p className={`text-sm ${roleColorMap[activity.role]}`}>
                  {t(`roles.${activity.role.toLowerCase()}`)} - {t(`statuses.${activity.status.toLowerCase()}`)}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(activity.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
      <style>{`
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.3s ease-out forwards;
        }
      `}</style>
    </Card>
  );
};

export default RealtimeActivity;
