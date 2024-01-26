import invariant from 'tiny-invariant';

/** Reads an optional environment variable. */
const _opt = (key: string) => process.env[key];

/** Reads a required environment variable. */
const _req = (key: string) => {
  const value = _opt(key);
  invariant(value, `Missing required env var: ${key}`);
  return value;
};

/** Application configuration. */
export const config = {
  steamApiKey: _req('STEAM_API_KEY'),
} as const;
