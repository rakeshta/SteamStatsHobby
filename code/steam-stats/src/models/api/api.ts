import { ApiError, ApiResult, PlayerStats } from '.';

// constants -----------------------------------------------------------------------------------------------------------

const API_BASE_URL = process.env.BASE_URL ? process.env.BASE_URL : `http://localhost:${process.env.PORT || 3000}`;

// helpers -------------------------------------------------------------------------------------------------------------

/** Helper function to compose a URL and insert parameters into it. */
function _composeUrl(path: string, params: Record<string, string> = {}): string {
  // form url
  let url = API_BASE_URL + path;

  // replace slug, if any
  const paramsSansSlug = { ...params };
  if (params.slug) {
    url = url.replace(':slug', encodeURIComponent(params.slug));
    delete paramsSansSlug.slug;
  }

  // append remaining params as query
  const searchParams = new URLSearchParams(paramsSansSlug);
  const search = searchParams.toString();
  if (search) {
    url += '?' + search;
  }

  return url;
}

/** Helper function to fetch an API result & handle errors. */
async function _fetch<Data>(path: string, params: Record<string, string> = {}): Promise<Data> {
  // compose url
  const url = _composeUrl(path, params);

  // fetch data from API
  const startTime = Date.now();
  console.info('API req:', url, params);
  const res = await fetch(url);
  console.debug('API res:', res.status, res.statusText, `(Elapsed: ${Date.now() - startTime}ms)`);

  // handle error if any
  const apiRes = (await res.json()) as ApiResult<Data>;
  if (apiRes.errorCode) {
    throw new ApiError(apiRes.status, apiRes.errorCode, apiRes.errorDescription);
  }

  // return success response
  return apiRes.data;
}

// api -----------------------------------------------------------------------------------------------------------------

/** Collection of server API that can be accessed by the UI. */
export const Api = {
  /**
   * Fetch computed stats for the given steam id.
   *
   * @param steamId The steam id of the player.
   * @returns The computed stats for the player.
   */
  fetchPlayerStats(steamId: string): Promise<PlayerStats> {
    return _fetch<PlayerStats>(`/api/player-stats/:slug`, { slug: steamId });
  },
} as const;
