import { sortBy } from 'lodash';

import { ApiError } from '@models/errors';
import { apiRouteWrapper } from '@models/helpers';
import { SteamApi } from '@models/steam';
import { ApiErrorCode, PlayerStats } from '@models/types';

const MOST_PLAYED_GAME_COUNT = 10;

export const GET = apiRouteWrapper<{ steamId: string }>(async (req, { params }) => {
  // fetch data from Steam API. abort if no data found
  const plyerSummariesRes = await SteamApi.fetchPlayerSummaries([params.steamId]);
  if (plyerSummariesRes.length === 0) {
    throw new ApiError(404, ApiErrorCode.InvalidSteamId, 'Invalid Steam ID');
  }

  // fetch list of owned games for the player
  const ownedGamesRes = await SteamApi.fetchOwnedGames(params.steamId);

  // get detailed info for all owned games
  const gamesDetails = [];
  for (const game of ownedGamesRes) {
    try {
      const appDetails = await SteamApi.fetchAppDetails(game.appid);
      gamesDetails.push({
        appId: game.appid,
        name: appDetails.name,
        imageUrl: appDetails.header_image,
        playtime: game.playtime_forever,
      });
    } catch (e) {
      // log & skip this game
      console.error(`Failed to fetch details for game ${game.appid}:`, e);
    }
  }

  // compose response
  const playerSummary = plyerSummariesRes[0];
  return {
    steamId: playerSummary.steamid,
    displayName: playerSummary.personaname,
    avatarUrl: playerSummary.avatarfull,
    createdAt: playerSummary.timecreated,
    lastLogoffAt: playerSummary.lastlogoff,
    mostPlayedGames: sortBy(gamesDetails, 'playtime').reverse().slice(0, MOST_PLAYED_GAME_COUNT),
  } satisfies PlayerStats;
});
