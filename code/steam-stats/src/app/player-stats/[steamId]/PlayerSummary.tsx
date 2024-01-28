/* eslint-disable @next/next/no-img-element */
import { Card, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
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
      </div>
    </Card>
  );
}
