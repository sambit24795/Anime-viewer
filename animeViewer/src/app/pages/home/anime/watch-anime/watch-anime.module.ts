import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WatchAnimePageRoutingModule } from './watch-anime-routing.module';

import { WatchAnimePage } from './watch-anime.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WatchAnimePageRoutingModule
  ],
  declarations: [WatchAnimePage]
})
export class WatchAnimePageModule {}
