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
    <Card className={clsx('flex flex-col sm:flex-row overflow-hidden sm:h-40', className)}>
      <img src={game.imageUrl} alt='Game Logo' />
      <div
        className='flex flex-col flex-1 relative'
        style={{
          backgroundImage: `url(${game.backgroundImageUrl})`,
          backgroundSize: 'cover',
        }}
      >
        <div className='absolute inset-0 bg-gradient-to-r from-black opacity-10' />
        <CardHeader className='flex-auto px-4 py-3'>
          <CardTitle>{game.name}</CardTitle>
          <CardDescription className=''>
            {(game.playtime / 60).toLocaleString(undefined, { maximumFractionDigits: 0 })} hours played
          </CardDescription>
        </CardHeader>
        <CardContent className='pb-2 px-4 sm:mb-3 flex flex-wrap'>
          {game.genres.map((genre) => (
            <div
              key={genre}
              className='rounded-sm border border-slate-500 px-1 text-sm text-muted-foreground mr-2 mb-2'
            >
              {genre}
            </div>
          ))}
          <p className='mt-2 text-sm text-slate-300 hidden lg:block'>{game.shortDescription}</p>
        </CardContent>
      </div>
    </Card>
  );
}
