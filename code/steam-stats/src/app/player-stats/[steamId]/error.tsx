'use client';

import Link from 'next/link';

import { Button } from '@components/ui/button';

export interface Props {
  error: Error;
}

export default function PlayerStatsError({ error }: Props) {
  return (
    <main className='flex-1 flex flex-col items-center justify-center space-y-8'>
      <h1 className='text-2xl font-bold'>{error.message}</h1>
      <p className='text-lg text-center'>Whoops! Something didn&#39;t go according to plan</p>

      <Button className='mt-4' asChild>
        <Link href='/'>Try Again</Link>
      </Button>
    </main>
  );
}
