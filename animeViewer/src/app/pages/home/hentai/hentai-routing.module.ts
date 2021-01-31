import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HentaiPage } from './hentai.page';

const routes: Routes = [
  {
    path: '',
    component: HentaiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HentaiPageRoutingModule {}
