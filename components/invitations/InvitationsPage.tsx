import React, { useState } from 'react';
import { MOCK_INVITATIONS } from '../../constants';
import { Invitation } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import QRCodeGeneratorModal from './QRCodeGeneratorModal';
import { useLanguage } from '../../hooks/useLanguage';

const statusColorMap = {
  Pending: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
  Validated: 'bg-green-500/20 text-green-400 border border-green-500/30',
  Expired: 'bg-red-500/20 text-red-400 border border-red-500/30',
};

const roleColorMap = {
    Guest: 'text-gray-300',
    VIP: 'text-omni-gold',
    Speaker: 'text-omni-blue',
    Press: 'text-purple-400',
}

const InvitationsPage: React.FC = () => {
  const { t } = useLanguage();
  const [invitations, setInvitations] = useState<Invitation[]>(MOCK_INVITATIONS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddInvitation = (newInvitation: Invitation) => {
    setInvitations(prev => [newInvitation, ...prev]);
  };

  return (
    <>
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">{t('invitations.title')}</h2>
          <Button onClick={() => setIsModalOpen(true)}>{t('invitations.generateNew')}</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-omni-gray text-sm text-gray-400">
              <tr>
                <th className="p-4">{t('invitations.table.eventName')}</th>
                <th className="p-4">{t('invitations.table.recipient')}</th>
                <th className="p-4">{t('invitations.table.role')}</th>
                <th className="p-4">{t('invitations.table.date')}</th>
                <th className="p-4">{t('invitations.table.status')}</th>
                <th className="p-4">{t('invitations.table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {invitations.map((invite) => (
                <tr key={invite.id} className="border-b border-omni-gray hover:bg-omni-gray-light transition-colors">
                  <td className="p-4 font-semibold">{invite.eventName}</td>
                  <td className="p-4 text-gray-300">{invite.recipient}</td>
                  <td className={`p-4 font-semibold ${roleColorMap[invite.role]}`}>{t(`roles.${invite.role.toLowerCase()}`)}</td>
                  <td className="p-4 text-gray-300">{invite.date}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColorMap[invite.status]}`}>
                      {t(`statuses.${invite.status.toLowerCase()}`)}
                    </span>
                  </td>
                  <td className="p-4">
                    <Button variant="ghost" className="py-1.5 px-3 text-sm">{t('invitations.table.details')}</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      {isModalOpen && <QRCodeGeneratorModal onClose={() => setIsModalOpen(false)} onAddInvitation={handleAddInvitation} />}
    </>
  );
};

export default InvitationsPage;
