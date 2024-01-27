/** Player stats compiled by the API server. */
export interface PlayerStats {
  /** The player's Steam ID. */
  steamId: string;

  /** The player's Steam display name. */
  displayName: string;

  /** The player's Steam avatar URL. */
  avatarUrl: string;

  /** The time the account was originally created. */
  createdAt: number;

  /** The time the player was last seen online. */
  lastLogoffAt: number;

  /** The number of games owned by the player. */
  ownedGameCount: number;

  /** Total playtime across all games. */
  totalPlaytime: number;

  /** The list of most played games for this player sorted in descending order. */
  mostPlayedGames: PlayerGameStats[];
}

/** Game details & stats associated with the player for it. */
export interface PlayerGameStats {
  /** The game's Steam ID. */
  appId: number;

  /** The game's name. */
  name: string;

  /** The game's image URL. */
  imageUrl: string;

  /** The time the player has spent playing this game. */
  playtime: number;
}
