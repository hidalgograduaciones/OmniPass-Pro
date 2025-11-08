import React from 'react';
import { Page, Stat, Invitation, Integration, User, ChartData } from './types';

export const AppLogo = () => (
    <div className="flex items-center space-x-2">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-omni-gold">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="font-bold text-xl text-white">OmniCorp Hub</span>
    </div>
);

export const ICONS: { [key in Page | 'settings' | 'logout' | 'bell' | 'search' | 'qr']: React.FC<{className?: string}> } = {
    dashboard: ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20V16"/></svg>,
    invitations: ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
    integrations: ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 11V11C15.866 11 19 14.134 19 18V18H5V18C5 14.134 8.13401 11 12 11Z"/><path d="M12 11V5"/><path d="M12 5L15 8"/><path d="M12 5L9 8"/><path d="M5 18L3 16"/><path d="M19 18L21 16"/><path d="M5 18H3"/><path d="M19 18H21"/></svg>,
    scanner: ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><rect x="7" y="7" width="10" height="10" rx="1"/><path d="M12 7v10"/></svg>,
    settings: ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2.4l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1 0-2.4l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>,
    logout: ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
    bell: ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    search: ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    qr: ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h7v7h-7z"/></svg>,
};

export const MOCK_USER: User = {
    name: 'Hec (Eiden Alfa)',
    role: 'Admin',
    avatarUrl: `https://i.pravatar.cc/100?u=eiden-alfa`
};

export const MOCK_STATS: Stat[] = [
    { titleKey: 'dashboard.stats.apiCalls', value: '1,2M', change: '+12.5%', changeType: 'increase' },
    { titleKey: 'dashboard.stats.activeAutomations', value: '4,832', change: '+2.1%', changeType: 'increase' },
    { titleKey: 'dashboard.stats.invitationsGenerated', value: '7,129', change: '-0.8%', changeType: 'decrease' },
    { titleKey: 'dashboard.stats.guestsCheckedIn', value: '1,204', change: '+3.2%', changeType: 'increase' },
];

export const MOCK_INVITATIONS: Invitation[] = [
    { id: 'INV-001', eventName: 'Nexus Gala 2024', recipient: 'john.doe@example.com', date: '2024-10-26', status: 'Validated', role: 'VIP' },
    { id: 'INV-002', eventName: 'Project Chimera Launch', recipient: 'jane.smith@example.com', date: '2024-11-15', status: 'Pending', role: 'Speaker' },
    { id: 'INV-003', eventName: 'Quantum Leap Summit', recipient: 'sam.wilson@example.com', date: '2024-12-01', status: 'Pending', role: 'Guest' },
    { id: 'INV-004', eventName: 'Aethelred Conference', recipient: 'chris.green@example.com', date: '2024-09-20', status: 'Expired', role: 'Press' },
];

export const MOCK_INTEGRATIONS: Integration[] = [
    { name: 'Google Gemini', description: 'Advanced multimodal AI models for complex reasoning.', isConnected: true },
    { name: 'OpenAI', description: 'Access to GPT models for text generation and analysis.', isConnected: true },
    { name: 'WhatsApp', description: 'Automate messaging and customer interactions.', isConnected: false },
    { name: 'Instagram', description: 'Manage social media presence and engagement.', isConnected: false },
    { name: 'Gmail', description: 'Process emails and trigger automated workflows.', isConnected: true },
    { name: 'Notion', description: 'Organize knowledge and automate documentation.', isConnected: true },
    { name: 'Google Drive', description: 'Seamless file management and cloud storage automation.', isConnected: true },
    { name: 'Google Sheets', description: 'Manipulate and analyze data in spreadsheets.', isConnected: false },
];

export const MOCK_CHART_DATA: ChartData[] = [
    { name: 'Mon', gemini: 4000, openAI: 2400 },
    { name: 'Tue', gemini: 3000, openAI: 1398 },
    { name: 'Wed', gemini: 2000, openAI: 9800 },
    { name: 'Thu', gemini: 2780, openAI: 3908 },
    { name: 'Fri', gemini: 1890, openAI: 4800 },
    { name: 'Sat', gemini: 2390, openAI: 3800 },
    { name: 'Sun', gemini: 3490, openAI: 4300 },
];
