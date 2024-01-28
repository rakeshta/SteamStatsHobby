'use client';

import Link from 'next/link';

import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { useState } from 'react';

const REGEX_STEAM_ID = /^[\d]{4,64}$/;

export default function Home() {
  // state
  const [steamId, setSteamId] = useState('');
  const [isValid, setIsValid] = useState(false);

  // render
  return (
    <main className='flex-1 flex flex-col items-center justify-center p-24'>
      <h1 className='text-4xl font-bold'>Steam Stats</h1>
      <h2 className='text-lg text-center mt-4'>{"What's your play style? Enter your Steam ID to find out!"}</h2>
      <div className='flex w-full max-w-sm items-center space-x-2 mt-16'>
        <Input
          type='text'
          placeholder='Steam ID'
          value={steamId}
          onChange={(e) => {
            const value = e.target.value;
            setSteamId(value);
            setIsValid(REGEX_STEAM_ID.test(value));
          }}
        />
        <Button type='submit' disabled={!isValid} asChild>
          <Link href={`/player-stats/${steamId}`}>GO</Link>
        </Button>
      </div>
    </main>
  );
}
