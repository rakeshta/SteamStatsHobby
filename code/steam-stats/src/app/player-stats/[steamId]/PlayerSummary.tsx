/* eslint-disable @next/next/no-img-element */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { DateFormat } from '@lib/date-format';
import clsx from 'clsx';

import { PlayerStats } from '@models/api';

export interface Props {
  className?: string;
  stats: PlayerStats;
}

export function PlayerSummary({ className, stats }: Props) {
  return (
    <Card className={clsx('p-4 flex flex-row items-stretch', className)}>
      <img className='rounded-md rotate-3' src={stats.avatarUrl} alt='Player Avatar' />
      <div className='ml-4 flex flex-col justify-between'>
        <CardHeader>
          <CardTitle>{stats.displayName}</CardTitle>
          <CardDescription>On Steam since {DateFormat.long(stats.createdAt * 1000)}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-row space-x-8'>
            <div className='flex flex-col'>
              <span className='text-lg font-semibold'>{stats.ownedGameCount}</span>
              <span className='text-sm text-muted-foreground'>Games owned</span>
            </div>
            <div className='flex flex-col'>
              <span className='text-lg font-semibold'>
                {(stats.totalPlaytime / 60).toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
              <span className='text-sm text-muted-foreground'>Lifetime hours played</span>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
