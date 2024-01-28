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
      <body className={clsx(inter.className, 'dark min-h-dvh flex flex-col justify-between')}>
        <div className='flex-1 container flex flex-col justify-stretch mx-auto px-12 py-8'>{children}</div>
        <footer className='container flex justify-center py-2'>
          <p className='text-sm text-muted'>A project by Rakesh Ayyaswami</p>
        </footer>
      </body>
    </html>
  );
}
