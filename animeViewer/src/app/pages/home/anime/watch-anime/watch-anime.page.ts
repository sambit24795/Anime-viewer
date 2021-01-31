import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { filter, map, switchMap, tap, mergeMap } from "rxjs/operators";
import { of } from "rxjs";
import { Anime } from "../../../../models/anime";
import { HomeService } from "../../home.service";

@Component({
  selector: "app-watch-anime",
  templateUrl: "./watch-anime.page.html",
  styleUrls: ["./watch-anime.page.scss"],
})
export class WatchAnimePage implements OnInit {
  animeTitle: Anime["title"];
  anime: Anime;

  constructor(
    private route: ActivatedRoute,
    private homeService: HomeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((param) => {
          if (!param.has("animeId")) {
            return of(null);
          }

          this.animeTitle = param.get("animeId");
          return this.homeService.ongoingAnimes;
        }),
        mergeMap((res) => of(...res)),
        filter((res) => {
          return res.title === this.animeTitle;
        }),
        map((anime) => (this.anime = anime))
      )
      .subscribe();
  }

  onEpisodeClick(id: string) {
    this.homeService.getEpisode(id);
    this.homeService.episode
      .pipe(
        tap((episodes) =>
          episodes.episode.map(
            (ep) => {
              window.open(ep.mp4, "_blank");
            }
            /* (this.videoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(
          ep.mp4
        )) */
          )
        )
      )
      .subscribe();
    /* this.router.navigate(["/", "home", "anime", "video"]); */
  }
}
