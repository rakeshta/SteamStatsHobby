/* eslint-disable @next/next/no-img-element */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import clsx from 'clsx';

import { PlayerGameStats } from '@models/api';

export interface Props {
  className?: string;
  game: PlayerGameStats;
}

export function GameCard({ className, game }: Props) {
  return (
    <Card className={clsx('flex flex-row overflow-hidden h-40', className)}>
      <img src={game.imageUrl} alt='Game Logo' />
      <div className='flex flex-col'>
        <CardHeader className='flex-auto px-4 py-3'>
          <CardTitle>{game.name}</CardTitle>
          <CardDescription className=''>
            {(game.playtime / 60).toLocaleString(undefined, { maximumFractionDigits: 0 })} hours played
          </CardDescription>
        </CardHeader>
        <CardContent className='mb-3 px-4 flex flex-wrap'>
          {game.genres.map((genre) => (
            <div key={genre} className='rounded-sm border border-muted px-1 text-sm text-muted-foreground mr-2 mb-2'>
              {genre}
            </div>
          ))}
          <p className='text-ellipsis overflow-hidden mt-2 text-sm text-slate-300 hidden lg:block'>
            {game.shortDescription}
          </p>
        </CardContent>
      </div>
    </Card>
  );
}
