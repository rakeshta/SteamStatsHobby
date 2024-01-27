import { sortBy } from 'lodash';

import { ApiError, ApiErrorCode, PlayerGameStats, PlayerStats } from '@models/api';
import { apiRouteWrapper } from '@models/helpers';
import { SteamApi } from '@models/steam';

const MOST_PLAYED_GAME_COUNT = 10;

// local types ---------------------------------------------------------------------------------------------------------

type PlayerInfo = Omit<PlayerStats, 'ownedGameCount' | 'totalPlaytime' | 'mostPlayedGames'>;
type GamingStats = Pick<PlayerStats, 'ownedGameCount' | 'totalPlaytime' | 'mostPlayedGames'>;

// helpers -------------------------------------------------------------------------------------------------------------

async function _fetchPlayerInfo(steamId: string): Promise<PlayerInfo> {
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
  } satisfies PlayerInfo;
}

async function _fetchGamingStats(steamId: string): Promise<GamingStats> {
  // fetch list of owned games for the player & take the top N most played games
  const ownedGames = await SteamApi.fetchOwnedGames(steamId);
  const ownedGamesTopN = sortBy(ownedGames, 'playtime_forever').reverse().slice(0, MOST_PLAYED_GAME_COUNT);

  // summarize gaming stats
  const ownedGameCount = ownedGames.length;
  const totalPlaytime = ownedGames.reduce((sum, game) => sum + game.playtime_forever, 0);

  // fetch game details for all most played games in parallel
  const mostPlayedGames: PlayerGameStats[] = [];
  const fetchPromises = ownedGamesTopN.map(async (game) => {
    try {
      // fetch & parse game details
      const appDetails = await SteamApi.fetchAppDetails(game.appid);
      mostPlayedGames.push({
        appId: game.appid,
        name: appDetails.name,
        shortDescription: appDetails.short_description,
        developers: appDetails.developers,
        publishers: appDetails.publishers,
        genres: appDetails.genres.map((genre) => genre.description),
        imageUrl: appDetails.header_image,
        backgroundImageUrl: appDetails.background,
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

  // return composed gaming stats
  return {
    ownedGameCount,
    totalPlaytime,
    mostPlayedGames,
  };
}

// route handler -------------------------------------------------------------------------------------------------------

export const GET = apiRouteWrapper<{ steamId: string }>(async (req, { params }) => {
  // fetch player summary & most played games
  const playerInfo = await _fetchPlayerInfo(params.steamId);
  const gamingStats = await _fetchGamingStats(params.steamId);

  // compose response
  return {
    ...playerInfo,
    ...gamingStats,
  } satisfies PlayerStats;
});
