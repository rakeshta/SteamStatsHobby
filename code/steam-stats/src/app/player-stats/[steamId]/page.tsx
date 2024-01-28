/* eslint-disable @next/next/no-img-element */
import { Api } from '@models/api';

import { MostPlayed } from './MostPlayed';
import { PlayerSummary } from './PlayerSummary';

export interface Props {
  params: {
    steamId: string;
  };
}

export async function generateMetadata({ params: { steamId } }: Props) {
  const stats = await Api.fetchPlayerStats(steamId);
  return {
    title: `${stats.displayName} - Steam Stats`,
    description: `Steam stats for ${stats.displayName}`,
    image: stats.avatarUrl,
  };
}

export default async function PlayerStatsPage({ params: { steamId } }: Props) {
  const stats = await Api.fetchPlayerStats(steamId);
  return (
    <main className='flex flex-col space-y-8'>
      <PlayerSummary stats={stats} />
      <MostPlayed stats={stats} />
    </main>
  );
}
