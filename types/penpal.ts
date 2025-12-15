import type { Connection } from 'penpal';

export interface HostMethods {
  getAuthToken: () => Promise<string>;
  toggleChat: () => void;
  getChatbotInfo: () => Promise<ChatbotInfo>;
  notifyNavigation: (path: string) => void;
  trackEvent: (event: string, data?: Record<string, unknown>) => void;
}

export interface WidgetMethods {
  openChat: () => void;
  closeChat: () => void;
  sendMessage: (message: string) => void;
  resetChat: () => void;
  getChatState: () => Promise<ChatState>;
}

export interface ChatbotInfo {
  userId: string;
  userName?: string;
  userEmail?: string;
  locale?: string;
  theme?: 'light' | 'dark';
}

export interface ChatState {
  isOpen: boolean;
  messageCount: number;
  currentStep?: number;
  applicationId?: string;
}

export type ConnectionState = 'connecting' | 'connected' | 'disconnected' | 'error';

export interface PenpalContextValue {
  connection: Connection<HostMethods> | null;
  connectionState: ConnectionState;
  hostMethods: HostMethods | null;
  error: Error | null;
  reconnect: () => void;
}

export function isIframe(): boolean {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}

export function getParentOrigin(): string | null {
  if (!isIframe()) return null;
  try {
    return document.referrer ? new URL(document.referrer).origin : null;
  } catch {
    return null;
  }
}

export function isAllowedOrigin(origin: string): boolean {
  const allowedOrigins = process.env.NEXT_PUBLIC_ALLOWED_ORIGINS?.split(',') || [];
  if (process.env.NODE_ENV === 'development') return true;
  return allowedOrigins.some((allowed) => {
    if (allowed === origin) return true;
    if (allowed.startsWith('*.')) {
      const domain = allowed.slice(2);
      return origin.endsWith(domain);
    }
    return false;
  });
}
