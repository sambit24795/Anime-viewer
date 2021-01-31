export interface Anime {
  episodes: Array<any>;
  firstAired: string;
  genres: Array<string>;
  img: string;
  rating: string;
  score: number;
  status: "Ongoing" | "Finished";
  synopsis: string;
  title: string;
  totalEps: number;
  type: "TV Series" | "OVA Series" | "Movie";
}

export interface Episode {
  mp4: string;
}

export interface Episodes {
  episode: Array<Episode>;
}

export interface AnimeResponse {
  animes: Anime[];
}
