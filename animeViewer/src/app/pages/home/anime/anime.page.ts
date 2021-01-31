import { Component, OnInit } from "@angular/core";
import { IonInfiniteScroll, LoadingController } from "@ionic/angular";
import { HomeService } from "../home.service";
import { map, mergeMap, take, tap, toArray, switchMap } from "rxjs/operators";
import { from, Observable, of } from "rxjs";
import { Anime } from "../../../models/anime";
import {
  Router,
  ActivatedRoute,
  NavigationStart,
  NavigationEnd,
} from "@angular/router";
import { SegmentChangeEventDetail } from "@ionic/core";

@Component({
  selector: "app-anime",
  templateUrl: "./anime.page.html",
  styleUrls: ["./anime.page.scss"],
})
export class AnimePage implements OnInit {
  animes: Observable<Anime[]>;
  loading: boolean;

  constructor(
    private homeService: HomeService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadAnimes("popular");
    this.clearOnNavigation();
  }

  async loadAnimes(type: "ongoing" | "popular") {
    const loadingEl = await this.loader();
    this.homeService.getOngoingAnimesList(type).subscribe();
    this.animes = this.homeService.ongoingAnimes.pipe(
      switchMap((res) => (this.loading ? of(null) : of(res))),
      map((res) => {
        this.loading = false;
        res?.length > 0 ? loadingEl.dismiss() : loadingEl.present();
        return res;
      })
      /* mergeMap((res) => of(...res)),
      take(5),
      toArray() */
    );
  }

  async loader() {
    return await this.loadingCtrl.create({
      message: "Matte Kurasai Onii chan...",
      keyboardClose: true,
      showBackdrop: true,
      spinner: "bubbles",
      translucent: true,
    });
  }

  onClick(title: Anime["title"]) {
    this.router.navigate(["/", "home", "anime", "watch", title], {
      relativeTo: this.route,
    });
  }

  onSegmentClicked(event: CustomEvent<SegmentChangeEventDetail>) {
    this.loading = true;
    if (event.detail.value === "ongoing") {
      this.loadAnimes("ongoing");
    } else if (event.detail.value === "popular") {
      this.loadAnimes("popular");
    }
  }

  clearOnNavigation() {
    this.router.events
      .pipe(
        map((event) => (event instanceof NavigationEnd ? event : null)),
        switchMap((event) => {
          if (event && event.url === "home") {
            this.homeService.resetOngoingAnimes();
          }
          return of();
        })
      )
      .subscribe();
  }

  ionViewWillLeave() {}
}
