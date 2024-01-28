/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx';

import { PlayerStats } from '@models/api';

export interface Props {
  className?: string;
  stats: PlayerStats;
}

export function PlayerSummary({ className, stats }: Props) {
  return (
    <div className={clsx('player-summary flex flex-row items-stretch', className)}>
      <img className='rounded-md rotate-3' src={stats.avatarUrl} alt='Player Avatar' />
      <div className='ml-8 flex flex-col justify-between'>
        <h1 className='text-2xl'>{stats.displayName}</h1>
      </div>
    </div>
  );
}
