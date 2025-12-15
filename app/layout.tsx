import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { PenpalProvider } from '@/contexts/PenpalProvider';
import { ChatProvider } from '@/contexts/ChatProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'QFC AI Assistant',
  description: 'AI-powered assistant for Qatar Financial Centre business registration',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <PenpalProvider connectionTimeout={10000} autoReconnect={true}>
          <ChatProvider enablePersistence={true}>
            {children}
          </ChatProvider>
        </PenpalProvider>
      </body>
    </html>
  );
}
