import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomePage } from "./home.page";

const routes: Routes = [
  {
    path: "",
    component: HomePage,
  },
  {
    path: "anime",
    loadChildren: () =>
      import("./anime/anime.module").then((m) => m.AnimePageModule),
  },
  {
    path: "hentai",
    loadChildren: () =>
      import("./hentai/hentai.module").then((m) => m.HentaiPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
