import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Segredinho das Japonesas - Área de Membros',
  description: 'Sua plataforma de emagrecimento definitivo.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.variable}>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
