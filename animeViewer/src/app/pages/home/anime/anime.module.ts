import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { AnimePageRoutingModule } from "./anime-routing.module";

import { AnimePage } from "./anime.page";
import { SearchComponent } from "../../../components/search/search.component";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, AnimePageRoutingModule],
  declarations: [AnimePage, SearchComponent],
})
export class AnimePageModule {}
