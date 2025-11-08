import { QRTokenPayload, Invitation } from '../types';

/**
 * Creates a base64 encoded JSON string to simulate a JWT.
 * In a real application, this should be a signed JWT.
 * @param payload The data to encode.
 * @returns A base64 encoded string.
 */
export const createInvitationToken = (payload: QRTokenPayload): string => {
  try {
    const jsonString = JSON.stringify(payload);
    return btoa(jsonString);
  } catch (error) {
    console.error("Failed to create invitation token:", error);
    return '';
  }
};

/**
 * Decodes a base64 encoded JSON string.
 * @param token The token to decode.
 * @returns The decoded payload or null if decoding fails.
 */
export const decodeInvitationToken = (token: string): QRTokenPayload | null => {
  try {
    const jsonString = atob(token);
    return JSON.parse(jsonString) as QRTokenPayload;
  } catch (error) {
    console.error("Failed to decode invitation token:", error);
    return null;
  }
};


/**
 * Generates an SVG string for a high-quality, printable invitation.
 * @param invitation The invitation data.
 * @param qrCodeDataUrl The data URL of the QR code image.
 * @returns An SVG string.
 */
export const generateInvitationSVG = (invitation: Invitation, qrCodeDataUrl: string, t: (key: string) => string): string => {
    const { eventName, recipient, role, id } = invitation;
    const roleColor = {
        Guest: '#cccccc',
        VIP: '#d4af37',
        Speaker: '#00ffff',
        Press: '#a855f7',
    }[role];

  return `
    <svg width="800" height="450" viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#111111;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#0a0a0a;stop-opacity:1" />
            </linearGradient>
            <style>
                .title { font: bold 48px 'Inter', sans-serif; fill: white; }
                .subtitle { font: 24px 'Inter', sans-serif; fill: #d4af37; }
                .text { font: 18px 'Inter', sans-serif; fill: #bbbbbb; }
                .label { font: bold 16px 'Inter', sans-serif; fill: #888888; text-transform: uppercase; }
                .role { font: bold 22px 'Inter', sans-serif; fill: ${roleColor}; }
            </style>
        </defs>
        <rect width="800" height="450" fill="url(#grad1)" />
        
        <!-- Decorative Elements -->
        <path d="M0 0 L300 0 L150 450 L0 450 Z" fill="#1a1a1a" />
        <path d="M750 0 L800 0 L800 450 L650 450 Z" fill="#00ffff" opacity="0.1" />

        <!-- OmniCorp Logo -->
        <g transform="translate(50, 40)">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#d4af37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="#d4af37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="#d4af37" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <text x="30" y="18" font-family="'Inter', sans-serif" font-size="20" font-weight="bold" fill="white">OmniCorp Hub</text>
        </g>
        
        <!-- Main Content -->
        <text x="50" y="150" class="title">${eventName}</text>
        <text x="50" y="185" class="subtitle">${t('invitations.title')}</text>
        
        <text x="50" y="250" class="label">${t('invitations.table.recipient')}</text>
        <text x="50" y="275" class="text">${recipient}</text>
        
        <text x="50" y="325" class="label">${t('invitations.table.role')}</text>
        <text x="50" y="355" class="role">${t(`roles.${role.toLowerCase()}`)}</text>
        
        <!-- QR Code -->
        <rect x="540" y="115" width="220" height="220" fill="#1a1a1a" rx="10"/>
        <image xlink:href="${qrCodeDataUrl}" x="550" y="125" height="200" width="200" />
        <text x="650" y="360" text-anchor="middle" class="label">${id}</text>
        
    </svg>
  `;
};
