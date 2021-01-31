import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HentaiPageRoutingModule } from './hentai-routing.module';

import { HentaiPage } from './hentai.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HentaiPageRoutingModule
  ],
  declarations: [HentaiPage]
})
export class HentaiPageModule {}
