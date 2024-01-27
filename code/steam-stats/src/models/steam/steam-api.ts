import { Config } from '@models/config';
import { ApiError } from '@models/errors';
import { ApiErrorCode } from '@models/types';

import { SteamPlayerSummary } from '.';

const STEAM_API_URL = 'http://api.steampowered.com';

/** Helper function to fetch a simple GET API response from Steam. */
async function _fetchSteamApi<Data>(path: string, params: Record<string, string> = {}): Promise<Data> {
  // fetch data from Steam API
  const startTime = Date.now();
  console.info('Steam API req:', path, params);
  const url = `${STEAM_API_URL}/${path}?key=${Config.steamApiKey}&${new URLSearchParams(params).toString()}`;
  const res = await fetch(url);
  console.debug('Steam API res:', res.status, res.statusText, `(Elapsed: ${Date.now() - startTime}ms)`);

  // handle error if any
  if (!res.ok) {
    switch (res.status) {
      case 404:
        throw new ApiError(404, ApiErrorCode.InvalidSteamId, 'Invalid Steam ID');
      default:
        throw new ApiError(500, ApiErrorCode.Other, `Steam API returned error: ${res.status} ${res.statusText}`);
    }
  }

  // parse response as JSON
  return res.json() as Promise<Data>;
}

/** Collection of Steam APIs used in the project. */
export const SteamApi = {
  /**
   * Fetches basic profile information for a list of 64-bit Steam IDs.
   *
   * @param steamIds List of 64 bit Steam IDs to return profile information for. Up to 100 Steam IDs can be requested.
   * @returns
   */
  async fetchPlayerSummaries(steamIds: string[]) {
    const res = await _fetchSteamApi<{ response: { players: SteamPlayerSummary[] } }>(
      'ISteamUser/GetPlayerSummaries/v0002',
      {
        steamids: steamIds.join(','),
      },
    );
    return res.response.players;
  },
} as const;
