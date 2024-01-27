import { sortBy } from 'lodash';

import { ApiError } from '@models/errors';
import { apiRouteWrapper } from '@models/helpers';
import { SteamApi } from '@models/steam';
import { ApiErrorCode, PlayerGameStats, PlayerStats } from '@models/types';

const MOST_PLAYED_GAME_COUNT = 10;

// local types ---------------------------------------------------------------------------------------------------------

type PlayerSummary = Omit<PlayerStats, 'mostPlayedGames'>;

// helpers -------------------------------------------------------------------------------------------------------------

async function _fetchPlayerSummary(steamId: string): Promise<PlayerSummary> {
  // fetch data from Steam API. abort if no data found
  const plyerSummaries = await SteamApi.fetchPlayerSummaries([steamId]);
  if (plyerSummaries.length === 0) {
    throw new ApiError(404, ApiErrorCode.InvalidSteamId, 'Invalid Steam ID');
  }

  // compose summary object
  const playerSummary = plyerSummaries[0];
  return {
    steamId: playerSummary.steamid,
    displayName: playerSummary.personaname,
    avatarUrl: playerSummary.avatarfull,
    createdAt: playerSummary.timecreated,
    lastLogoffAt: playerSummary.lastlogoff,
  } satisfies PlayerSummary;
}

async function _fetchMostPlayedGames(steamId: string): Promise<PlayerGameStats[]> {
  // fetch list of owned games for the player & take the top N most played games
  const ownedGames = await SteamApi.fetchOwnedGames(steamId);
  const mostPlayedGames = sortBy(ownedGames, 'playtime_forever').reverse().slice(0, MOST_PLAYED_GAME_COUNT);

  // fetch game details for all most played games in parallel
  const mostPlayedGameDetails: PlayerGameStats[] = [];
  const fetchPromises = mostPlayedGames.map(async (game) => {
    try {
      // fetch & parse game details
      const appDetails = await SteamApi.fetchAppDetails(game.appid);
      mostPlayedGameDetails.push({
        appId: game.appid,
        name: appDetails.name,
        imageUrl: appDetails.header_image,
        playtime: game.playtime_forever,
      });
    } catch (e) {
      // some games may no longer be on the store.
      // in that case, log error & skip it
      console.error(`Failed to fetch details for game ${game.appid}:`, e);
    }
  });

  // wait for all fetches to complete
  await Promise.all(fetchPromises);

  // return the list of most played games
  return mostPlayedGameDetails;
}

// route handler -------------------------------------------------------------------------------------------------------

export const GET = apiRouteWrapper<{ steamId: string }>(async (req, { params }) => {
  // fetch player summary & most played games
  const playerSummary = await _fetchPlayerSummary(params.steamId);
  const mostPlayedGames = await _fetchMostPlayedGames(params.steamId);

  // compose response
  return {
    ...playerSummary,
    mostPlayedGames,
  } satisfies PlayerStats;
});
