export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1',
  
  TIMEOUT: {
    DEFAULT: 30000,
    UPLOAD: 120000,
  },
  
  RETRY: {
    MAX_RETRIES: 3,
    RETRY_DELAY: 1000,
  },
  
  ENDPOINTS: {
    AUTH: {
      SIGNUP: '/auth/signup',
      LOGIN: '/auth/login',
      LOGOUT: '/auth/logout',
      REFRESH: '/auth/refresh',
      ME: '/auth/me',
    },
    APPLICATIONS: {
      PREQUALIFICATION: '/applications/prequalification',
      PREQUALIFICATION_BY_ID: (id: string) => `/applications/prequalification/${id}`,
      INCORPORATION: '/applications/incorporation',
      INCORPORATION_BY_ID: (id: string) => `/applications/incorporation/${id}`,
      SUBMIT: (id: string) => `/applications/${id}/submit`,
      STATUS: (id: string) => `/applications/${id}/status`,
    },
    DOCUMENTS: {
      UPLOAD: '/documents/upload',
      GET: (id: string) => `/documents/${id}`,
      DELETE: (id: string) => `/documents/${id}`,
    },
    ACTIVITIES: {
      LIST: '/activities',
      SEARCH: '/activities/search',
    },
    AI: {
      VERTEX_CHAT: '/vertex/chat',
      ANALYZE_DOCUMENT: '/ai/analyze-document',
    },
  },
  
  UPLOAD: {
    MAX_SIZE: 10 * 1024 * 1024,
    ALLOWED_TYPES: ['application/pdf', 'image/png', 'image/jpeg'],
  },
} as const;
