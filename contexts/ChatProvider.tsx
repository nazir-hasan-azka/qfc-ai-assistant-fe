'use client';

import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import type { ChatMessage, ExtractedCompanyData } from '@/types';
import { generateId } from '@/lib/utils';

interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  conversationData: ExtractedCompanyData | null;
  currentStep: number;
  applicationId: string | null;
  sessionId: string | null;
  error: string | null;
}

type ChatAction =
  | { type: 'ADD_MESSAGE'; payload: ChatMessage }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_CONVERSATION_DATA'; payload: ExtractedCompanyData }
  | { type: 'SET_CURRENT_STEP'; payload: number }
  | { type: 'SET_APPLICATION_ID'; payload: string }
  | { type: 'SET_SESSION_ID'; payload: string }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_CHAT' }
  | { type: 'RESTORE_STATE'; payload: Partial<ChatState> };

interface ChatContextValue extends ChatState {
  sendMessage: (content: string, metadata?: Record<string, unknown>) => void;
  setConversationData: (data: ExtractedCompanyData) => void;
  setCurrentStep: (step: number) => void;
  setApplicationId: (id: string) => void;
  setSessionId: (id: string) => void;
  clearChat: () => void;
}

const initialState: ChatState = {
  messages: [],
  isLoading: false,
  conversationData: null,
  currentStep: 0,
  applicationId: null,
  sessionId: null,
  error: null,
};

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload], error: null };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_CONVERSATION_DATA':
      return { ...state, conversationData: action.payload };
    case 'SET_CURRENT_STEP':
      return { ...state, currentStep: action.payload };
    case 'SET_APPLICATION_ID':
      return { ...state, applicationId: action.payload };
    case 'SET_SESSION_ID':
      return { ...state, sessionId: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'CLEAR_CHAT':
      return { ...initialState, sessionId: state.sessionId };
    case 'RESTORE_STATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

interface ChatProviderProps {
  children: React.ReactNode;
  enablePersistence?: boolean;
}

export function ChatProvider({ children, enablePersistence = true }: ChatProviderProps) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  useEffect(() => {
    if (!enablePersistence) return;
    try {
      const stored = sessionStorage.getItem('qfc-chat-state');
      if (stored) {
        const parsedState = JSON.parse(stored);
        if (parsedState.messages) {
          parsedState.messages = parsedState.messages.map((msg: ChatMessage) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          }));
        }
        dispatch({ type: 'RESTORE_STATE', payload: parsedState });
      }
    } catch (error) {
      console.error('Failed to restore chat state:', error);
    }
  }, [enablePersistence]);

  useEffect(() => {
    if (!enablePersistence) return;
    try {
      sessionStorage.setItem('qfc-chat-state', JSON.stringify({ ...state, isLoading: false, error: null }));
    } catch (error) {
      console.error('Failed to persist chat state:', error);
    }
  }, [state, enablePersistence]);

  const sendMessage = useCallback((content: string, metadata?: Record<string, unknown>) => {
    const message: ChatMessage = {
      id: generateId('msg'),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
      metadata,
    };
    dispatch({ type: 'ADD_MESSAGE', payload: message });
  }, []);

  const setConversationData = useCallback((data: ExtractedCompanyData) => {
    dispatch({ type: 'SET_CONVERSATION_DATA', payload: data });
  }, []);

  const setCurrentStep = useCallback((step: number) => {
    dispatch({ type: 'SET_CURRENT_STEP', payload: step });
  }, []);

  const setApplicationId = useCallback((id: string) => {
    dispatch({ type: 'SET_APPLICATION_ID', payload: id });
  }, []);

  const setSessionId = useCallback((id: string) => {
    dispatch({ type: 'SET_SESSION_ID', payload: id });
  }, []);

  const clearChat = useCallback(() => {
    dispatch({ type: 'CLEAR_CHAT' });
    if (enablePersistence) {
      try {
        sessionStorage.removeItem('qfc-chat-state');
      } catch (error) {
        console.error('Failed to clear chat storage:', error);
      }
    }
  }, [enablePersistence]);

  const value: ChatContextValue = {
    ...state,
    sendMessage,
    setConversationData,
    setCurrentStep,
    setApplicationId,
    setSessionId,
    clearChat,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
