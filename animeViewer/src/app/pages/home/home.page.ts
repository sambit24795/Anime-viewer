import { Component, OnInit } from "@angular/core";
import { HomeService } from "./home.service";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { IonSearchbar } from "@ionic/angular";
import { Observable, of } from "rxjs";
import { Anime } from "../../models/anime";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  animes: Observable<Anime[]>;

  constructor(
    private homeService: HomeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {}

  loadSearchedAnimes(searchTerm: string) {
    this.homeService.getSearchedAnime(searchTerm).subscribe();
    return (this.animes = this.homeService.ongoingAnimes);
  }

  onChangeText(event: CustomEvent<IonSearchbar>) {
    if (event.detail.value === "") {
      return;
    }
    of(event.detail.value)
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((searchTerm) => this.loadSearchedAnimes(searchTerm))
      )
      .subscribe();
  }

  onClick(title: Anime["title"]) {
    this.router.navigate(["/", "home", "anime", "watch", title], {
      relativeTo: this.route,
    });
  }

  ionViewWillLeave() {
    this.homeService.resetOngoingAnimes();
  }
}
