interface Thumbnail {
  s: string;
  w: string;
  h: string;
}

interface Results {
  results: Hentai[];
}

export interface Hentai {
  id: string;
  title: string;
  language: string;
  thumbnail: Thumbnail;
}

export interface HentaiResponse {
  hentai: Results;
}
