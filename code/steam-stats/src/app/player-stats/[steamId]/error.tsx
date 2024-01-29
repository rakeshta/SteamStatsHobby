'use client';

import Link from 'next/link';

import { Button } from '@components/ui/button';

export interface Props {
  error: Error;
}

export default function PlayerStatsError() {
  return (
    <main className='flex-1 flex flex-col items-center justify-center'>
      <h1 className='text-2xl font-bold text-center'>Whoops! Something went wrong.</h1>
      <p className='text-lg text-slate-300 text-center mt-2'>Check your Steam ID and try again.</p>

      <Button className='mt-8' asChild>
        <Link href='/'>Try Again</Link>
      </Button>
    </main>
  );
}
