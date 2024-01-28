/* eslint-disable @next/next/no-img-element */
import { Api } from '@models/api';

import { PlayerSummary } from './PlayerSummary';

export interface Props {
  params: {
    steamId: string;
  };
}

export default async function PlayerStatsPage({ params: { steamId } }: Props) {
  const stats = await Api.fetchPlayerStats(steamId);
  return (
    <main className='flex min-h-screen flex-col justify-between'>
      <PlayerSummary stats={stats} />
    </main>
  );
}
