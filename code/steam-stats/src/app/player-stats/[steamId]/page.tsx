/* eslint-disable @next/next/no-img-element */
import { Api, PlayerStats } from '@models/api';

export interface Props {
  params: {
    steamId: string;
  };
}

export default async function PlayerStatsPage({ params: { steamId } }: Props) {
  const stats = await Api.fetchPlayerStats(steamId);
  return <PageContents stats={stats} />;
}

function PageContents({ stats }: { stats: PlayerStats }) {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1>Steam Id: {stats.steamId}</h1>
      <h1>Name: {stats.displayName}</h1>
      <img src={stats.avatarUrl} alt='Player Avatar' width={200} height={100} />
    </main>
  );
}
