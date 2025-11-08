import React, { useState, useCallback } from 'react';
import { Invitation, GuestRole } from '../../types';
import Button from '../ui/Button';
import { generateEventDescription } from '../../services/geminiService';
import { createInvitationToken, generateInvitationSVG } from '../../utils/invitationUtils';
import { useLanguage } from '../../hooks/useLanguage';

interface QRCodeGeneratorModalProps {
  onClose: () => void;
  onAddInvitation: (invitation: Invitation) => void;
}

const GUEST_ROLES: GuestRole[] = ['Guest', 'VIP', 'Speaker', 'Press'];

const QRCodeGeneratorModal: React.FC<QRCodeGeneratorModalProps> = ({ onClose, onAddInvitation }) => {
  const { t } = useLanguage();
  const [eventName, setEventName] = useState('');
  const [recipient, setRecipient] = useState('');
  const [role, setRole] = useState<GuestRole>('Guest');
  const [eventDetails, setEventDetails] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedQR, setGeneratedQR] = useState<string | null>(null);
  const [invitationData, setInvitationData] = useState<Invitation | null>(null);


  const handleGenerateDetails = useCallback(async () => {
    if (!eventName) {
      alert(t('invitations.modal.errorEventName'));
      return;
    }
    setIsLoading(true);
    try {
      const description = await generateEventDescription(eventName, t);
      setEventDetails(description);
    } catch (error) {
      console.error('Error generating event details:', error);
      setEventDetails(t('services.gemini.failDetails'));
    } finally {
      setIsLoading(false);
    }
  }, [eventName, t]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventName || !recipient) {
        alert(t('invitations.modal.errorFillFields'));
        return;
    }
    
    const newInvitation: Invitation = {
      id: `INV-${String(Date.now()).slice(-6)}`,
      eventName,
      recipient,
      role,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
    };
    
    const token = createInvitationToken({
        id: newInvitation.id,
        eventName: newInvitation.eventName,
        recipient: newInvitation.recipient,
        role: newInvitation.role,
    });
    
    setGeneratedQR(`https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(token)}&bgcolor=0a0a0a&color=d4af37&qzone=1`);
    setInvitationData(newInvitation);
    onAddInvitation(newInvitation);
  };
  
  const handleDownload = () => {
    if (!invitationData || !generatedQR) return;

    const svgString = generateInvitationSVG(invitationData, generatedQR, t);
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `OmniCorp_Invitation_${invitationData.id}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };


  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-omni-gray-dark border border-omni-gray rounded-xl p-8 w-full max-w-lg shadow-2xl shadow-omni-blue/20" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-white mb-6">{t('invitations.modal.title')}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl leading-none">&times;</button>
        </div>

        {generatedQR && invitationData ? (
          <div className="text-center">
            <h3 className="text-xl font-semibold text-omni-gold mb-4">{t('invitations.modal.success')}</h3>
            <img src={generatedQR} alt="Generated QR Code" className="mx-auto rounded-lg border-4 border-omni-gold"/>
            <p className="mt-4 text-gray-300">{t('invitations.modal.successText', { eventName: invitationData.eventName, recipient: invitationData.recipient })}</p>
            <div className="flex justify-center space-x-4 mt-6">
                 <Button onClick={onClose} variant="ghost">{t('invitations.modal.close')}</Button>
                <Button onClick={handleDownload} variant="secondary">{t('invitations.modal.download')}</Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="eventName" className="block text-sm font-medium text-gray-400 mb-1">{t('invitations.modal.eventName')}</label>
              <input type="text" id="eventName" value={eventName} onChange={e => setEventName(e.target.value)} className="w-full bg-omni-gray border border-omni-gray-light rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-omni-blue" required/>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="recipient" className="block text-sm font-medium text-gray-400 mb-1">{t('invitations.modal.recipientEmail')}</label>
                    <input type="email" id="recipient" value={recipient} onChange={e => setRecipient(e.target.value)} className="w-full bg-omni-gray border border-omni-gray-light rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-omni-blue" required/>
                </div>
                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-400 mb-1">{t('invitations.modal.guestRole')}</label>
                    <select id="role" value={role} onChange={e => setRole(e.target.value as GuestRole)} className="w-full bg-omni-gray border border-omni-gray-light rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-omni-blue appearance-none">
                        {GUEST_ROLES.map(r => <option key={r} value={r}>{t(`roles.${r.toLowerCase()}`)}</option>)}
                    </select>
                </div>
            </div>
            <div>
                <div className="flex justify-between items-center mb-1">
                    <label htmlFor="eventDetails" className="block text-sm font-medium text-gray-400">{t('invitations.modal.eventDetails')}</label>
                    <Button type="button" variant="ghost" onClick={handleGenerateDetails} disabled={isLoading} className="text-xs py-1 px-2">
                        {isLoading ? t('invitations.modal.generating') : t('invitations.modal.generateWithGemini')}
                    </Button>
                </div>
                <textarea id="eventDetails" rows={3} value={eventDetails} onChange={e => setEventDetails(e.target.value)} className="w-full bg-omni-gray border border-omni-gray-light rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-omni-blue" />
            </div>
            <div className="flex justify-end pt-4">
              <Button type="submit">{t('invitations.modal.generateToken')}</Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default QRCodeGeneratorModal;
