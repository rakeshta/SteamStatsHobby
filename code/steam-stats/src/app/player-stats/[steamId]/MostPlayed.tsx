import { PlayerStats } from '@models/api';

import { GameCard } from './GameCard';

export interface Props {
  className?: string;
  stats: PlayerStats;
}

export function MostPlayed({ className, stats }: Props) {
  return (
    <div className={className}>
      <h2 className='text-2xl font-bold mb-4'>Most Played Games</h2>
      <div className='flex flex-col space-y-4'>
        {stats.mostPlayedGames.map((game) => (
          <GameCard key={game.appId} game={game} />
        ))}
      </div>
    </div>
  );
}
