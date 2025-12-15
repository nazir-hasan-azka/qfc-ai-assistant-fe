'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react';
import { connectToParent, type Connection } from 'penpal';
import type {
  HostMethods,
  WidgetMethods,
  ConnectionState,
  PenpalContextValue,
} from '@/types/penpal';
import { isIframe, isAllowedOrigin, getParentOrigin } from '@/types/penpal';

// ============================================================================
// Context
// ============================================================================

const PenpalContext = createContext<PenpalContextValue | undefined>(undefined);

// ============================================================================
// Provider Props
// ============================================================================

interface PenpalProviderProps {
  children: React.ReactNode;
  connectionTimeout?: number;
  autoReconnect?: boolean;
}

// ============================================================================
// Provider Component
// ============================================================================

export function PenpalProvider({
  children,
  connectionTimeout = 10000,
  autoReconnect = true,
}: PenpalProviderProps) {
  const [connection, setConnection] = useState<Connection<HostMethods> | null>(
    null
  );
  const [connectionState, setConnectionState] =
    useState<ConnectionState>('connecting');
  const [hostMethods, setHostMethods] = useState<HostMethods | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const connectionRef = useRef<Connection<HostMethods> | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Define widget methods that will be exposed to parent
  const widgetMethods: WidgetMethods = {
    openChat: () => {
      console.log('Chat opened via parent');
    },
    closeChat: () => {
      console.log('Chat closed via parent');
    },
    sendMessage: (message: string) => {
      console.log('Message from parent:', message);
    },
    resetChat: () => {
      console.log('Chat reset via parent');
    },
    getChatState: async () => {
      return {
        isOpen: true,
        messageCount: 0,
      };
    },
  };

  // ============================================================================
  // Connection Establishment
  // ============================================================================

  const establishConnection = useCallback(async () => {
    // Only establish connection if running in iframe
    if (!isIframe()) {
      console.log('Not running in iframe, skipping Penpal connection');
      setConnectionState('disconnected');
      return;
    }

    const parentOrigin = getParentOrigin();
    if (!parentOrigin || !isAllowedOrigin(parentOrigin)) {
      const err = new Error(
        `Parent origin ${parentOrigin} is not allowed. Check NEXT_PUBLIC_ALLOWED_ORIGINS.`
      );
      console.error(err);
      setError(err);
      setConnectionState('error');
      return;
    }

    try {
      setConnectionState('connecting');
      setError(null);

      console.log('Establishing Penpal connection to parent:', parentOrigin);

      const conn = connectToParent<HostMethods>({
        // Methods exposed to parent
        methods: widgetMethods,
        // Connection timeout
        timeout: connectionTimeout,
        // Debug mode in development
        debug: process.env.NODE_ENV === 'development',
      });

      connectionRef.current = conn;

      // Wait for connection to be established
      const methods = await conn.promise;

      console.log('Penpal connection established successfully');

      setConnection(conn);
      setHostMethods(methods);
      setConnectionState('connected');
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error('Unknown connection error');
      console.error('Penpal connection failed:', error);
      setError(error);
      setConnectionState('error');

      // Auto-reconnect after delay
      if (autoReconnect) {
        reconnectTimeoutRef.current = setTimeout(() => {
          console.log('Attempting to reconnect...');
          establishConnection();
        }, 5000);
      }
    }
  }, [connectionTimeout, autoReconnect]);

  // ============================================================================
  // Reconnect Function
  // ============================================================================

  const reconnect = useCallback(() => {
    // Destroy existing connection
    if (connectionRef.current) {
      connectionRef.current.destroy();
      connectionRef.current = null;
    }

    // Clear reconnect timeout
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    // Establish new connection
    establishConnection();
  }, [establishConnection]);

  // ============================================================================
  // Effects
  // ============================================================================

  // Establish connection on mount
  useEffect(() => {
    establishConnection();

    // Cleanup on unmount
    return () => {
      if (connectionRef.current) {
        connectionRef.current.destroy();
        connectionRef.current = null;
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
    };
  }, [establishConnection]);

  // Monitor connection health
  useEffect(() => {
    if (!connection) return;

    const handleBeforeUnload = () => {
      connection.destroy();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [connection]);

  // ============================================================================
  // Context Value
  // ============================================================================

  const value: PenpalContextValue = {
    connection,
    connectionState,
    hostMethods,
    error,
    reconnect,
  };

  return (
    <PenpalContext.Provider value={value}>{children}</PenpalContext.Provider>
  );
}

// ============================================================================
// Hook
// ============================================================================

export function usePenpal() {
  const context = useContext(PenpalContext);

  if (context === undefined) {
    throw new Error('usePenpal must be used within a PenpalProvider');
  }

  return context;
}

// ============================================================================
// Helper Hooks
// ============================================================================

export function useAuthToken() {
  const { hostMethods, connectionState } = usePenpal();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchToken() {
      if (connectionState !== 'connected' || !hostMethods) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const authToken = await hostMethods.getAuthToken();
        setToken(authToken);
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error('Failed to get auth token');
        console.error('Error fetching auth token:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchToken();
  }, [hostMethods, connectionState]);

  return { token, loading, error };
}

export function useChatbotInfo() {
  const { hostMethods, connectionState } = usePenpal();
  const [info, setInfo] = useState<Awaited<
    ReturnType<HostMethods['getChatbotInfo']>
  > | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchInfo() {
      if (connectionState !== 'connected' || !hostMethods) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const chatbotInfo = await hostMethods.getChatbotInfo();
        setInfo(chatbotInfo);
      } catch (err) {
        const error =
          err instanceof Error
            ? err
            : new Error('Failed to get chatbot info');
        console.error('Error fetching chatbot info:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchInfo();
  }, [hostMethods, connectionState]);

  return { info, loading, error };
}
