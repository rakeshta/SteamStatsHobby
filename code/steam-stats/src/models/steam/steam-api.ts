import { Config } from '@models/config';
import { ApiError } from '@models/errors';
import { ApiErrorCode } from '@models/types';

import { SteamAppDetails, SteamOwnedGame, SteamPlayerSummary } from '.';

// constants -----------------------------------------------------------------------------------------------------------

const STEAM_API_URL = 'https://api.steampowered.com';

const STORE_API_URL = 'https://store.steampowered.com';

// local types ---------------------------------------------------------------------------------------------------------

interface FetchOptions {
  cache?: RequestCache;
}

// helpers -------------------------------------------------------------------------------------------------------------

/** Helper function to fetch from Steam APIs and handle errors. */
async function _fetch<Data>(url: string, params: Record<string, string> = {}, options?: FetchOptions): Promise<Data> {
  // fetch data from Steam API
  const startTime = Date.now();
  console.info('Steam API req:', url, params);
  const res = await fetch(url, options);
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

/** Convenience function to invoke a Steam API request. */
async function _fetchSteamApi<Data>(path: string, params: Record<string, string> = {}): Promise<Data> {
  const url = `${STEAM_API_URL}/${path}?key=${Config.steamApiKey}&${new URLSearchParams(params).toString()}`;
  const res = await _fetch<{ response: Data }>(url);
  return res.response;
}

/** Convenience function to invoke a Steam store API request. */
function _fetchStoreApi<Data>(path: string, params: Record<string, string> = {}): Promise<Data> {
  const url = `${STORE_API_URL}/${path}?${new URLSearchParams(params).toString()}`;
  return _fetch<Data>(url, { cache: 'force-cache' });
}

// steam api -----------------------------------------------------------------------------------------------------------

/** Collection of Steam APIs used in the project. */
export const SteamApi = {
  // steam api ---------------------------------------------------------------------------------------------------------

  /**
   * Fetches basic profile information for a list of 64-bit Steam IDs.
   *
   * @param steamIds List of 64 bit Steam IDs to return profile information for. Up to 100 Steam IDs can be requested.
   * @returns An array of {@link SteamPlayerSummary} objects.
   */
  async fetchPlayerSummaries(steamIds: string[]) {
    const res = await _fetchSteamApi<{ players: SteamPlayerSummary[] }>('ISteamUser/GetPlayerSummaries/v0002', {
      steamids: steamIds.join(','),
    });
    return res.players;
  },

  /**
   * Fetches the list of games a player owns along with some playtime information.
   *
   * @param steamId 64 bit Steam ID to return profile information for.
   * @returns An array of {@link SteamOwnedGame} objects.
   */
  async fetchOwnedGames(steamId: string) {
    const res = await _fetchSteamApi<{ games: SteamOwnedGame[] }>('IPlayerService/GetOwnedGames/v0001', {
      steamid: steamId,
      include_appinfo: '1',
      include_played_free_games: '1',
    });
    return res.games;
  },

  // store api ---------------------------------------------------------------------------------------------------------

  /**
   * Fetches details about the a steam app with the given ID.
   *
   * @param appId The ID of the app to fetch details for.
   * @returns A {@link SteamAppDetails} object.
   */
  async fetchAppDetails(appId: number) {
    // fetch app data from steam api
    const res = await _fetchStoreApi<{ [appId: number]: { success: boolean; data: SteamAppDetails } }>(
      'api/appdetails',
      {
        appids: appId.toString(),
      },
    );

    // fail if app not found
    const { success, data } = res[appId];
    if (!success) {
      throw new ApiError(404, ApiErrorCode.InvalidAppId, 'Invalid app ID');
    }

    // return app data
    return data;
  },
} as const;
