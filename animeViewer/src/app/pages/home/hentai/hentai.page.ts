import { Component, OnInit } from "@angular/core";
import { HomeService } from "../home.service";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Hentai } from "src/app/models/hentai";

@Component({
  selector: "app-hentai",
  templateUrl: "./hentai.page.html",
  styleUrls: ["./hentai.page.scss"],
})
export class HentaiPage implements OnInit {
  hentaies: Observable<Hentai[]>;

  constructor(private homeService: HomeService) {}

  ngOnInit() {}
}
