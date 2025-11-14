import React from 'react';
import { Invitation } from '../../types';
import Button from '../ui/Button';
import { useLanguage } from '../../hooks/useLanguage';
import { AppLogo } from '../../constants';

interface PrintableGuestListProps {
  invitations: Invitation[];
  onClose: () => void;
}

const PrintableGuestList: React.FC<PrintableGuestListProps> = ({ invitations, onClose }) => {
  const { t } = useLanguage();
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-omni-gray-dark border border-omni-gray rounded-xl w-full max-w-4xl h-[90vh] shadow-2xl shadow-omni-blue/20 flex flex-col" 
        onClick={e => e.stopPropagation()}
      >
        <div id="printable-area">
            <header className="p-4 border-b border-omni-gray flex justify-between items-center no-print">
            <h2 className="text-xl font-bold text-white">{t('invitations.printable.title')}</h2>
            <div className="flex items-center space-x-4">
                <Button onClick={handlePrint} variant="secondary">{t('invitations.printable.print')}</Button>
                <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl leading-none">&times;</button>
            </div>
            </header>
            
            <main className="flex-1 overflow-y-auto p-8">
                <div className="print-header mb-8">
                    <AppLogo />
                    <h1 className="text-3xl font-bold text-white mt-4">{t('invitations.printable.header')}</h1>
                    <p className="text-gray-400">{new Date().toLocaleDateString()}</p>
                </div>
            <table className="w-full text-left">
                <thead className="border-b border-omni-gray text-sm text-gray-400">
                <tr>
                    <th className="p-2">#</th>
                    <th className="p-2">{t('invitations.table.eventName')}</th>
                    <th className="p-2">{t('invitations.table.recipient')}</th>
                    <th className="p-2">{t('invitations.table.role')}</th>
                    <th className="p-2">{t('invitations.table.status')}</th>
                </tr>
                </thead>
                <tbody>
                {invitations.map((invite, index) => (
                    <tr key={invite.id} className="border-b border-omni-gray/50">
                    <td className="p-2 text-gray-400">{index + 1}</td>
                    <td className="p-2 font-semibold text-white">{invite.eventName}</td>
                    <td className="p-2 text-gray-300">{invite.recipient}</td>
                    <td className={`p-2 font-semibold`}>{t(`roles.${invite.role.toLowerCase()}`)}</td>
                    <td className="p-2">
                        {t(`statuses.${invite.status.toLowerCase()}`)}
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </main>
        </div>
      </div>
      <style>{`
        @media print {
          body > *:not(.fixed) {
            display: none;
          }
          .fixed {
            position: absolute !important;
            inset: 0 !important;
            padding: 0 !important;
            background: none !important;
            backdrop-filter: none !important;
          }
          #printable-area {
            visibility: visible;
            background-color: white !important;
            color: black !important;
            border: none !important;
            box-shadow: none !important;
            height: auto;
            overflow: visible;
          }
          #printable-area .no-print {
            display: none !important;
          }
          #printable-area main {
            overflow: visible !important;
          }
          #printable-area .text-white, 
          #printable-area .text-gray-300, 
          #printable-area .text-gray-400,
          #printable-area .font-semibold {
            color: black !important;
          }
           #printable-area .print-header svg path {
             stroke: black !important;
           }
           #printable-area .print-header span {
            color: black !important;
           }
           #printable-area table {
            font-size: 12px;
           }
           #printable-area th, #printable-area td {
            border: 1px solid #ddd;
           }
           #printable-area thead {
             border-color: #ddd;
           }
           #printable-area tbody tr {
             border-color: #eee;
           }
        }
      `}</style>
    </div>
  );
};

export default PrintableGuestList;
