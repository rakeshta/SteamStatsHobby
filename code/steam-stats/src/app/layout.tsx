import type { Metadata } from 'next';

import { Inter } from 'next/font/google';

import clsx from 'clsx';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Steam Stats',
  description: "What's your play style?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={clsx(inter.className, 'dark')}>
        <div className='container mx-auto px-12 py-8'>{children}</div>
      </body>
    </html>
  );
}
