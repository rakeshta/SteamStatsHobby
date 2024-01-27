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
}
