import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, map, retry, shareReplay, tap } from "rxjs/operators";
import { Anime, Episodes, AnimeResponse } from "../../models/anime";
import { Hentai, HentaiResponse } from "../../models/hentai";

@Injectable({
  providedIn: "root",
})
export class HomeService {
  // tslint:disable-next-line: variable-name
  private _ongoingAnimes = new BehaviorSubject<Anime[]>([]);
  // tslint:disable-next-line: variable-name
  private _episode = new Observable<Episodes>();
  // tslint:disable-next-line: variable-name
  private _searchedAnimes = new BehaviorSubject<Anime[]>([]);
  // tslint:disable-next-line: variable-name
  private _hentai = new BehaviorSubject<Hentai[]>([]);
  private animeUrl = "http://localhost:4000/api/anime/";
  private hentaiUrl = "http://localhost:4000/api/hentai/";

  constructor(private http: HttpClient) {}

  get ongoingAnimes() {
    return this._ongoingAnimes.asObservable();
  }

  get episode() {
    return this._episode;
  }

  get searchedAnimes() {
    return this._searchedAnimes.asObservable();
  }

  get hentai() {
    return this._hentai.asObservable();
  }

  resetOngoingAnimes() {
    this._ongoingAnimes.next([]);
  }

  getOngoingAnimesList(type: "ongoing" | "popular") {
    return this.http.get<AnimeResponse>(this.animeUrl + type).pipe(
      map((res) => {
        return this._ongoingAnimes.next(res.animes);
      }),
      retry(2),
      catchError((err) => throwError(err)),
      shareReplay()
    );
  }

  getEpisode(episodeId: string) {
    this._episode = this.http
      .get<Episodes>(this.animeUrl + "episode", {
        params: new HttpParams().set("episodeId", episodeId),
      })
      .pipe(
        retry(2),
        catchError((err) => throwError(err)),
        shareReplay()
      );
  }

  getSearchedAnime(searchTerm: string) {
    return this.http
      .get<AnimeResponse>(this.animeUrl + "search", {
        params: new HttpParams().set("searchQuery", searchTerm),
      })
      .pipe(
        map((res) => this._ongoingAnimes.next(res.animes)),
        retry(2),
        catchError((err) => throwError(err)),
        shareReplay()
      );
  }

  getPopularHentai(type = "popular") {
    return this.http.get<HentaiResponse>(this.hentaiUrl + type).pipe(
      map((res) => {
        console.log(res);
        return this._hentai.next(res.hentai.results);
      }),
      retry(2),
      catchError((err) => throwError(err)),
      shareReplay()
    );
  }
}
