export interface SteamAppDetails {
  type: string;
  name: string;
  steam_appid: number;
  required_age: number;
  is_free: boolean;
  controller_support: string;
  dlc: number[];
  detailed_description: string;
  about_the_game: string;
  short_description: string;
  supported_languages: string;
  reviews: string;
  header_image: string;
  capsule_image: string;
  capsule_imagev5: string;
  website: string;
  pc_requirements: SteamAppRequirements;
  mac_requirements: SteamAppRequirements;
  linux_requirements: SteamAppRequirements;
  legal_notice: string;
  developers: string[];
  publishers: string[];
  price_overview: SteamAppPriceOverview;
  packages: number[];
  package_groups: SteamAppPackageGroup[];
  platforms: SteamAppPlatforms;
  metacritic: SteamAppMetacritic;
  categories: SteamAppClassification[];
  genres: SteamAppClassification[];
  screenshots: SteamAppScreenshot[];
  movies: SteamAppMovie[];
  recommendations: SteamAppRecommendations;
  achievements: {
    total: number;
    highlighted: SteamAppAchievement[];
  };
  release_date: SteamAppReleaseDate;
  support_info: SteamAppSupportInfo;
  background: string;
  background_raw: string;
  content_descriptors: SteamAppContentDescriptors;
}

export interface SteamAppRequirements {
  minimum: string;
}

export interface SteamAppPriceOverview {
  currency: string;
  initial: number;
  final: number;
  discount_percent: number;
  initial_formatted: string;
  final_formatted: string;
}

export interface SteamAppPackageGroup {
  name: string;
  title: string;
  description: string;
  selection_text: string;
  save_text: string;
  display_type: number;
  is_recurring_subscription: string;
  subs: {
    packageid: number;
    percent_savings_text: string;
    percent_savings: number;
    option_text: string;
    option_description: string;
    can_get_free_license: string;
    is_free_license: boolean;
    price_in_cents_with_discount: number;
  }[];
}

export interface SteamAppPlatforms {
  windows: boolean;
  mac: boolean;
  linux: boolean;
}

export interface SteamAppMetacritic {
  score: number;
  url: string;
}

export interface SteamAppClassification {
  id: number;
  description: string;
}

export interface SteamAppScreenshot {
  id: number;
  path_thumbnail: string;
  path_full: string;
}

export interface SteamAppMovie {
  id: number;
  name: string;
  thumbnail: string;
  webm: {
    '480': string;
    max: string;
  };
  mp4: {
    '480': string;
    max: string;
  };
  highlight: boolean;
}

export interface SteamAppRecommendations {
  total: number;
}

export interface SteamAppAchievement {
  name: string;
  path: string;
}

export interface SteamAppReleaseDate {
  coming_soon: boolean;
  date: string;
}

export interface SteamAppSupportInfo {
  url: string;
  email: string;
}

export interface SteamAppContentDescriptors {
  ids: number[];
  notes: string | null;
}
