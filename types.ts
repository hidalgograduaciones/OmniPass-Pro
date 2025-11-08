export type Page = 'dashboard' | 'invitations' | 'integrations' | 'scanner';

export type GuestRole = 'Guest' | 'VIP' | 'Speaker' | 'Press';

export type ValidationStatus = 'Valid' | 'Duplicate' | 'Invalid';

export interface User {
  name: string;
  role: 'Admin' | 'Manager' | 'User';
  avatarUrl: string;
}

export interface Stat {
  titleKey: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
}

export interface Invitation {
  id: string;
  eventName: string;
  recipient: string;
  date: string;
  status: 'Pending' | 'Validated' | 'Expired';
  role: GuestRole;
}

export interface QRTokenPayload {
    id: string;
    eventName: string;
    recipient: string;
    role: GuestRole;
}

export interface Integration {
  name: 'Google Gemini' | 'OpenAI' | 'WhatsApp' | 'Instagram' | 'Gmail' | 'Notion' | 'Google Drive' | 'Google Sheets';
  description: string;
  isConnected: boolean;
}

export interface ChartData {
  name: string;
  gemini: number;
  openAI: number;
}
