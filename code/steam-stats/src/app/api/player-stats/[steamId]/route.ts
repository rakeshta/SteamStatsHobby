import { ApiError } from '@models/errors';
import { apiRouteWrapper } from '@models/helpers';
import { SteamApi } from '@models/steam';
import { ApiErrorCode, PlayerStats } from '@models/types';

export const GET = apiRouteWrapper<{ steamId: string }>(async (req, { params }) => {
  // fetch data from Steam API. abort if no data found
  const plyerSummariesRes = await SteamApi.fetchPlayerSummaries([params.steamId]);
  if (plyerSummariesRes.length === 0) {
    throw new ApiError(404, ApiErrorCode.InvalidSteamId, 'Invalid Steam ID');
  }

  // compose response
  const playerSummary = plyerSummariesRes[0];
  return {
    steamId: playerSummary.steamid,
    displayName: playerSummary.personaname,
    avatarUrl: playerSummary.avatarfull,
    createdAt: playerSummary.timecreated,
    lastLogoffAt: playerSummary.lastlogoff,
  } satisfies PlayerStats;
});
